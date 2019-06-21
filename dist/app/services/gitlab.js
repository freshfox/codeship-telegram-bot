"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const message_service_1 = require("./message_service");
var GitLab;
(function (GitLab) {
    let Status;
    (function (Status) {
        Status["Success"] = "success";
        Status["Failed"] = "failed";
        Status["Running"] = "running";
        Status["Created"] = "created";
    })(Status = GitLab.Status || (GitLab.Status = {}));
    function processPayload(payload) {
        if (payload.build_status !== Status.Success && payload.build_status !== Status.Failed) {
            return null;
        }
        return {
            userName: payload.commit.author_name,
            url: payload.repository.homepage + '/-/jobs/' + payload.build_id,
            message: payload.commit.message,
            branch: payload.ref,
            projectName: payload.repository.name,
            linkText: 'Open on Gitlab',
            emoji: getEmoji(payload.build_status)
        };
    }
    GitLab.processPayload = processPayload;
    function getEmoji(status) {
        switch (status) {
            case Status.Success: return message_service_1.Emoji.Success;
            case Status.Failed: return message_service_1.Emoji.Error;
        }
        return message_service_1.Emoji.QuestionMark;
    }
})(GitLab = exports.GitLab || (exports.GitLab = {}));
//# sourceMappingURL=gitlab.js.map