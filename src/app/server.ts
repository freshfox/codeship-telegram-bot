import * as express from 'express';
import * as parser from 'body-parser';
import {BuildService} from "./services/build_service";

export const app = express();

app.use(parser.json());
app.get('/', (req, res) => {
	res.redirect('https://telegram.me/codeship_bot');
});

const redirects = {
	'-147834436': '-1001141933878'
};

const buildService = new BuildService();

app.post('/:ci/:chatId', (req, res) => {

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
		})

});

