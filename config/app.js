module.exports = {
	url: process.env.URL,
	telegram: {
		token: process.env.TELEGRAM_TOKEN,
		connection: {
			polling: true
		}
	}
};
