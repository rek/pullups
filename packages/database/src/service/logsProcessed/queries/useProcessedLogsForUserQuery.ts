// import { collection } from "firebase/firestore";
import { useQuery } from "react-query";

// import { getDatabase } from "../../../getDatabase";
import { getUsersCollectionDocument } from "../../users";
import { processedLogsCollection, QUERY_PROCESSED_LOGS_KEY } from "../keys";

export interface ProcessedLogs {
  processed: number;
  created: number;
  weight: number;
}
// format: 1
// logId: "lXY6oYQbEeTsgFtVbuum"
// processed: 1649308364830
// report: {items: Array(3), pullupCount: 3}
// weight: 94.212746

export const getProcessedLogsCollection = (name: string) => {
  return getUsersCollectionDocument(name, processedLogsCollection);
};

export const useProcessedLogsForUserQuery = ({ user }: { user: string }) => {
  return useQuery<ProcessedLogs[]>(
    [QUERY_PROCESSED_LOGS_KEY, user],
    async () => {
      const querySnapshot = await getProcessedLogsCollection(user);

      const processedLogs: ProcessedLogs[] = [];
      querySnapshot.forEach(function (doc) {
        const log = doc.data();
        processedLogs.push(log as ProcessedLogs);
      });

      // console.log("Returning logs:", { user, logs: processedLogs });
      return processedLogs;
    }
  );
};
