let buildService = require('../api/services/build-service');
let should = require('should');
let telegramService = require('../api/services/telegram-service');
let Promise = require('bluebird');


describe('WebHook', function () {

    beforeEach(() => {
        buildService.clear();
    });

    before(() => {
        telegramService.mock_send = telegramService.send;
        telegramService.send = function () {
            return Promise.resolve('sent');
        };
    });

    after(() => {
        telegramService.send = telegramService.mock_send;
        telegramService.mock_send = undefined;
    });

    it('should test default mode', () => {

        return buildService.onBuild(buildSuccess, 0)
            .then((result) => {
                should(result).undefined();
                return buildService.onBuild(buildError, 0)
            })
            .then((result) => {
                // sent
                should(result).not.undefined();
                return buildService.onBuild(buildSuccess, 0)
            })
            .then((result) => {
                // sent
                should(result).not.undefined();
                return buildService.onBuild(buildSuccess, 0)
            })
            .then((result) => {
                should(result).undefined();
                return buildService.onBuild(buildError, 0)
            })
    });

    it('should test all mode', () => {

        return buildService.onBuild(buildSuccess, 0, 'all')
            .then((result) => {
                should(result).not.undefined();
                return buildService.onBuild(buildError, 0, 'all')
            })
            .then((result) => {
                should(result).not.undefined();
                return buildService.onBuild(buildSuccess, 0, 'all')
            })
            .then((result) => {
                should(result).not.undefined();
                return buildService.onBuild(buildSuccess, 0, 'all')
            })
            .then((result) => {
                should(result).not.undefined();
                return buildService.onBuild(buildError, 0, 'all')
            })
    });

});

let buildSuccess = {
    build_url: 'https://app.codeship.com/projects/123456/builds/7891011',
    commit_url: 'https://github.com/freshfox/codeship-telegram-bot/commit/this-is-not-a-real-commit',
    project_id: 123456,
    build_id: 7891011,
    status: 'success',
    project_name: 'freshfox/codeship-telegram-bot',
    project_full_name: 'freshfox/codeship-telegram-bot',
    commit_id: '6b68ea648cc75b00cfacf00e748f0035e42b861b',
    short_commit_id: '6b68e',
    message: 'This is a test message',
    committer: 'Bartinger',
    branch: 'master',
    started_at: '2016-11-03 20:20:17 UTC',
    finished_at: '2016-11-03 20:23:11 UTC'
};

let buildError = {
    build_url: 'https://app.codeship.com/projects/123456/builds/7891011',
    commit_url: 'https://github.com/freshfox/codeship-telegram-bot/commit/this-is-not-a-real-commit',
    project_id: 123456,
    build_id: 7891011,
    status: 'error',
    project_name: 'freshfox/codeship-telegram-bot',
    project_full_name: 'freshfox/codeship-telegram-bot',
    commit_id: '6b68ea648cc75b00cfacf00e748f0035e42b861b',
    short_commit_id: '6b68e',
    message: 'This is a test message',
    committer: 'Bartinger',
    branch: 'master',
    started_at: '2016-11-03 20:20:17 UTC',
    finished_at: '2016-11-03 20:23:11 UTC'
};