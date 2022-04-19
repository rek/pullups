import { useQuery, useQueryClient } from "react-query";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../../db";

export const QUERY_SETTINGS_KEY = "settings";
export const settingsCollection = "settings";
export const settingsDocument = "state";

export interface Settings {
  active: string;
}

export const useSettingsInvalidate = () => {
  const queryClient = useQueryClient();
  queryClient.invalidateQueries(QUERY_SETTINGS_KEY);
};

export const useSettings = () => {
  const { isLoading, error, data } = useQuery<Settings>(
    QUERY_SETTINGS_KEY,
    async () => {
      const docRef = doc(firestore, settingsCollection, settingsDocument);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return docSnap.data() as Settings;
      } else {
        // doc.data() will be undefined in this case
        console.log("Error getting documents: ", error);
        return { active: "" };
      }
    },
    {
      cacheTime: Infinity,
      staleTime: Infinity,
    }
  );

  return { isLoading, error, data };
};
