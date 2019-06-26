import {Emoji, MessageInfo} from './message_service';

export namespace TravisCi {

	export interface WebhookPayload {
		id: number,
		number: string,
		type: string,
		state: string,
		status: 1 | 0,
		result: 1 | 0,
		status_message: State,
		result_message: State,
		started_at: string,
		finished_at: string,
		duration: number,
		build_url: string,
		commit_id: number,
		commit: string,
		base_commit: null,
		head_commit: null,
		branch: string,
		message: string,
		compare_url: string,
		committed_at: string,
		author_name: string,
		author_email: string,
		committer_name: string,
		committer_email: string,
		pull_request: false,
		pull_request_number: null,
		pull_request_title: null,
		tag: null,
		repository: {
			id: number,
			name: string,
			owner_name: string,
			url: string
		}
	}

	export function processPayload(payload: WebhookPayload): MessageInfo {
		return {
			branch: payload.branch,
			linkText: 'Open on TravisCI',
			message: payload.message,
			projectName: `${payload.repository.owner_name}/${payload.repository.name}`,
			url: payload.build_url,
			userName: payload.committer_name,
			emoji: getEmoji(payload.status_message),
			status: payload.status_message
		};
	}

	function getEmoji(state: State) {
		switch (state) {
			case State.Passed:
			case State.Fixed:
				return Emoji.Success;
			case State.Failed:
			case State.Broken:
			case State.Still_Failing:
			case State.Canceled:
			case State.Errored:
				return Emoji.Error;
		}
		return Emoji.QuestionMark;
	}

	export enum State {
		Passed = 'Passed',
		Pending = 'Pending',
		Fixed = 'Fixed',
		Broken = 'Broken',
		Failed = 'Failed',
		Still_Failing = 'Still Failing',
		Canceled = 'Canceled',
		Errored = 'Errored'
	}

}
