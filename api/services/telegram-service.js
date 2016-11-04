let TelegramBot = require('node-telegram-bot-api');
let Config = require('../../config');
let formatter = require('./formatter-service');
let botan = require('./botan-service');

class TelegramService {

	constructor()  {
		this.bot = new TelegramBot(Config.app.telegram.token, { polling: true });
		this.bot.on('message', this.onMessage.bind(this));
	}

	onMessage(msg) {
		botan.trackInitMessage(msg);
		let text = formatter.getStartMessage(msg.chat.id);
		this.bot.sendMessage(msg.chat.id, text);
	}

	send(chatId, message, formatType) {
		return this.bot.sendMessage(chatId, formatter.format(formatType, message.build), {
			parse_mode: 'HTML',
			disable_web_page_preview: true
		})
			.then(() => {
				console.log(new Date().toISOString(), 'Sent message to', chatId);
			})
			.catch((err) => {
				console.error(new Date().toISOString());
				console.error(err);
				throw err;
			});
	}
}

module.exports = new TelegramService();