let TelegramBot = require('node-telegram-bot-api');
let Config = require('../../config');
let formatter = require('./formatter-service');
let botan = require('./botan-service');
let logger = require('../logger');

class TelegramService {

	constructor()  {
		this.bot = new TelegramBot(Config.app.telegram.token, { polling: true });
		this.bot.on('message', this.onMessage.bind(this));
	}

	onMessage(msg) {
		botan.trackInitMessage(msg);
		let text = formatter.getStartMessage(msg.chat.id);
		return this.bot.sendMessage(msg.chat.id, text, {
			parse_mode: 'HTML',
			disable_web_page_preview: true
		});
	}

	send(chatId, message, formatType) {
		return this.bot.sendMessage(chatId, formatter.format(formatType, message), {
			parse_mode: 'HTML',
			disable_web_page_preview: true
		})
			.then(() => {
				logger.log('Sent message to', chatId);
				return 'sent'
			})
			.catch((err) => {
				logger.error(err);
				throw err;
			});
	}
}

module.exports = new TelegramService();
