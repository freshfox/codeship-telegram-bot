let Config = require('../../config');
let url = require('url');
let webHook = url.resolve(Config.app.url, '/codeship');

class FormatterService {

	format(type, build) {
		return defaultFormat(chatId)
	}

	getStartMessage(chatId) {
		let hook = url.resolve(webHook, chatId);
		return `${FormatterService.EMOJI.ship} Add this URL to your Codeship notification settings:
				${hook}
				@codeship_bot by @dominic0`;
	}

}

FormatterService.EMOJI = {
	ship: '\u{1F6A2}',
	success: '\u{2705}',
	error: '\u{2705}'
};

function defaultFormat(build) {
	return `${FormatterService.EMOJI.ship} <b>${build.project_name}:</b> ${build.message}
			on <code>${build.branch}</code> - <b>${build.status}</b> ${FormatterService.EMOJI[build.status] || ''}
			<a href="${build.build_url}">Open on Codeship</a>`;
}

module.exports = new FormatterService();