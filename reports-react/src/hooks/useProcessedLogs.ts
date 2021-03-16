import { useQuery, useMutation } from "react-query";

import { firestore } from "../db";
import type { ProcessedLog } from "../types";
import { FIREBASE_COLLECTION_USERS } from "./useUsers";

const QUERY_KEY = "processedLogs";
const QUERY_KEY_SINGLE = "processedLog";

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

const ErrorResult: ProcessedLog[] = [];
// const ErrorResult = {
//   logId: "-1",
//   created: -1,
//   processed: -1,
//   weight: -1,
// };

export const useProcessedLogsForUser = (user: string) => {
  const { isLoading, error, data } = useQuery<ProcessedLog[], Error>(
    [QUERY_KEY, user],
    () =>
      firestore
        .collection(FIREBASE_COLLECTION_USERS)
        .doc(user)
        .collection(FIREBASE_COLLECTION_PROCESSED_LOGS)
        .get()
        .then(function (querySnapshot) {
          const result: ProcessedLog[] = [];
          querySnapshot.docs.forEach(function (doc) {
            result.push(doc.data() as ProcessedLog);
          });

          // console.log("result", result);

          if (result) {
            return result;
          }

          return ErrorResult;
        })
        .catch(function (error) {
          console.log("Error getting documents: ", error);
          return ErrorResult;
        }),
    {
      cacheTime: Infinity,
      staleTime: Infinity,
    }
  );

  return { isLoading, error, data };
};

export const useProcessedLog = (user: string, logId: string) => {
  const { isLoading, error, data } = useQuery<ProcessedLog[], Error>(
    [QUERY_KEY_SINGLE, user, logId],
    () =>
      firestore
        .collection(FIREBASE_COLLECTION_USERS)
        .doc(user)
        .collection(FIREBASE_COLLECTION_PROCESSED_LOGS)
        .where("logId", "==", logId)
        .get()
        .then(function (querySnapshot) {
          // console.log("querySnapshot", querySnapshot);

          const result: ProcessedLog[] = [];
          querySnapshot.docs.forEach(function (doc) {
            result.push(doc.data() as ProcessedLog);
          });

          // console.log("result", result);

          if (result) {
            return result;
          }

          return ErrorResult;
        })
        .catch(function (error) {
          console.log("Error getting documents: ", error);
          return ErrorResult;
        }),
    {
      enabled: logId !== "",
      // cacheTime: Infinity,
      // staleTime: Infinity,
    }
  );

  // console.log('Starting to logs for user', {id})

  return { isLoading, error, data };
};
