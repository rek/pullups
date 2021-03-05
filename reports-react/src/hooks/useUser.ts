import React from "react";
import { useQuery } from "react-query";

import { firestore } from "../db";
import type { User } from "../types";
import { generateUserRecord } from "../__tests__/utils";

const QUERY_KEY = "user";

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

// export const useUser = (id: number) => {
//   const { isLoading, error, data } = useQuery<User, Error>(
//     [QUERY_KEY, id],
//     () =>
//       firestore
//         .collection("users")
//         .where("id", "==", id)
//         .get()
//         .then(function (querySnapshot) {
//           //
//           // @TODO: this should not be returning an array and taking the first item
//           // find a way to just return one result nicely.
//           //

//           const userRecord: { name: string; data: UserRecord } = {
//             name: "",
//             data: generateUserRecord(),
//           };

//           querySnapshot.forEach(function (doc) {
//             // doc.data() is never undefined for query doc snapshots
//             // console.log(doc.id, " => ", doc.data());
//             userRecord.name = doc.id;
//             const data = doc.data() as UserRecord;
//           });

//           return userRecord;
//         })
//         .catch(function (error) {
//           console.log("Error getting documents: ", error);
//           return {
//             error: true,
//           };
//         })
//   );

//   // console.log('Starting to get user', {id})

//   return { isLoading, error, data };
// };
