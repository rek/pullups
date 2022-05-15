import { doc, Firestore, setDoc } from "firebase/firestore";
import { Settings } from "../queries/useSettingsQuery";
import { settingsCollection, settingsDocument } from "../keys";

export const doSettingsMutate = (firestore: any, data: Settings) => {
  const settingsRef = doc(firestore, settingsCollection, settingsDocument);

  return setDoc(settingsRef, data);
};
