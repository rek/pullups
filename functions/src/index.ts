import * as functions from "firebase-functions";

const admin = require("firebase-admin");
admin.initializeApp();

/**
 * This Function updates the `/created` with the timestamp of the
 * last write to `/users/{user}/logs/{logid}`.
 */
exports.touch = functions.database
  .ref("/users/{user}/logs/{logid}")
  // .ref("/users/{user}/logs/{logid}/logs")
  .onWrite((change, context) =>
    admin.database().ref("/created").set(context.timestamp)
  );
