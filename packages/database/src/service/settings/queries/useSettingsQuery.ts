import { useQuery } from "react-query";

import { doc, getDoc } from "firebase/firestore";
import { getDatabase } from "../../../auth/getDatabase";
import {
  QUERY_SETTINGS_KEY,
  settingsCollection,
  settingsDocument,
} from "../keys";

export interface Settings {
  active: string;
}

export const useSettingsQuery = () => {
  const { firestore } = getDatabase();

  return useQuery<Settings>(QUERY_SETTINGS_KEY, async () => {
    const docRef = doc(firestore, settingsCollection, settingsDocument);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data() as Settings;
    } else {
      // doc.data() will be undefined in this case
      // console.log("Error getting documents: ", error);
      return { active: "" };
    }
  });
};
