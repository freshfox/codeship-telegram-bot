"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const message_service_1 = require("./message_service");
var Codeship;
(function (Codeship) {
    let Status;
    (function (Status) {
        Status["Initiated"] = "initiated";
        Status["Error"] = "error";
        Status["Success"] = "success";
        Status["Stopped"] = "stopped";
        Status["Waiting"] = "waiting";
        Status["Ignored"] = "ignored";
        Status["Blocked"] = "blocked";
        Status["InfrastructureFailure"] = "infrastructure_failure";
    })(Status = Codeship.Status || (Codeship.Status = {}));
    function processPayload(payload) {
        const build = payload.build;
        return {
            linkText: 'Open on Codeship',
            userName: build.committer,
            projectName: build.project_name,
            branch: build.branch,
            message: build.message,
            url: build.build_url,
            emoji: getEmoji(build.status)
        };
    }
    Codeship.processPayload = processPayload;
    function getEmoji(status) {
        switch (status) {
            case Codeship.Status.Success: return message_service_1.Emoji.Success;
            case Codeship.Status.Error: return message_service_1.Emoji.Error;
        }
        return message_service_1.Emoji.QuestionMark;
    }
})(Codeship = exports.Codeship || (exports.Codeship = {}));
//# sourceMappingURL=codeship_service.js.map