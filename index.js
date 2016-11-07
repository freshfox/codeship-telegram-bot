let Server = require('./api/server');
let server = new Server();

server.start()
	.then(() => {
		console.log(new Date().toISOString(), "Server started!");
	});