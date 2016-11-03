let express = require('express');
let parser = require('body-parser');
let app = express();
let Config = require('./config');

let telegramService = require('./api/services/telegram-service');

app.use(parser.json());

app.post('/codeship/:chatId', (req, res) => {
	res.send();
	telegramService.send(req.body);
});

app.listen(Config.app.port, function()  {
	console.log(new Date().toDateString(), 'Server started!');
});