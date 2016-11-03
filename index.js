let express = require('express');
let app = express();

app.get('/', function (req, res) {
	res.send('OK');
});

app.post('/codeship', (req, res) => {
	console.log('Got request');
});

app.listen(3000);