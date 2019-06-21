"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const server_1 = require("./server");
exports.api = functions.region('europe-west1').https.onRequest(server_1.app);
//# sourceMappingURL=index.js.map