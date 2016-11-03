let express = require('express');
let parser = require('body-parser');
let app = express();
let Config = require('./config');

let telegramService = require('./api/services/telegram-service');

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

app.listen(Config.app.port, function()  {
	console.log(new Date().toDateString(), 'Server started!');
});