import * as functions from "firebase-functions";

const admin = require("firebase-admin");
admin.initializeApp();

exports.addCreatedDateToLogs = functions.firestore
  .document("/users/{user}/logs/{logId}")
  .onCreate((snap, context) => {
    // Access the parameter `{user}` with `context.params`
    // functions.logger.log("Detected addition of log:", context.params.logId);

    // You must return a Promise when performing asynchronous tasks inside a Functions such as
    // writing to Cloud Firestore.
    return snap.ref.set(
      { created: context.timestamp, processed: false },
      { merge: true }
    );
  });
