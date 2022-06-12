import { useMutation } from "react-query";

import { getDatabase } from "../../../auth/getDatabase";
// import { QUERY_LOGS_KEY } from "../../logs/keys";

export const useMarkAsProcessedLogData = (user: string) => {
  const { firestore } = getDatabase();

  const mutation = useMutation((logId: string, processed = true) => {
    return Promise.resolve();
    // return firestore
    // .collection(USER_COLLECTION)
    // .doc(user)
    // .collection(LOG_COLLECTION)
    // .doc(logId)
    // .set({ processed }, { merge: true });
  });

  return mutation;
};
