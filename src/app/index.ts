import * as functions from 'firebase-functions';
import {app} from "./server";

export const api = functions.region('europe-west1').https.onRequest(app);
