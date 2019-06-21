"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Config = require("../../../config");
const handlers_1 = require("../handlers");
class MessageService {
    static getBuildMessage(info) {
        return `${info.emoji} <b>${info.projectName}</b> - <code>${info.branch}</code>
<b>${info.userName}</b>: ${info.message}
<a href="${info.url}">${info.linkText}</a>`;
    }
    static getStartMessage(chatId) {
        let hook = MessageService.getWebHooks(Object.keys(handlers_1.handlers), chatId);
        return `${Emoji.Ship} Hi! I see you want to receive Codeship or Gitlab notifications.
Just add this URL as a Webhook to your Codeship notification settings to receive notifications in this conversation.

To receive <b>only failing builds</b> (and the recovering builds)
${hook}

@codeship_bot by @dominic0`;
    }
    static getWebHooks(cis, chatId) {
        return cis.map((ci) => {
            return Config.app.url + `/${ci}/${chatId}`;
        }).join('\n');
    }
}
exports.MessageService = MessageService;
var Emoji;
(function (Emoji) {
    Emoji["Ship"] = "\uD83D\uDEA2";
    Emoji["Success"] = "\u2705";
    Emoji["Error"] = "\u274C";
    Emoji["QuestionMark"] = "\u2753";
})(Emoji = exports.Emoji || (exports.Emoji = {}));
//# sourceMappingURL=message_service.js.map