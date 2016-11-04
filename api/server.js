let Promise = require('bluebird');
let express = require('express');
let parser = require('body-parser');
let app = express();
let Config = require('../config');
let telegramService = require('./services/telegram-service');

app.use(parser.json());
app.get('/', (req, res) => {
	res.send('OK');
});

app.post('/codeship/:chatId/:format?', (req, res) => {
	res.send();
	let data = req.body ? req.body.build : null;
	if (data && (data.status == 'success' || data.status == 'error')) {
		telegramService.send(req.params.chatId, req.body, req.params.format);
	}
});

class Server {

	constructor(app) {
		this.app = app;
	}

	start() {
		return new Promise((resolve) => {
			this.instance = app.listen(Config.app.port, resolve);
		}).return(this.instance);
	}

}

module.exports = new Server(app);

