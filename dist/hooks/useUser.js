import {useMutation, useQuery, useQueryClient} from "../../_snowpack/pkg/react-query.js";
import {firestore} from "../db.js";
import {FIREBASE_COLLECTION_USERS} from "./useUsers.js";
const QUERY_KEY = "user";
const QUERY_KEY_USER_WEIGHT = "weight";
export const normalizeUser = (id, result) => {
  return {
    id: result.id,
    name: id,
    displayName: result.displayName,
    active: result.active,
    weight: result.weight,
    weightLastUpdated: result.weightLastUpdated
  };
};
export const useUser = (id) => {
  const {isLoading, error, data} = useQuery([QUERY_KEY, id], () => firestore.collection(FIREBASE_COLLECTION_USERS).doc(id).get().then(function(querySnapshot) {
    const result = querySnapshot.data();
    console.log("Found user data:", result);
    if (result) {
      return normalizeUser(id, result);
    }
    return {
      id: -1,
      name: "",
      active: false
    };
  }).catch(function(error2) {
    console.log("Error getting documents: ", error2);
    return {
      id: -1,
      name: "",
      active: false
    };
  }), {
    cacheTime: Infinity,
    staleTime: Infinity
  });
  return {isLoading, error, data};
};
export const mutateUserWeight = (user) => {
  const queryClient = useQueryClient();
  const mutation = useMutation(({weight, weightLastUpdated, ...otherUserFields}) => {
    return firestore.collection(FIREBASE_COLLECTION_USERS).doc(user).update({weight, weightLastUpdated});
  }, {
    onSuccess: (data, next) => {
      queryClient.setQueryData([QUERY_KEY, user], next);
    }
  });
  return mutation;
};
