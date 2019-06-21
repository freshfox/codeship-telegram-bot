"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const TelegramBot = require("node-telegram-bot-api");
const Config = require("../../../config");
const message_service_1 = require("./message_service");
class TelegramService {
    constructor() {
        this.bot = new TelegramBot(Config.app.telegram.token, { polling: true });
        this.bot.on('message', this.onMessage.bind(this));
    }
    onMessage(msg) {
        console.log('Start message sent');
        let text = message_service_1.MessageService.getStartMessage(msg.chat.id);
        return this.bot.sendMessage(msg.chat.id, text, {
            parse_mode: 'HTML',
            disable_web_page_preview: true
        });
    }
    send(chatId, message) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.bot.sendMessage(chatId, message_service_1.MessageService.getBuildMessage(message), {
                parse_mode: 'HTML',
                disable_web_page_preview: true
            });
        });
    }
}
exports.TelegramService = TelegramService;
//# sourceMappingURL=telegram_service.js.map