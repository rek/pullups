import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";

import { firestore } from "../db";
import type { User } from "../types";
// import { generateUserRecord } from "../__tests__/utils";
import { FIREBASE_COLLECTION_USERS } from "./useUsers";

const QUERY_KEY = "user";
const QUERY_KEY_USER_WEIGHT = "weight";

interface Error {
  error: boolean;
}

export const normalizeUser = (id: string, result: User) => {
  return {
    id: result.id,
    name: id,
    active: result.active,
    weight: result.weight,
    weightLastUpdated: result.weightLastUpdated,
  } as User;
};

// get one user
export const useUser = (id: string) => {
  const { isLoading, error, data } = useQuery<User, Error>(
    [QUERY_KEY, id],
    () =>
      firestore
        .collection(FIREBASE_COLLECTION_USERS)
        .doc(id)
        .get()
        .then(function (querySnapshot) {
          const result = querySnapshot.data();
          console.log("Found user data:", result);
          if (result) {
            return normalizeUser(id, result as User);
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

export const mutateUserWeight = (user: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation(
    ({ weight, weightLastUpdated, ...otherUserFields }: Partial<User>) => {
      return firestore
        .collection(FIREBASE_COLLECTION_USERS)
        .doc(user)
        .update({ weight, weightLastUpdated });
    },
    {
      onSuccess: (data, next) => {
        queryClient.setQueryData([QUERY_KEY, user], next);
      },
    }
  );

  return mutation;
};

// interface generatedQueryProps {
//   key: string
//   collection: string
// }
// export const generateFieldQuery = <T>({
//   key,
//   collection,
// }: generatedQueryProps) => {

// return (id: string) => {
//   return useQuery<T, Error>(
//     [QUERY_KEY, id],
//     () =>
//       firestore
//         .collection(collection)
//         .doc(id)
//         .get()
//         .then(function (querySnapshot) {
//           // const result = querySnapshot.data() as T
//           // if (result) {
//           //   return {
//           //     id: result.id,
//           //     name: id,
//           //     active: result.active,
//           //   };
//           // }

//           // return {
//           //   id: -1,
//           //   name: "",
//           //   active: false,
//           // };
//         })
//         .catch(function (error) {
//           console.log("Error getting documents: ", error);
//           // return {
//           //   id: -1,
//           //   name: "",
//           //   active: false,
//           // };
//         }),
//     {
//       cacheTime: Infinity,
//       staleTime: Infinity,
//     }
//   );
// };
// }
