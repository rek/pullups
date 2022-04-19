import { doc, deleteDoc } from "firebase/firestore";

import { useMutation } from "react-query";
import { getUsersDocRef } from "../../users";
import { FIREBASE_KEY_LOG } from "./useLogQuery";

export const deleteLogData = (user: string) => {
  const mutation = useMutation((logId: string) => {
    const ref = getUsersDocRef([user, FIREBASE_KEY_LOG, logId]);
    return deleteDoc(ref);
  });

  return mutation;
};
