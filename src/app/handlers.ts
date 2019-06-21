import {Codeship} from "./services/codeship_service";
import {MessageInfo} from "./services/message_service";
import {GitLab} from "./services/gitlab";

export type BuildPayloadHandler = (data) => MessageInfo;

export const handlers: {[ci: string]: BuildPayloadHandler} = {
	codeship: Codeship.processPayload,
	gitlab: GitLab.processPayload
};
