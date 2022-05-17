import { useQuery } from "react-query";
import { doc, getDoc } from "firebase/firestore";

import type { User } from "../types";
import { normalizeUser } from "../adapters/normalize";
import { FIREBASE_COLLECTION_USERS, QUERY_KEY_USER } from "../keys";
import { getDatabase } from "../../../getDatabase";

export const getUsersDocRef = (keys: string[]) => {
  const { firestore } = getDatabase();
  return doc(firestore, FIREBASE_COLLECTION_USERS, ...keys);
};

export const getUsersDoc = async (name: string) => {
  const docRef = getUsersDocRef([name]);
  const docSnap = await getDoc(docRef);
  return docSnap;
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
