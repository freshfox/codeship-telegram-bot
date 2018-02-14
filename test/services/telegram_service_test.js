
const service = require('../../api/services/telegram-service');

describe('TelegramService', function () {

    it('should send a message', () => {

    	return service.send(-147834436, 'Hello')

    });

});
