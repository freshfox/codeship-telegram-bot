let Config = require('../../config');
let url = require('url');
let webHook = url.resolve(Config.app.url, '/codeship/');

class FormatterService {

	format(type, build) {
		return defaultFormat(build)
	}

	getStartMessage(chatId) {
		let hook = this.getWebHook(chatId);
		return `${FormatterService.EMOJI.ship} Hi! I see you want to receive Codeship notifications.
Just add this URL as a Webhook to your Codeship notification settings to receive notifications in this conversation.

To receive <b>only failing builds</b> (and the recovering builds)
${hook}

To receive <b>all builds</b> (succeeding and failing)
${hook}?mode=all

@codeship_bot by @dominic0`;
	}

	getWebHook(chatId) {
		return url.resolve(webHook, `${chatId}`);
	}

}

FormatterService.EMOJI = {
	ship: '\u{1F6A2}',
	success: '\u{2705}',
	error: '\u{274C}'
};

function defaultFormat(build) {
	return `${FormatterService.EMOJI.ship} <b>${build.project_name}</b> - <code>${build.branch}</code> ${FormatterService.EMOJI[build.status] || ''}
<b>${build.committer}</b>: ${build.message}
<a href="${build.build_url}">Open on Codeship</a>`;
}

module.exports = new FormatterService();