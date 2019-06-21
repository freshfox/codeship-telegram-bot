import {Emoji, MessageInfo} from "./message_service";

export namespace GitLab {

	export interface WebhookPayload {
		object_kind: string,
		ref: string,
		tag: boolean,
		before_sha: string,
		sha: string,
		build_id: number,
		build_name: string,
		build_stage: string,
		build_status: string,
		build_started_at: null,
		build_finished_at: null,
		build_duration: null,
		build_allow_failure: boolean,
		build_failure_reason: string,
		project_id: number,
		project_name: string,
		user: {
			id: number,
			name: string,
			email: string
		},
		commit: {
			id: number,
			sha: string,
			message: string,
			author_name: string,
			author_email: string,
			status: string,
			duration: null,
			started_at: null,
			finished_at: null
		},
		repository: {
			name: string,
			description: string,
			homepage: string,
			git_ssh_url: string,
			git_http_url: string,
			visibility_level: number
		}
	}

	export function processPayload(payload: WebhookPayload): MessageInfo {
		if (payload.build_status !== 'success' && payload.build_status !== 'error') {
			return null;
		}
		return {
			userName: payload.commit.author_name,
			url: payload.repository.homepage + '/-/jobs/' + payload.build_id,
			message: payload.commit.message,
			branch: payload.ref,
			projectName: payload.repository.name,
			linkText: 'Open on Gitlab',
			emoji: getEmoji(payload.build_status)
		};
	}

	function getEmoji(status: string) {
		switch (status) {
			case 'success': return Emoji.Success;
			case 'error': return Emoji.Error;
		}
		return Emoji.QuestionMark;
	}

}
