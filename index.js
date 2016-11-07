let Server = require('./api/server');
let server = new Server();
let logger = require('./api/logger');

server.start()
	.then(() => {
		logger.log("Server started!");
	});