"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const codeship_service_1 = require("./services/codeship_service");
const gitlab_1 = require("./services/gitlab");
exports.handlers = {
    codeship: codeship_service_1.Codeship.processPayload,
    gitlab: gitlab_1.GitLab.processPayload
};
//# sourceMappingURL=handlers.js.map