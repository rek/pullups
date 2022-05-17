import { useQueryClient } from "react-query";
import { QUERY_LOGS_KEY } from "../keys";

export const useLogsInvalidate = (user: string): (() => void) => {
  const queryClient = useQueryClient();

  return () => {
    queryClient.invalidateQueries([QUERY_LOGS_KEY, user]);
  };
};
