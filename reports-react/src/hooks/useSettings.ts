import { useQuery, useMutation, useQueryClient } from "react-query";

import { firestore } from "../db";

const QUERY_SETTINGS_KEY = "settings";
const settingsCollection = "settings";

export interface Settings {
  active: string;
}
export const mutateSettings = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(
    (data: Settings) => {
      return firestore.collection(settingsCollection).doc("state").set(data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QUERY_SETTINGS_KEY);
      },
    }
  );
  return mutation;
};

export const useSettings = () => {
  const { isLoading, error, data } = useQuery<Settings>(
    QUERY_SETTINGS_KEY,
    () =>
      firestore
        .collection(settingsCollection)
        .doc("state")
        .get()
        .then(function (querySnapshot) {
          return querySnapshot.data() as Settings;
        })
        .catch(function (error) {
          console.log("Error getting documents: ", error);
          return { active: "" };
        }),
    {
      cacheTime: Infinity,
      staleTime: Infinity,
    }
  );

  return { isLoading, error, data };
};
