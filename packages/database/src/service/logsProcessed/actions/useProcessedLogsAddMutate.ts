import { useQuery, useMutation } from "react-query";
// import type { LogReport, Marker } from "detect-pullups";

import { processedLogsCollection } from "../keys";
import { FIREBASE_COLLECTION_USERS } from "../../users/keys";
import { getDatabase } from "../../../auth/getDatabase";
import type { ProcessedLog, ProcessedLogs } from "../types";

export const useProcessedLogsAddMutate = (
  user: string,
  onSuccess: (data: ProcessedLogs) => void
) => {
  const { firestore } = getDatabase();

  // const mutation = useMutation(
  //   (data: ProcessedLog) => {
  //     return firestore
  //       .collection(FIREBASE_COLLECTION_USERS)
  //       .doc(user)
  //       .collection(processedLogsCollection)
  //       .add(data);
  //   },
  //   {
  //     onSuccess: (data, next) => onSuccess && onSuccess(next),
  //   }
  // );

  // return mutation;
};
