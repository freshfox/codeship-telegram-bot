let Promise = require('bluebird');
let express = require('express');
let parser = require('body-parser');
let app = express();
let Config = require('../config');
let botanService = require('./services/botan-service');
let buildService = require('./services/build-service');
let logger = require('./logger');

app.use(parser.json());
app.get('/', (req, res) => {
	res.send('OK');
});

app.post('/codeship/:chatId', (req, res) => {
	res.send();
	let build = req.body ? req.body.build : null;
	let chatId = req.params.chatId;
	let mode = req.query.mode;
	let format = req.query.format;

	if (!build) {
		return;
	}

	logger.log('Build:', build.project_id, build.status);

	botanService.trackBuildNotification(build);
	buildService.onBuild(build, chatId, mode, format);
});

class Server {

	constructor() {
	}

	start() {
		return new Promise((resolve) => {
			this.instance = app.listen(Config.app.port, resolve);
		}).return(this.instance);
	}

}

module.exports = Server;

