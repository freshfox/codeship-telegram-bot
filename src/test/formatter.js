let should = require('should');
let formatter = require('../api/services/formatter-service');

describe('FormatterService', () => {

    it('should format web hook url', () => {

        should(formatter.getWebHook(123)).equal('https://ship.freshfox.at/codeship/123');

    });

});