import { doc, getDoc } from "firebase/firestore";
import { useQuery } from "react-query";

import { getDatabase } from "../../../auth/getDatabase";
import { FIREBASE_COLLECTION_REPORTS, REPORT_QUERY_KEYS } from "../keys";

export const getReportDocRef = (keys: string[]) => {
  const { firestore } = getDatabase();
  return doc(firestore, FIREBASE_COLLECTION_REPORTS, ...keys);
};

export const getReport = async (user: string, type: string) => {
  const { firestore } = getDatabase();

  const docRef = getReportDocRef([user]);
  const docSnap = await getDoc(docRef);

  console.log("docSnap", docSnap);

  return docSnap;

  // return useQuery([REPORT_QUERY_KEYS.BASE, user], () =>
  //   firestore
  //     .collection(FIREBASE_COLLECTION_REPORTS)
  //     .doc(user)
  //     .collection(type)
  //     .get()
  //     .then(function (querySnapshot) {
  //       return querySnapshot.docs;
  //     })
  // );
};

export const useReportQuery = (user: string, type: string) => {
  return useQuery([REPORT_QUERY_KEYS.BASE, user], () => getReport(user, type), {
    cacheTime: Infinity,
    staleTime: Infinity,
  });
};
