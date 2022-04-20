import { useQuery, useQueryClient } from "react-query";

// import { FirebaseClient } from "../../database/useFirebase";

const QUERY_PROCESSED_LOGS_KEY = "processed_logs";

export interface ProcessedLogs {
  processed: number;
  created: number;
  weight: number;
}

interface ProcessedLogsRaw {
  name: string;
  fields?: {
    weight?: {
      doubleValue: string;
    };
    created?: {
      integerValue: string;
    };
    processed?: {
      integerValue: string;
    };
  };
}
export const useProcessedLogsForUser = ({
  idToken,
  user,
}: {
  idToken?: string;
  user: string;
}) => {
  const { isLoading, error, data } = useQuery<ProcessedLogs[]>(
    [QUERY_PROCESSED_LOGS_KEY, user],
    async () => {
      if (!idToken) {
        return [];
      }
      // const logs = await FirebaseClient.getProcessedLogs({ idToken, user });

      const logs: any = [];

      const processedLogs: ProcessedLogs[] = logs.map(
        (logs: ProcessedLogsRaw) => {
          // console.log("logs", logs);

          return {
            weight: Number(Number(logs.fields?.weight?.doubleValue).toFixed(2)),
            created: Number(logs.fields?.created?.integerValue),
            processed: Number(logs.fields?.processed?.integerValue),
          };
        }
      );

      // console.log("Returning logs:", { user, logs: processedLogs });
      return processedLogs;
    }
  );

  return { isLoading, error, data };
};

export const useResetProcessedLogs = (user: string): (() => void) => {
  const queryClient = useQueryClient();

  return () => {
    queryClient.invalidateQueries([QUERY_PROCESSED_LOGS_KEY, user]);
  };
};
