import {Emoji, MessageInfo} from "./message_service";

export namespace Codeship {
	export interface WebhookPayload {
		build:  {
			build_url: string,
			commit_url: string,
			project_id: number,
			build_id: number,
			status: Status,
			project_name: string,
			commit_id: string,
			short_commit_id: string,
			message: string,
			committer: string,
			branch: string
		}
	}


	export enum Status {
		Initiated = 'initiated',
		Error = 'error',
		Success = 'success',
		Stopped = 'stopped',
		Waiting = 'waiting',
		Ignored = 'ignored',
		Blocked = 'blocked',
		InfrastructureFailure = 'infrastructure_failure'
	}

	export function processPayload(payload: Codeship.WebhookPayload): MessageInfo {
		const build = payload.build;
		return {
			linkText: 'Open on Codeship',
			userName: build.committer,
			projectName: build.project_name,
			branch: build.branch,
			message: build.message,
			url: build.build_url,
			emoji: getEmoji(build.status)
		}
	}

	function getEmoji(status: Codeship.Status) {
		switch (status) {
			case Codeship.Status.Success: return Emoji.Success;
			case Codeship.Status.Error: return Emoji.Error;
		}
		return Emoji.QuestionMark;
	}

}
