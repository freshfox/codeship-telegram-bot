let TelegramBot = require('node-telegram-bot-api');
let Config = require('../../config');
let url = Config.app.url + '/codeship/';

let emoji = {
	ship: '\u{1F6A2}',
	success: '\u{2705}',
	error: '\u{2705}'
};

class TelegramService {

	constructor()  {
		this.bot = new TelegramBot('285777644:AAEP0CsItz4nKx_c8zfp-LL8JOrTCbTVf88', { polling: true });
		this.bot.on('message', this.onMessage.bind(this));
	}

	onMessage(msg) {
		let text = `${emoji.ship} Add this URL to your Codeship notification settings:
					${url}${msg.chat.id}
					@codeship_bot by @dominic0`;
		this.bot.sendMessage(msg.chat.id, text);
	}

	send(chatId, message, formatType) {
		return this.bot.sendMessage(chatId, format(message), {
			parse_mode: 'HTML',
			disable_web_page_preview: true
		})
			.then(() => {
				console.log(new Date().toDateString(), 'Sent message to', chatId);
			})
			.catch((err) => {
				console.error(new Date().toDateString());
				console.error(err);
			});
	}
}

function format(msg) {
	let build = msg.build;
	return `${emoji.ship} <b>${build.project_name}:</b> ${build.message}
			on <code>${build.branch}</code> - <b>${build.status}</b> ${emoji[build.status] || ''}
			<a href="${build.build_url}">Open on Codeship</a>`;
}

module.exports = new TelegramService();