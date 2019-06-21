"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const parser = require("body-parser");
const build_service_1 = require("./services/build_service");
exports.app = express();
exports.app.use(parser.json());
exports.app.get('/', (req, res) => {
    res.redirect('https://telegram.me/codeship_bot');
});
const redirects = {
    '-147834436': '-1001141933878'
};
const buildService = new build_service_1.BuildService();
exports.app.post('/:ci/:chatId', (req, res) => {
    let ci = req.params.ci;
    let chatId = req.params.chatId;
    if (redirects[chatId]) {
        chatId = redirects[chatId];
    }
    buildService.onBuild(ci, chatId, req.body)
        .then(() => {
        res.send();
    })
        .catch((err) => {
        console.error(err);
        res.status(400).send(err.msg);
    });
});
//# sourceMappingURL=server.js.map