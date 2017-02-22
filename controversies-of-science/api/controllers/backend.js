'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var usergrid = require('usergrid');

var Backend = function () {
	function Backend() {
		_classCallCheck(this, Backend);

		this.dataClient = new usergrid.client({
			orgName: 'controversies-of-science',
			appName: 'sandbox',
			URI: 'https://apibaas-trial.apigee.net'
		});

		this.endpoint = {
			metacard: {
				'singular': 'mcard',
				'plural': 'mcards'
			},
			card: {
				'singular': 'card',
				'plural': 'cards'
			}
		};
	}

	_createClass(Backend, [{
		key: 'init',
		value: function init() {
			this.collection = [];
			this.cursor = '';
		}
	}, {
		key: 'getMetaCards',
		value: function getMetaCards(resolve, reject, category) {
			console.log('\nRetrieving backend collection ' + this.endpoint.metacard.plural + '...');

			var ql = category ? "category = '" + category + "'" : '';

			var options = {
				method: 'GET',
				endpoint: this.endpoint.metacard.plural,
				qs: {
					ql: ql,
					limit: 500
				}
			};

			this.dataClient.request(options, function (error, result) {
				if (error) {
					reject(error);
				} else {
					console.log('\nBackend GET returned:');
					console.log(result);

					resolve(result['entities']);
				}
			});
		}
	}, {
		key: 'getCard',
		value: function getCard(resolve, reject, cardId) {
			console.log('\nRetrieving single card from backend ...');

			var properties = {
				method: 'GET',
				type: this.endpoint.card.plural,
				uuid: cardId
			};

			this.dataClient.getEntity(properties, function (error, result) {
				if (error) {
					reject(error);
				} else {
					console.log('\nBackend GET returned:');
					console.log(result);

					resolve(result['_data']);
				}
			});
		}
	}, {
		key: 'updateEntity',
		value: function updateEntity(card, resolve, reject) {
			console.log('\nUpdating card in collection ...');

			var data = {
				'type': this.endpoint.metacard.singular
			};

			Object.assign(data, card);

			var properties = {
				client: this.dataClient,
				data: data
			};

			var entity = new usergrid.entity(properties);

			entity.save(function (error, result) {
				if (error) {
					reject(error);
				} else {
					console.log('\nEntity udpated, response:');
					console.log(result);

					resolve(result);
				}
			});
		}
	}, {
		key: 'addtoCollection',
		value: function addtoCollection(newCards, resolve, reject) {
			console.log('\nAdding cards to backend collection ...');

			var options = {
				method: 'POST',
				endpoint: this.endpoint.metacard.plural,
				body: newCards
			};

			this.dataClient.request(options, function (error, result) {
				if (error) {
					reject(error);
				} else {
					console.log('\nBackend POST returned:');
					console.log(result);

					resolve(result);
				}
			});
		}
	}]);

	return Backend;
}();

exports.default = Backend;