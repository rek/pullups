import { useQuery, useMutation } from "react-query";
import type { LogReport, Marker } from "detect-pullups";

import { firestore } from "../db";
import type { ProcessedLog } from "../types";
import { FIREBASE_COLLECTION_USERS } from "../service/users";

const FIREBASE_COLLECTION_PROCESSED_LOGS = "processedLogs";

export const mutateProcessedLogs = (
  user: string,
  onSuccess: (data: ProcessedLog) => void
) => {
  const mutation = useMutation(
    (data: ProcessedLog) => {
      return firestore
        .collection(FIREBASE_COLLECTION_USERS)
        .doc(user)
        .collection(FIREBASE_COLLECTION_PROCESSED_LOGS)
        .add(data);
    },
    {
      onSuccess: (data, next) => onSuccess && onSuccess(next),
    }
  );

  return mutation;
};
