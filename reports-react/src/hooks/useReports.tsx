import { useQuery, useMutation } from "react-query";

import { firestore } from "../db";
import type { ProcessedLog } from "../types";

const QUERY_KEY = "reports";

export const mutateReport = (user: string, version: string = "v1") => {
  const mutation = useMutation((data: ProcessedLog) => {
    return firestore
      .collection("reports")
      .doc(user)
      .collection(version)
      .add(data);
  });

  return mutation;
};

export const mutateReportWeight = (user: string) => {
  const mutation = useMutation((data: ProcessedLog) => {
    return firestore
      .collection("reports")
      .doc(user)
      .collection("weight")
      .add(data);
  });

  return mutation;
};

export const useReport = (user: string, type: string) => {
  const { isLoading, error, data } = useQuery([QUERY_KEY, user], () =>
    firestore
      .collection("reports")
      .doc(user)
      .collection(type)
      .get()
      .then(function (querySnapshot) {
        return querySnapshot.docs;
      })
  );

  return { isLoading, error, data };
};

export const useReports = (user: string = "anette", type: string = "scale") => {
  const { isLoading, error, data } = useQuery([QUERY_KEY, user], () =>
    firestore
      .collection("users")
      .doc(user)
      .collection("reports")
      .doc(type)
      .get()
      .then(function (querySnapshot) {
        // console.log(querySnapshot.data());

        return querySnapshot.data();
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      })
  );

  // console.log('Starting to get user', {id})

  return { isLoading, error, data };
};
