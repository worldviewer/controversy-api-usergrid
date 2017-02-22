var usergrid = require('usergrid');

export default class Backend {
	constructor() {
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
		}
	}

	init() {
		this.collection = [];
		this.cursor = '';
	}

	getMetaCards(resolve, reject, category) {
		console.log('\nRetrieving backend collection ' + this.endpoint.metacard.plural + '...');

		let ql = category ?
			"category = '" + category + "'" :
			'';

		var options = {
			method: 'GET',
			endpoint: this.endpoint.metacard.plural,
			qs: {
				ql: ql,
				limit: 500
			}
		};

		this.dataClient.request(options, (error, result) => {
			if (error) {
				reject(error);
			} else {
				console.log('\nBackend GET returned:')
				console.log(result);

				resolve(result['entities']);
			}
		});
	}

	getCard(resolve, reject, cardId) {
		console.log('\nRetrieving single card from backend ...');

		let properties = { 
			method: 'GET', 
			type: this.endpoint.card.plural,
			uuid: cardId
		}; 

		this.dataClient.getEntity(properties, (error, result) => { 
			if (error) { 
				reject(error);
			} else { 
				console.log('\nBackend GET returned:')
				console.log(result);

				resolve(result['_data']);
			} 
		});
	}

	updateEntity(card, resolve, reject) {
		console.log('\nUpdating card in collection ...');

		let data = {
			'type': this.endpoint.metacard.singular
		};

		Object.assign(data, card);

		let properties = {
			client: this.dataClient,
			data: data
		};

		let entity = new usergrid.entity(properties);

		entity.save((error, result) => {
			if (error) {
				reject(error);
			} else {
				console.log('\nEntity udpated, response:')
				console.log(result);

				resolve(result);
			}
		});
	}

	addtoCollection(newCards, resolve, reject) {
		console.log('\nAdding cards to backend collection ...');

		var options = {
			method: 'POST',
			endpoint: this.endpoint.metacard.plural,
			body: newCards
		};

		this.dataClient.request(options, (error, result) => {
			if (error) {
				reject(error);
			} else {
				console.log('\nBackend POST returned:')
				console.log(result);

				resolve(result);
			}
		});

	}
}
