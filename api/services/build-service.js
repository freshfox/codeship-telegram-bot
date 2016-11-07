let cache = {};
let telegramService = require('./telegram-service');
let Promise = require('bluebird');

class BuildService {

    getBuild(projectId) {
        return cache[projectId];
    }

    setBuild(build) {
        cache[build.project_id] = build;
    }

    didLastBuildSucceed(projectId) {
        let build = this.getBuild(projectId);
        return build ? build.status == 'success' : true;
    }

    clear() {
        cache = {};
    }

    onBuild(build, chatId, mode, format) {
        // Just listen for success and errors
        if (build.status != 'success' && build.status != 'error') {
            return Promise.resolve();
        }

        if (mode != 'all') {
            let success = this.didLastBuildSucceed(build.project_id);
            this.setBuild(build);

            // Did last build succeed
            if (build.status != 'error' && success) {
                return Promise.resolve();
            }
        }

        return telegramService.send(chatId, build, format);
    }

}

module.exports = new BuildService();