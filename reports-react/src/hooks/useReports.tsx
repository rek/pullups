import React from "react";
import { useQuery, useMutation } from "react-query";

import { firestore } from "../db";

const QUERY_KEY = "reports";

export interface PullupReport {
  logId: string;
  count: number;
  weight: number;
  created: string,
}
export const mutateReportPullups = (user: string) => {
  const mutation = useMutation((data: PullupReport) => {
    return firestore
      .collection("reports")
      .doc(user)
      .collection("pullups")
      .add(data);
  });

  return mutation;
};
export interface WeightReport {
  weight: number;
}
export const mutateReportWeight = (user: string) => {
  const mutation = useMutation((data: WeightReport) => {
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
