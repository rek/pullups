import { useQuery, useQueryClient } from "react-query";
import { getUsersCollectionDocument } from "../../users";
import { normalize } from "../adapters/normalize";
import { DBLog, Log } from "../types";

export const QUERY_KEY_LOGS = "logs";
export const FIREBASE_KEY_LOG = "logs";

const getLogs = async (user: string) => {
  const snapshot = await getUsersCollectionDocument(user, FIREBASE_KEY_LOG);
  const logs: Log[] = [];
  snapshot.forEach(function (doc) {
    const data = doc.data() as DBLog;
    // console.log("Log Document data:", data);
    logs.push(normalize(data, { id: doc.id, user }));
  });
  return logs;
};

interface Props {
  user: string;
}
export const useLogQuery = ({ user }: Props) => {
  return useQuery<Log[]>(QUERY_KEY_LOGS, () => getLogs(user));
};
