"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const functions = require("firebase-functions");
class InternalConfig {
    static load() {
        // Load firebase config
        const merged = _.merge({}, require('../../../config'), InternalConfig.loadFirebaseConfig());
        return Object.assign(new InternalConfig(), merged);
    }
    static loadFirebaseConfig() {
        try {
            let config = functions.config();
            return this.camelCaseObjectKeys(config);
        }
        catch (err) {
            console.warn('Not running in Firebase environment');
        }
        return {};
    }
    static camelCaseObjectKeys(object) {
        const obj = {};
        Object.keys(object).forEach((key) => {
            const ccKey = _.camelCase(key);
            const value = object[key];
            if (_.isPlainObject(value)) {
                obj[ccKey] = this.camelCaseObjectKeys(value);
            }
            else {
                obj[ccKey] = value;
            }
        });
        return obj;
    }
}
exports.Config = InternalConfig.load();
//# sourceMappingURL=config.js.map