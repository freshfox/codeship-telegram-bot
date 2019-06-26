import {handlers} from "../handlers";
import {telegramService} from "./telegram_service";
import {analyticsService} from './analytics_service';

export class BuildService {

	constructor() {
	}

    async onBuild(ci: string, chatId: string, data: any) {
		const handler = handlers[ci];
		if (!handler) {
			throw new Error('Unsupported CI service ' + ci);
		}

		console.log('Processing', data);

		const msg = handler(data);

		if (msg) {
			const result = await telegramService.send(chatId, msg);
			console.log(msg, result);
			await analyticsService.trackEvent(msg.projectName, msg.status, msg.userName, 0);
			return result;
		}
    }

}
