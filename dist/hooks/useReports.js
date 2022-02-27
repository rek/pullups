import {useQuery, useMutation} from "../../_snowpack/pkg/react-query.js";
import {firestore} from "../db.js";
import {FIREBASE_COLLECTION_USERS} from "./useUsers.js";
const QUERY_KEY = "reports";
const FIREBASE_COLLECTION_REPORTS = "reports";
export const mutateReport = (user, version = "v1") => {
  const mutation = useMutation((data) => {
    return firestore.collection(FIREBASE_COLLECTION_REPORTS).doc(user).collection(version).add(data);
  });
  return mutation;
};
export const mutateReportWeight = (user) => {
  const mutation = useMutation((data) => {
    return firestore.collection(FIREBASE_COLLECTION_REPORTS).doc(user).collection("weight").add(data);
  });
  return mutation;
};
export const useReport = (user, type) => {
  const {isLoading, error, data} = useQuery([QUERY_KEY, user], () => firestore.collection(FIREBASE_COLLECTION_REPORTS).doc(user).collection(type).get().then(function(querySnapshot) {
    return querySnapshot.docs;
  }));
  return {isLoading, error, data};
};
export const useReports = (user) => {
  const {isLoading, error, data} = useQuery([QUERY_KEY, user], () => firestore.collection(FIREBASE_COLLECTION_USERS).doc(user).collection(FIREBASE_COLLECTION_REPORTS).get().then(function(querySnapshot) {
    const result = [];
    querySnapshot.docs.forEach(function(doc) {
      result.push(doc.data());
    });
    return result;
  }).catch(function(error2) {
    console.log("Error getting documents: ", error2);
  }));
  return {isLoading, error, data};
};
