import {MessageInfo} from './message_service';

export namespace TravisCi {

	export interface WebhookPayload {
		id: number,
		number: string,
		type: string,
		state: State,
		status: 1 | 0,
		result: 1 | 0,
		status_message: string,
		result_message: string,
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

	export enum State {

	}

	export function processPayload(payload: WebhookPayload): MessageInfo {
		return {} as any;
	}

}
