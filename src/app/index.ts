import * as functions from 'firebase-functions';
import {app} from "./server";

export const api = functions.https.onRequest(app);
