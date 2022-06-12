import { useMutation } from "react-query";
import { Settings } from "../queries/useSettingsQuery";
import { getDatabase } from "../../../auth/getDatabase";
import { useSettingsInvalidate } from "./useSettingsInvalidate";
import { doSettingsMutate } from "./doSettingsMutate";

export const useSettingsMutate = () => {
  const { firestore } = getDatabase();

  return useMutation(
    (data: Settings) => {
      return doSettingsMutate(firestore, data);
    },
    {
      onSuccess: () => {
        // useSettingsInvalidate();
      },
    }
  );
};
