let Config = require('../../config');
let token = Config.app.botanToken;
let botan;
if (token) {
	botan = require('botanio')(token);
}

class BotanService {

	trackInitMessage(msg) {
		if (botan) {
			botan.track(msg, 'Start');
		}
	}

}

module.exports = new BotanService();
