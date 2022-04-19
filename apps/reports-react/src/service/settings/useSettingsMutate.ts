import { useMutation } from "react-query";
import { collection, doc, setDoc } from "firebase/firestore";
import { firestore } from "../../db";
import {
  Settings,
  settingsCollection,
  settingsDocument,
  useSettingsInvalidate,
} from "./useSettingsQuery";

export const mutateSettings = () => {
  const mutation = useMutation(
    (data: Settings) => {
      const settingsRef = doc(firestore, settingsCollection, settingsDocument);

      return setDoc(settingsRef, data);
    },
    {
      onSuccess: () => {
        useSettingsInvalidate();
      },
    }
  );
  return mutation;
};
