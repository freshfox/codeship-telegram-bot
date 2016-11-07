let service = require('../api/services/telegram-service');
let Server = require('../api/server');
let server = new Server();

describe('Codeship Telegram Bot', function () {

	it('should send a Codeship status message to Telegram', () => {
		return service.send(13706525, resp.build);
	});

	describe('Server', function () {

		it('should start server', () => {
			return server.start();
		});

	});

});

let resp = { build:
{ build_url: 'https://app.codeship.com/projects/123456/builds/7891011',
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
	finished_at: '2016-11-03 20:23:11 UTC' } };