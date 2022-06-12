import * as functions from 'firebase-functions'
import admin from 'firebase-admin'
import { processLog } from 'detect-pullups'

import { updateReports } from './updateReports'

admin.initializeApp()
const db = admin.firestore()

exports.setCurrent = functions.https.onRequest(async (request, response) => {
    // functions.logger.info("Set current body:", request.body);

    if (request.body && request.body.user) {
        const user = request.body.user
        await db.collection('/settings').doc('state').set({ active: user })
    }

    response.status(200).end()

    return Promise.resolve()
})

// exports.addCreatedDateToLogs = functions.firestore
//   .document("/users/{user}/logs/{logId}")
//   .onCreate((snap, context) => {
//     // Access the parameter `{user}` with `context.params`
//     // functions.logger.log("Detected addition of log:", context.params.logId);

//     // You must return a Promise when performing asynchronous tasks inside a Functions such as
//     // writing to Cloud Firestore.
//     return snap.ref.set(
//       { created: context.timestamp, processed: false },
//       { merge: true }
//     );
//   });

exports.processLogs = functions.firestore
    .document('/users/{user}/logs/{logId}')
    .onCreate(async (snap, context) => {
        console.log(`Checking: ${context.params.user}`)

        await snap.ref.set(
            { created: context.timestamp, processed: false },
            { merge: true }
        )

        // get user weight
        let userWeight = 0
        await db
            .collection('/users')
            .doc(context.params.user)
            .get()
            .then(function (querySnapshot: any) {
                // console.log("Found user snap:", querySnapshot._fieldsProto);
                const result = querySnapshot.data()
                // console.log("Found user data:", result);
                if (result) {
                    userWeight = result.weight
                }
            })

        console.log('Weight found...', userWeight)

        const logData = snap.data()
        const result = await processLog(logData.logs, userWeight)
        // console.log("[User Logs] Processing result:", result);

        await snap.ref.set({ processed: true }, { merge: true })

        // update users weight if weight found
        if (result.weight) {
            await db
                .collection('/users')
                .doc(context.params.user)
                .set(
                    {
                        weight: result.weight,
                        weightLastUpdated: +new Date(),
                    },
                    { merge: true }
                )
        }

        // add processed log
        await await db
            .collection('/users')
            .doc(context.params.user)
            .collection('/processedLogs')
            .add({
                format: 1,
                logId: context.params.logId,
                processed: +new Date(),
                weight: result.weight,
                report: result.report,
            })

        await updateReports(db)

        return Promise.resolve()
    })
