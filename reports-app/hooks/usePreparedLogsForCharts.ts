import compact from "lodash/compact";
import sortBy from "lodash/sortBy";

import { ProcessedLogs } from "./queries/useProcessedLogsForUser";

const debug = false;

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
        debug &&
          console.log(
            "Removed bad log:",
            log,
            "[reason: no created/processed]"
          );
        return false;
      }

      if (!log.weight) {
        debug && console.log("Removed bad log:", log, "[reason: no weight]");
        return false;
      }

      if (log.weight < WEIGHT_LIMIT) {
        debug &&
          console.log("Removed bad log:", log, "[reason: weight too low]");
        return false;
      }

      return { y: log.weight, x: log.created || log.processed };
    })
  );

  const sortedData = sortBy(chartData, ["x"]);

  return sortedData;
};
