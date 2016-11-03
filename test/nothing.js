let service = require('../api/services/telegram-service');

describe('Codeship Telegram Bot', () => {

	it('should send a Codeship status message to Telegram', () => {

		return service.send(13706525, resp2);

	});

});

let resp1 = { build:
{ build_url: 'https://app.codeship.com/projects/183097/builds/19791857',
	commit_url: 'https://github.com/Bartinger/codeship-telegram-bot/commit/6b68ea648cc75b00cfacf00e748f0035e42b861b',
	project_id: 183097,
	build_id: 19791857,
	status: 'testing',
	project_name: 'Bartinger/codeship-telegram-bot',
	project_full_name: 'Bartinger/codeship-telegram-bot',
	commit_id: '6b68ea648cc75b00cfacf00e748f0035e42b861b',
	short_commit_id: '6b68e',
	message: 'Add test dir',
	committer: 'Bartinger',
	branch: 'master',
	started_at: '2016-11-03 20:20:17 UTC',
	finished_at: null } };

let resp2 = { build:
{ build_url: 'https://app.codeship.com/projects/183097/builds/19791857',
	commit_url: 'https://github.com/Bartinger/codeship-telegram-bot/commit/6b68ea648cc75b00cfacf00e748f0035e42b861b',
	project_id: 183097,
	build_id: 19791857,
	status: 'success',
	project_name: 'Bartinger/codeship-telegram-bot',
	project_full_name: 'Bartinger/codeship-telegram-bot',
	commit_id: '6b68ea648cc75b00cfacf00e748f0035e42b861b',
	short_commit_id: '6b68e',
	message: 'Add test dir',
	committer: 'Bartinger',
	branch: 'master',
	started_at: '2016-11-03 20:20:17 UTC',
	finished_at: '2016-11-03 20:23:11 UTC' } };