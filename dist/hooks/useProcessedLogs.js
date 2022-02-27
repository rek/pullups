import {useQuery, useMutation} from "../../_snowpack/pkg/react-query.js";
import {firestore} from "../db.js";
import {FIREBASE_COLLECTION_USERS} from "./useUsers.js";
const QUERY_KEY = "processedLogs";
const QUERY_KEY_SINGLE = "processedLog";
const FIREBASE_COLLECTION_PROCESSED_LOGS = "processedLogs";
export const mutateProcessedLogs = (user, onSuccess) => {
  const mutation = useMutation((data) => {
    return firestore.collection(FIREBASE_COLLECTION_USERS).doc(user).collection(FIREBASE_COLLECTION_PROCESSED_LOGS).add(data);
  }, {
    onSuccess: (data, next) => onSuccess && onSuccess(next)
  });
  return mutation;
};
const ErrorResult = [];
export const useProcessedLogsForUser = (user) => {
  const {isLoading, error, data} = useQuery([QUERY_KEY, user], () => firestore.collection(FIREBASE_COLLECTION_USERS).doc(user).collection(FIREBASE_COLLECTION_PROCESSED_LOGS).get().then(function(querySnapshot) {
    const result = [];
    querySnapshot.docs.forEach(function(doc) {
      result.push(doc.data());
    });
    if (result) {
      return result;
    }
    return ErrorResult;
  }).catch(function(error2) {
    console.log("Error getting documents: ", error2);
    return ErrorResult;
  }), {
    cacheTime: Infinity,
    staleTime: Infinity
  });
  return {isLoading, error, data};
};
export const useProcessedLog = (user, logId) => {
  const {isLoading, error, data} = useQuery([QUERY_KEY_SINGLE, user, logId], () => firestore.collection(FIREBASE_COLLECTION_USERS).doc(user).collection(FIREBASE_COLLECTION_PROCESSED_LOGS).where("logId", "==", logId).get().then(function(querySnapshot) {
    const result = [];
    querySnapshot.docs.forEach(function(doc) {
      result.push(doc.data());
    });
    if (result) {
      return result;
    }
    return ErrorResult;
  }).catch(function(error2) {
    console.log("Error getting documents: ", error2);
    return ErrorResult;
  }), {
    enabled: logId !== ""
  });
  return {isLoading, error, data};
};
export const getMarkersFromProcessedData = (processedLogData) => {
  let processedMarkers = [];
  if (processedLogData && processedLogData.items.length > 0) {
    processedMarkers = processedLogData.items.flatMap((pullup) => {
      return pullup.markers || [];
    }) || [];
  }
  return processedMarkers;
};
