let TelegramBot = require('node-telegram-bot-api');
let url = 'http://80.108.157.35:3000/codeship/';

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
		console.log(msg);
		var fromId = msg.chat.id;
		this.bot.sendMessage(fromId, 'Add this URL to your Codeship notification settings: ' + url + fromId);
	}

	send(chatId, message) {
		return this.bot.sendMessage(chatId, format(message), {
			parse_mode: 'HTML',
			disable_web_page_preview: true
		})
			.then(() => {
				console.log('Sent message to', chatId);
			})
			.catch((err) => {
				console.error(err);
			});
	}
}

function format(msg) {
	let build = msg.build;
	return `${emoji.ship}<b>${build.project_name}:</b> ${build.message}\n
			on <code>${build.branch}</code> - <b>${build.status}</b> ${emoji[build.status] || ''}\n
			<a href="${build.build_url}">Open on Codeship</a>`;
}

module.exports = new TelegramService();