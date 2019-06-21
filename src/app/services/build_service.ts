import {handlers} from "../handlers";
import {TelegramService} from "./telegram_service";


export class BuildService {

	private readonly telegram: TelegramService;

	constructor() {
		this.telegram = new TelegramService();
	}

    async onBuild(ci: string, chatId: string, data: any) {
		const handler = handlers[ci];
		if (!handler) {
			throw new Error('Unsupported CI service ' + ci);
		}

		console.log('Processing', data);

		const msg = handler(data);

		if (msg) {
			const result = await this.telegram.send(chatId, msg);
			console.log(msg, result);
			return result;
		}
    }

}
