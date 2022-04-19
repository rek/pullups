import { useQuery } from "react-query";

import { firestore } from "../../db";
import type { ProcessedLog, UserReport } from "../../types";
import { FIREBASE_COLLECTION_USERS } from "../../service/users";

export const FIREBASE_COLLECTION_REPORTS = "reports";

const REPORT_QUERY_KEYS = {
  BASE: FIREBASE_COLLECTION_REPORTS,
};

export const useReport = (user: string, type: string) => {
  const { isLoading, error, data } = useQuery(
    [REPORT_QUERY_KEYS.BASE, user],
    () =>
      firestore
        .collection(FIREBASE_COLLECTION_REPORTS)
        .doc(user)
        .collection(type)
        .get()
        .then(function (querySnapshot) {
          return querySnapshot.docs;
        })
  );

  return { isLoading, error, data };
};

// reports get procesessed logs where the data is any key there
// that matches one of the fields here.
export const useReports = (user: string) => {
  const { isLoading, error, data } = useQuery<UserReport[]>(
    [REPORT_QUERY_KEYS.BASE, user],
    () =>
      firestore
        .collection(FIREBASE_COLLECTION_USERS)
        .doc(user)
        .collection(FIREBASE_COLLECTION_REPORTS)
        .get()
        .then(function (querySnapshot) {
          const result: UserReport[] = [];
          querySnapshot.docs.forEach(function (doc) {
            result.push(doc.data() as UserReport);
          });

          return result;
        })
        .catch(function (error) {
          console.log("Error getting documents: ", error);
        })
  );

  // console.log('Starting to get user reports for', {user})

  return { isLoading, error, data };
};
