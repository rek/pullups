import { useQuery } from "react-query";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import { firestore } from "../../db";
import type { User } from "../../types";
import { normalizeUser } from "./adapters/normalize";

const QUERY_KEY_USERS = "users";
const QUERY_KEY_USER = "user";

export const FIREBASE_COLLECTION_USERS = "users";

export const getUsersCollection = (pathSegments: string[] = []) => {
  return collection(firestore, FIREBASE_COLLECTION_USERS, ...pathSegments);
};

export const getUsersCollectionDocument = async (name: string, doc: string) => {
  const query = collection(firestore, FIREBASE_COLLECTION_USERS, name, doc);
  const snapshot = await getDocs(query);
  return snapshot;
};

export const getUsersDocRef = (keys: string[]) => {
  return doc(firestore, FIREBASE_COLLECTION_USERS, ...keys);
};
export const getUsersDoc = async (name: string) => {
  const docRef = getUsersDocRef([name]);
  const docSnap = await getDoc(docRef);
  return docSnap;
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
    cacheTime: Infinity,
    staleTime: Infinity,
  });
};

const getUser = async (id: string) => {
  const snap = await getUsersDoc(id);
  if (snap.exists()) {
    const result = snap.data();
    // console.log("Found user data:", result);
    if (result) {
      return normalizeUser(id, result as User);
    }
  }

  // console.log("Error getting documents: ", error);
  return {
    id: -1,
    name: "",
    active: false,
  };
};

export const useUser = (id: string) => {
  return useQuery<User>(QUERY_KEY_USER, () => getUser(id), {
    cacheTime: Infinity,
    staleTime: Infinity,
  });
};