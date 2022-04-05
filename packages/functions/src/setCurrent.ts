import * as functions from "firebase-functions";

export const setCurrent = (admin: any) => {
  return functions.https.onRequest((request, response) => {
    // console.log("setCurrent request");
    // console.log("request", request);
    // console.log(request.body);
    functions.logger.info("Set current body:", request.body);

    // await admin.collection(`/users`).doc(context.params.user);

    response.status(200).end();

    return Promise.resolve();
  });
};
