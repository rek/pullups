import compact from "lodash/compact";
import sortBy from "lodash/sortBy";

import { ProcessedLogs } from "./queries/useProcessedLogsForUser";

export const usePreparedLogsForCharts = ({
  logs,
}: {
  logs?: ProcessedLogs[];
}) => {
  // this represents bad data
  const WEIGHT_LIMIT = 40;

  const chartData = compact(
    logs?.map((log) => {
      if (!log.created && !log.processed) {
        return false;
      }

      if (!log.weight) {
        return false;
      }

      if (log.weight < WEIGHT_LIMIT) {
        return false;
      }

      return { y: log.weight, x: log.created || log.processed };
    })
  );

  const sortedData = sortBy(chartData, ["x"]);

  return sortedData;
};
