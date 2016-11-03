module.exports = {
	url: process.env.URL,
	port: process.env.PORT,
	telegram: {
		token: process.env.TELEGRAM_TOKEN,
		connection: {
			polling: true
		}
	}
};