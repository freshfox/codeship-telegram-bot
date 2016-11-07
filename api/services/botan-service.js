let Config = require('../../config');
let token = Config.app.botanToken;
let botan;
if (token) {
	botan = require('botanio')(token);
}

function send(msg, event) {
	if (botan) {
		botan.track(msg, event);
	}
}

class BotanService {

	trackInitMessage(msg) {
		send(msg, 'Start');
	}

	trackBuildNotification(build) {
		build.from = {
			id: build.project_id
		};
		send(build, 'build');
	}

}

module.exports = new BotanService();
