import {handlers} from "../handlers";
import {Config} from "../core/config";

export class MessageService {

	static getBuildMessage(info: MessageInfo) {
		return `${info.emoji} <b>${info.projectName}</b> - <code>${info.branch}</code>
<b>${info.userName}</b>: ${info.message}
<a href="${info.url}">${info.linkText}</a>`;
	}

	static getStartMessage(chatId: string) {
		let hook = MessageService.getWebHooks(Object.keys(handlers), chatId);
		return `${Emoji.Ship} Hi! I see you want to receive Codeship or Gitlab notifications.
Just add this URL as a Webhook to your Codeship notification settings to receive notifications in this conversation.

To receive <b>only failing builds</b> (and the recovering builds)
${hook}

@codeship_bot by @dominic0`;
	}

	private static getWebHooks(cis: string[], chatId: string) {
		return cis.map((ci) => {
			return Config.app.url + `/${ci}/${chatId}`;
		}).join('\n');
	}

}

export interface MessageInfo {
	emoji: Emoji;
	projectName: string;
	branch: string;
	userName: string;
	message: string;
	url: string
	linkText: string;
}


export enum Emoji  {
	Ship = '\u{1F6A2}',
	Success = '\u{2705}',
	Error = '\u{274C}',
	QuestionMark = '\u2753'
}
