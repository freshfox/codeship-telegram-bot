import * as TelegramBot from 'node-telegram-bot-api';
import {MessageInfo, MessageService} from "./message_service";
import {Config} from "../core/config";

class TelegramService {

	private bot;

	constructor()  {
		this.bot = new TelegramBot(Config.app.telegramToken);
		this.bot.setWebHook(Config.app.url + telegramWebhookPath);
		this.bot.on('message', this.onMessage.bind(this));
	}

	onMessage(msg) {
		console.log('Start message sent');
		let text = MessageService.getStartMessage(msg.chat.id);
		return this.bot.sendMessage(msg.chat.id, text, {
			parse_mode: 'HTML',
			disable_web_page_preview: true
		});
	}

	async send(chatId: string, message: MessageInfo) {
		return this.bot.sendMessage(chatId, MessageService.getBuildMessage(message), {
			parse_mode: 'HTML',
			disable_web_page_preview: true
		});
	}

	processUpdate(body: any) {
		return this.bot.processUpdate(body);
	}
}

export const telegramWebhookPath = '/telegram' + Config.app.telegramToken;

export const telegramService = new TelegramService();
