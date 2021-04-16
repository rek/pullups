import React from "react";
import max from "lodash/max";
// import { useRecoilValue } from "recoil";

import type { Log, ProcessedLog, UserLog } from "../types";
import { Line, Marker } from "../graphs/line";
import { Loading, Text, Title } from "../common";
import { getMarkersFromProcessedData, useProcessedLog } from "../hooks";
import { useClosestKnownWeight } from "../hooks/useClosestKnownWeight";
import { RawStats } from "./common/RawStats";

// export const UserChartForActiveUser = () => {
// 	const activeSession = useRecoilValue(sessionState);
// 	return <UserChart sessionId={activeSession} user='adam' />
// }

const namespace = "[UserLogChart]";

interface Props {
  // sessionId: number,
  domainTop?: number;
  user: string;
  logId?: string;
  data: UserLog;
  extras?: Marker[];
}
export const UserLogChart: React.FC<Props> = ({
  data,
  user,
  logId,
  extras,
}) => {
  // const data = useData({user})
  const [formattedData, setFormattedData] = React.useState<
    { x: number; y: number }[]
  >([]);
  const [maxDomain, setMaxDomain] = React.useState<number>(1);

  const { data: processedLogData } = useProcessedLog(user, logId || "");

  // console.log("UserChart data from db:", data);
  // const hasProcessedLogData = processedLogData && processedLogData.length > 0;
  // console.log("Processed data from db:", processedLogData);
  // console.log("Extra makers to show:", extras);

  const convertDataIntoLine = (log: Log) => {
    const result = log.data.map((value, index) => {
      return { x: index, y: value };
    });
    // console.log(result, 'result')

    setFormattedData(result);
  };

  React.useEffect(() => {
    if (data) {
      // console.log('loading new data', count)
      convertDataIntoLine(data);
      const possibleMax = max(data.data);
      if (possibleMax) {
        // set the top domain just above the max data point
        setMaxDomain(possibleMax * 1.1);
      }
    }
  }, [data]);

  if (!data) {
    return <Loading />;
  }

  let medianLine =
    processedLogData && processedLogData.length > 0
      ? processedLogData[0].weight
      : -1;
  // console.log(`${namespace} checking median:`, medianLine);

  if (medianLine === -1 && logId) {
    medianLine = useClosestKnownWeight({ user, logId });
    // console.log(`${namespace} no median, using last known:`, medianLine);
  }

  let markersToShow = extras || []; // default to the global markers
  let processedMarkers: any[] = [];

  if (processedLogData && processedLogData.length > 0) {
    processedMarkers = processedLogData.flatMap((pullup) =>
      getMarkersFromProcessedData(pullup.report)
    );
    // console.log("processedMarkers", processedMarkers);
  }

  if (processedMarkers && processedMarkers.length > 0) {
    markersToShow = processedMarkers;
  }

  // console.log("Data for line:", formattedData);
  console.log("Processed log for line:", processedLogData);

  return (
    <>
      <Line
        data={formattedData}
        medianLine={medianLine}
        maxDomain={maxDomain}
        markers={markersToShow}
      />
      {processedLogData && <LogStats logs={processedLogData} />}
      {<RawStats log={data} />}
    </>
  );
};

// console.log("logs", RawStats);
const LogStats: React.FC<{ logs: ProcessedLog[] }> = ({ logs }) => {
  // console.log("logs", logs);
  return (
    <div>
      <Title>Stats:</Title>
      <div>{logs.length === 0 && "This log has not been processed."}</div>
      {logs.map((log) => {
        return (
          <Text key={log.logId}>
            Processed average weight found: {log.weight.toFixed(2)}{" "}
          </Text>
        );
      })}
    </div>
  );
};
