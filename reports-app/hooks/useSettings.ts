import { useQuery, useMutation, useQueryClient } from "react-query";
import { IDToken } from "../components/types";

import { FirebaseClient } from "../database/useFirebase";

export const QUERY_SETTINGS_KEY = "settings";
const settingsCollection = "settings";
export interface SettingsRaw {
  name: string;
  fields: {
    active?: {
      stringValue: string;
    };
  };
}
export interface Settings {
  active: string;
}
export const mutateSettings = ({ idToken }: IDToken) => {
  const queryClient = useQueryClient();

  const mutation = useMutation(
    async (data: string) => {
      const value = {
        fields: {
          active: {
            stringValue: data,
          },
        },
      };
      const settings = await FirebaseClient.writeData({
        idToken,
        key: `${settingsCollection}/state`,
        value,
      });

      return settings;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QUERY_SETTINGS_KEY);
      },
    }
  );
  return mutation;
};

export const useResetSettings = (): (() => void) => {
  const queryClient = useQueryClient();

  return () => {
    queryClient.invalidateQueries(QUERY_SETTINGS_KEY);
  };
};

export const useSettings = ({ idToken }: IDToken) => {
  const { isLoading, error, data } = useQuery<Settings>(
    QUERY_SETTINGS_KEY,
    async () => {
      if (!idToken) {
        return { active: "" };
      }
      const settings: SettingsRaw[] = await FirebaseClient.getSettings({
        idToken,
      });

      // console.log("All settings:", settings);

      const stats = settings.find((setting) =>
        setting.name.includes("settings/state")
      );

      return {
        active: stats?.fields.active?.stringValue || "",
      };
    }
  );

  return { isLoading, error, data };
};
