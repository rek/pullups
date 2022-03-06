import React from "react";
import { useQuery } from "react-query";

import { firestore } from "../db";

const QUERY_KEY = "user";

interface User {}
interface Error {
  error: boolean;
}

export const useUser = (id: string) => {
  const { isLoading, error, data } = useQuery<User, Error>(
    [QUERY_KEY, id],
    () =>
      firestore
        .collection("users")
        .doc(id)
        .get()
        .then(function (querySnapshot) {
          const result = querySnapshot.data();
          if (result) {
            return {
              id: result.id,
              name: id,
              active: result.active,
            };
          }

          return {
            id: -1,
            name: "",
            active: false,
          };
        })
        .catch(function (error) {
          console.log("Error getting documents: ", error);
          return {
            id: -1,
            name: "",
            active: false,
          };
        }),
    {
      cacheTime: Infinity,
      staleTime: Infinity,
    }
  );

  // console.log('Starting to get user', {id})

  return { isLoading, error, data };
};
