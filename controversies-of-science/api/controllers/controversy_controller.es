var util = require('util'),
	request = require('request');

import GPlus from './gplus';
import Backend from './backend';

var userId = '108466508041843226480',
	APIKey = 'AIzaSyBGGZNDkHtAVUO-Ug355A3vDp1k8Q7Pe6M';

export function syncCollection(req, res) {
	console.log('\nSynchronizing backend with Google Plus collection ...');

	// temporarily using G+ API to accurately mock this
	let gplus = new GPlus();
	gplus.init();

	let getPage = function() {
		var gplusPromise = new Promise(
			(resolve, reject) => {
				gplus.getNextCards(resolve, reject);
			}
		);

		gplusPromise.then(
			(scrapedCollection) => {
				// Send back an array of the card titles which have been added
				if (gplus.nextPageToken && gplus.more) {
					getPage();
				} else {
					console.log('\nScrape Results:\n');
					console.log([...gplus.titlesAdded]);

					return gplus.updateBackend(gplus.collection, req, res);
				}
			}
		)
		.catch(
			(reason) => {
				console.log('\nScrape Error:');
				console.log(reason);
			}
		);
	}

	getPage();
}

export function getCardsByType(req, res) {
	let backend = new Backend();

	// variables defined in the Swagger document can be referenced using
	// req.swagger.params.{parameter_name}
	let category = req.swagger.params.category.value || null;

	var backendPromise = new Promise(
		(resolve, reject) => {
			backend.getMetaCards(resolve, reject, category);
		}
	);

	backendPromise.then(
		(collection) => {
			// this sends back a JSON response which is a single string
			res.json(collection);
		}
	)
	.catch(
		(reason) => {
			console.log('\nBackend Error:');
			console.log(reason);
		}
	);
}

export function getCardById(req, res) {
	let backend = new Backend();

	let cardId = req.swagger.params.cardId.value;

	var backendPromise = new Promise(
		(resolve, reject) => {
			backend.getCard(resolve, reject, cardId);
		}
	);

	backendPromise.then(
		(card) => {
			res.json(card);
		}
	)
	.catch(
		(reason) => {
			console.log('\nBackend Error:');
			console.log(reason);
		}
	);	
}

// For future reference
export function testCardUpdate(req, res) {
	let gcardAuthor = {
		userId: 0,
		username: 'Chris Reeve',
		avatar: 'https://lh3.googleusercontent.com/-7pSD5TEGt4g/AAAAAAAAAAI/AAAAAAAAACI/Cqefb4i8T3E/photo.jpg?sz=50',
		email: 'paradigmsareconstructed@gmail.com',
		bio: '(MC) Master of Controversies',
		lastTimeOnline: '1985-04-12T23:20:50.52Z'			
	};

	let newCard = {
		author: gcardAuthor,
		name: 'Test Card',
		summary: 'The update entity worked.',
		url: 'http://blah.com',
		thumbnail: 'http://blah.com',
		publishDate: '1985-04-12T23:20:50.52Z',
		updateDate: '1985-04-12T23:20:50.52Z',
		category: 'ongoing'
	};

	let newCards = [newCard];

	let backend = new Backend();

	var backendPromise = new Promise(
		(resolve, reject) => {
			backend.updateEntity(newCards, resolve, reject);
		}
	);

	backendPromise.then(
		(response) => {
			// this sends back a JSON response which is a single string
			res.json(response);
		}
	)
	.catch(
		(reason) => {
			console.log('\nBackend Error:');
			console.log(reason);
		}
	);
}
