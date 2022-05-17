import { useQueryClient } from "react-query";
import { QUERY_KEY_USERS } from "../keys";

export const useUsersInvalidate = () => {
  const queryClient = useQueryClient();
  return () => queryClient.invalidateQueries(QUERY_KEY_USERS);
};
