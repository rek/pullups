import React from "react";
import { useQuery, useMutation } from "react-query";

import { firestore } from "../db";

const QUERY_KEY = "reports";

export const mutateReportPullups = (user: string) => {
  const mutation = useMutation((pullups: number) => {
    return firestore.collection("reports").doc(user).update({ pullups });
  });

  return mutation;
};

export const useReport = (user: string) => {
  const { isLoading, error, data } = useQuery([QUERY_KEY, user], () =>
    firestore
      .collection("users")
      .doc(user)
      .collection("reports")
      .get()
      .then(function (querySnapshot) {
        console.log(querySnapshot);
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
