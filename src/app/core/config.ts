import * as _ from 'lodash';
import * as functions from 'firebase-functions';

class InternalConfig {

	app: {
		url: string;
		telegramToken: string;
	};

	static load(): InternalConfig {
		// Load firebase config

		const merged = _.merge({}, require('../../../config'), InternalConfig.loadFirebaseConfig());
		return Object.assign(new InternalConfig(), merged);
	}

	private static loadFirebaseConfig() {
		try	{
			let config = functions.config();
			return this.camelCaseObjectKeys(config);
		} catch (err) {
			console.warn('Not running in Firebase environment');
		}
		return {};
	}

	private static camelCaseObjectKeys(object: any) {
		const obj = {};
		Object.keys(object).forEach((key: string) => {
			const ccKey = _.camelCase(key);
			const value = object[key];
			if (_.isPlainObject(value)) {
				obj[ccKey] = this.camelCaseObjectKeys(value);
			} else {
				obj[ccKey] = value;
			}
		});

		return obj;
	}
}

export const Config = InternalConfig.load();
