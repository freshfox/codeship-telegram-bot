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
const handlers_1 = require("../handlers");
const telegram_service_1 = require("./telegram_service");
class BuildService {
    constructor() {
    }
    onBuild(ci, chatId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const handler = handlers_1.handlers[ci];
            if (!handler) {
                throw new Error('Unsupported CI service ' + ci);
            }
            console.log('Processing', data);
            const msg = handler(data);
            if (msg) {
                const result = yield telegram_service_1.telegramService.send(chatId, msg);
                console.log(msg, result);
                return result;
            }
        });
    }
}
exports.BuildService = BuildService;
//# sourceMappingURL=build_service.js.map