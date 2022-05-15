import { useQueryClient } from "react-query";
import { QUERY_SETTINGS_KEY } from "../keys";

export const useSettingsInvalidate = () => {
  const queryClient = useQueryClient();
  queryClient.invalidateQueries(QUERY_SETTINGS_KEY);
};

export const useSettingsInvalidateCallback = () => {
  const queryClient = useQueryClient();
  return () => queryClient.invalidateQueries(QUERY_SETTINGS_KEY);
};
