import React from "react";
import { useQuery } from "react-query";

import { firestore } from "../db";
import type {User} from "../types";
import {normalizeUser} from "./useUser";

const QUERY_USERS_KEY = "users";

export const FIREBASE_COLLECTION_USERS = "users";

export const useUsers = () => {
  const { isLoading, error, data } = useQuery<User[]>(
    QUERY_USERS_KEY,
    () =>
      firestore
        .collection(FIREBASE_COLLECTION_USERS)
        .where("active", "==", true)
        .get()
        .then(function (querySnapshot) {
          const users: User[] = [];

          querySnapshot.forEach(function (doc) {
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data());
            const info = doc.data();
            users.push(normalizeUser(doc.id, info as User));
          });

          return users;
        })
        .catch(function (error) {
          console.log("Error getting documents: ", error);
          return [];
        }),
    {
      cacheTime: Infinity,
      staleTime: Infinity,
    }
  );

  // console.log('Starting to get users')

  return { isLoading, error, data };
};
