let server = require('./api/server');

server.start()
	.then(() => {
		console.log(new Date().toISOString(), "Server started!");
	});