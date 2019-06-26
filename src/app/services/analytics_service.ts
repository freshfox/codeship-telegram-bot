import * as ua from 'universal-analytics';

export interface IAnalyticsConfig {
	trackingId: string;
	disabled?: boolean;
}

export class AnalyticsService {

	private tracker;

	constructor(private config: IAnalyticsConfig) {
		if (!this.config.disabled) {
			this.tracker = ua(config.trackingId);
		}
	}

	trackPageView(path: string, hostname: string) {
		if (this.config.disabled) {
			return Promise.resolve();
		}
		return new Promise((resolve, reject) => {
			this.tracker.pageview(path, hostname, (err) => {
				if (err) return reject(err);
				resolve();
			})
		})
	}

	trackEvent(category: string, action: string, label: string, value: number): Promise<void> {
		if (this.config.disabled) {
			return Promise.resolve();
		}
		return new Promise((resolve, reject) => {
			this.tracker.event(category, action, label, value, (err) => {
				if (err) return reject(err);
				resolve();
			});
		});
	}

	trackTiming(category: string, variable: string, time: number, label: string): Promise<void> {
		if (this.config.disabled) {
			return Promise.resolve();
		}
		return new Promise((resolve, reject) => {
			this.tracker.timing(category, variable, time, label, (err) => {
				if (err) return reject(err);
				resolve();
			});
		});
	}
}

export const analyticsService = new AnalyticsService({
	trackingId: 'UA-57293663-3'
});
