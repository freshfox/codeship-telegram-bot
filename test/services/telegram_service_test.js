
const service = require('../../api/services/telegram-service');

describe('TelegramService', function () {

    it.skip('should send a message', () => {

    	return service.send(-147834436, 'Hello')

    });

    it('should trigger welcome message', () => {

		return service.onMessage({
			chat: {
				id: 13706525
			}
		});

    });

});
