import {useQuery} from "../../_snowpack/pkg/react-query.js";
import {firestore} from "../db.js";
import {normalizeUser} from "./useUser.js";
const QUERY_USERS_KEY = "users";
export const FIREBASE_COLLECTION_USERS = "users";
export const useUsers = () => {
  const {isLoading, error, data} = useQuery(QUERY_USERS_KEY, () => firestore.collection(FIREBASE_COLLECTION_USERS).where("active", "==", true).get().then(function(querySnapshot) {
    const users = [];
    querySnapshot.forEach(function(doc) {
      const info = doc.data();
      users.push(normalizeUser(doc.id, info));
    });
    return users;
  }).catch(function(error2) {
    console.log("Error getting documents: ", error2);
    return [];
  }), {
    cacheTime: Infinity,
    staleTime: Infinity
  });
  return {isLoading, error, data};
};
