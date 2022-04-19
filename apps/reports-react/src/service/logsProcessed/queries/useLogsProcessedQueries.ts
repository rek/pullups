import { useQuery } from "react-query";

import { ProcessedLog } from "../types";
import { getLogProcessed, getLogsProcessed } from "../service";

const QUERY_KEY = "processedLogs";
const QUERY_KEY_SINGLE = "processedLog";

export const useProcessedLogsForUser = (user: string) => {
  return useQuery<ProcessedLog[], Error>(
    [QUERY_KEY, user],
    () => getLogsProcessed(user),
    {
      cacheTime: Infinity,
      staleTime: Infinity,
    }
  );
};

export const useProcessedLogForUser = (user: string, logId: string) => {
  return useQuery<ProcessedLog[], Error>(
    [QUERY_KEY_SINGLE, user],
    () => getLogProcessed(user, logId),
    {
      enabled: logId !== "",
      // cacheTime: Infinity,
      // staleTime: Infinity,
    }
  );
};
