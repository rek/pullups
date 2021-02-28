'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp()
/**
 * This Function updates the `/created` with the timestamp of the
 * last write to `/chat/$message`.
 */
exports.touch = functions.database.ref('/users/{user}/logs/{logid}/logs')
    .onWrite((change, context) => admin.database().ref('/created').set(context.timestamp))
//# sourceMappingURL=index.js.map