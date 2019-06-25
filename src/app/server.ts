import * as express from 'express';
import * as parser from 'body-parser';
import {BuildService} from "./services/build_service";
import {telegramService, telegramWebhookPath} from "./services/telegram_service";

export const app = express();

app.use((req, res) => {
	console.log(req);
	res.send('works');
});

app.use(parser.json());
app.use(parser.urlencoded());
app.get('/', (req, res) => {
	res.redirect('https://telegram.me/codeship_bot');
});

app.get('/test', (req, res) => {
	res.send('works');
});

const redirects = {
	'-147834436': '-1001141933878'
};

const buildService = new BuildService();

app.post(telegramWebhookPath, (req, res) => {
	telegramService.processUpdate(req.body);
	res.status(200).send();
});

app.post('/:ci/:chatId', (req, res) => {

	let ci = req.params.ci;
	let chatId = req.params.chatId;
	if (redirects[chatId]) {
		chatId = redirects[chatId];
	}
	let data = req.body;
	if (data.payload) {
		data = JSON.parse(data.payload);
	}

	buildService.onBuild(ci, chatId, data)
		.then(() => {
			res.send();
		})
		.catch((err) => {
			console.error(err);
			res.status(400).send(err.msg);
		})
});

app.use((req, res) => {
	res.status(404).send('not found');
});

