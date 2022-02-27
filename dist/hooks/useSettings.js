import {useQuery, useMutation, useQueryClient} from "../../_snowpack/pkg/react-query.js";
import {firestore} from "../db.js";
const QUERY_SETTINGS_KEY = "settings";
const settingsCollection = "settings";
export const mutateSettings = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation((data) => {
    return firestore.collection(settingsCollection).doc("state").set(data);
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_SETTINGS_KEY);
    }
  });
  return mutation;
};
export const useSettings = () => {
  const {isLoading, error, data} = useQuery(QUERY_SETTINGS_KEY, () => firestore.collection(settingsCollection).doc("state").get().then(function(querySnapshot) {
    return querySnapshot.data();
  }).catch(function(error2) {
    console.log("Error getting documents: ", error2);
    return {active: ""};
  }), {
    cacheTime: Infinity,
    staleTime: Infinity
  });
  return {isLoading, error, data};
};
