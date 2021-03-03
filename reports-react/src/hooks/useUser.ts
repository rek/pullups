import React from "react";
import { useQuery } from "react-query";

import { firestore } from "../db";
import type { UserRecord } from "../types";
import { generateUserRecord } from "../__tests__/utils";

const QUERY_KEY = "user";

export const useUser = (id: number) => {
  const { isLoading, error, data } = useQuery([QUERY_KEY, id], () =>
    firestore
      .collection("users")
      .where("id", "==", id)
      .get()
      .then(function (querySnapshot) {
        //
        // @TODO: this should not be returning an array and taking the first item
        // find a way to just return one result nicely.
        //

        const userRecord: { name: string; data: UserRecord } = {
          name: "",
          data: generateUserRecord(),
        };

        querySnapshot.forEach(function (doc) {
          // doc.data() is never undefined for query doc snapshots
          // console.log(doc.id, " => ", doc.data());
          userRecord.name = doc.id;
          userRecord.data = doc.data() as UserRecord;
        });

        return userRecord;
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      })
  );

  // console.log('Starting to get user', {id})

  return { isLoading, error, data };
};
