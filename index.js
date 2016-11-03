let express = require('express');
let parser = require('body-parser');
let app = express();

let telegramService = require('./api/services/telegram-service');

app.use(parser.json());

app.post('/codeship/:chatId', (req, res) => {
	res.send();
	telegramService.send(req.body);
});

app.listen(3000, function()  {

});