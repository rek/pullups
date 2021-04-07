import * as functions from "firebase-functions";

const admin = require("firebase-admin");

admin.initializeApp();

exports.addCreatedDateToLogs = functions.firestore
  .document("/users/{user}/logs/{logId}")
  .onCreate((snap, context) => {
    // get user weight

    // const result = await processLog(row.data, user.weight);
    // console.log("[User Logs] Processing result:", result);
    // addProcessedLog.mutate({
    //   format: 1,
    //   logId: row._id,
    //   created: row.created.seconds,
    //   processed: +new Date(),
    //   weight: result.weight,
    //   report: result.report,
    // });
    return snap.ref.set(
      { created: context.timestamp, processed: false },
      { merge: true }
    );
  });
