'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.syncCollection = syncCollection;
exports.getCardsByType = getCardsByType;
exports.getCardById = getCardById;
exports.testCardUpdate = testCardUpdate;

var _gplus = require('./gplus');

var _gplus2 = _interopRequireDefault(_gplus);

var _backend = require('./backend');

var _backend2 = _interopRequireDefault(_backend);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var util = require('util'),
    request = require('request');

var userId = '108466508041843226480',
    APIKey = 'AIzaSyBGGZNDkHtAVUO-Ug355A3vDp1k8Q7Pe6M';

function syncCollection(req, res) {
	console.log('\nSynchronizing backend with Google Plus collection ...');

	// temporarily using G+ API to accurately mock this
	var gplus = new _gplus2.default();
	gplus.init();

	var getPage = function getPage() {
		var gplusPromise = new Promise(function (resolve, reject) {
			gplus.getNextCards(resolve, reject);
		});

		gplusPromise.then(function (scrapedCollection) {
			// Send back an array of the card titles which have been added
			if (gplus.nextPageToken && gplus.more) {
				getPage();
			} else {
				console.log('\nScrape Results:\n');
				console.log([].concat(_toConsumableArray(gplus.titlesAdded)));

				return gplus.updateBackend(gplus.collection, req, res);
			}
		}).catch(function (reason) {
			console.log('\nScrape Error:');
			console.log(reason);
		});
	};

	getPage();
}

function getCardsByType(req, res) {
	var backend = new _backend2.default();

	// variables defined in the Swagger document can be referenced using
	// req.swagger.params.{parameter_name}
	var category = req.swagger.params.category.value || null;

	var backendPromise = new Promise(function (resolve, reject) {
		backend.getMetaCards(resolve, reject, category);
	});

	backendPromise.then(function (collection) {
		// this sends back a JSON response which is a single string
		res.json(collection);
	}).catch(function (reason) {
		console.log('\nBackend Error:');
		console.log(reason);
	});
}

function getCardById(req, res) {
	var backend = new _backend2.default();

	var cardId = req.swagger.params.cardId.value;

	var backendPromise = new Promise(function (resolve, reject) {
		backend.getCard(resolve, reject, cardId);
	});

	backendPromise.then(function (card) {
		res.json(card);
	}).catch(function (reason) {
		console.log('\nBackend Error:');
		console.log(reason);
	});
}

// For future reference
function testCardUpdate(req, res) {
	var gcardAuthor = {
		userId: 0,
		username: 'Chris Reeve',
		avatar: 'https://lh3.googleusercontent.com/-7pSD5TEGt4g/AAAAAAAAAAI/AAAAAAAAACI/Cqefb4i8T3E/photo.jpg?sz=50',
		email: 'paradigmsareconstructed@gmail.com',
		bio: '(MC) Master of Controversies',
		lastTimeOnline: '1985-04-12T23:20:50.52Z'
	};

	var newCard = {
		author: gcardAuthor,
		name: 'Test Card',
		summary: 'The update entity worked.',
		url: 'http://blah.com',
		thumbnail: 'http://blah.com',
		publishDate: '1985-04-12T23:20:50.52Z',
		updateDate: '1985-04-12T23:20:50.52Z',
		category: 'ongoing'
	};

	var newCards = [newCard];

	var backend = new _backend2.default();

	var backendPromise = new Promise(function (resolve, reject) {
		backend.updateEntity(newCards, resolve, reject);
	});

	backendPromise.then(function (response) {
		// this sends back a JSON response which is a single string
		res.json(response);
	}).catch(function (reason) {
		console.log('\nBackend Error:');
		console.log(reason);
	});
}