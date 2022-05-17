import { useQueryClient } from "react-query";
import { QUERY_PROCESSED_LOGS_KEY } from "../keys";

export const useProcessedLogsInvalidate = (user: string): (() => void) => {
  const queryClient = useQueryClient();

  return () => {
    queryClient.invalidateQueries([QUERY_PROCESSED_LOGS_KEY, user]);
  };
};
