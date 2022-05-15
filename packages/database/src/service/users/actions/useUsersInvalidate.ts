import { useQueryClient } from "react-query";
import { QUERY_KEY_USERS } from "../keys";

export const useUsersInvalidate = () => {
  const queryClient = useQueryClient();
  queryClient.invalidateQueries(QUERY_KEY_USERS);
};
