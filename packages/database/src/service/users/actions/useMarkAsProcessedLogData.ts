import { useMutation } from "react-query";

import { getDatabase } from "../../../getDatabase";
import { LOG_COLLECTION } from "../../logs/keys";

export const markAsProcessedLogData = (user: string) => {
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
