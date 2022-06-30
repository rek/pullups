import { useQuery } from "react-query";
import { collection, getDocs, query, where } from "firebase/firestore";

import { getDatabase } from "../../../auth/getDatabase";
import type { User } from "../types";
import { normalizeUser } from "../adapters/normalize";
import { FIREBASE_COLLECTION_USERS, QUERY_KEY_USERS } from "../keys";

export const getUsersCollectionDocument = async (name: string, doc: string) => {
  const { firestore } = getDatabase();
  const query = collection(firestore, FIREBASE_COLLECTION_USERS, name, doc);
  const snapshot = await getDocs(query);
  return snapshot;
};

export const getUsersCollection = (pathSegments: string[] = []) => {
  const { firestore } = getDatabase();
  return collection(firestore, FIREBASE_COLLECTION_USERS, ...pathSegments);
};
const getUsers = async () => {
  const ref = getUsersCollection();
  const usersQuery = query(ref, where("active", "==", true));
  const querySnapshot = await getDocs(usersQuery);
  const users: User[] = [];

  querySnapshot.forEach(function (doc) {
    const info = doc.data();
    users.push(normalizeUser(doc.id, info as User));
  });

  return users;
};

export const useUsers = () => {
  return useQuery<User[]>(QUERY_KEY_USERS, getUsers, {
    // cacheTime: Infinity,
    // staleTime: Infinity,
  });
};
