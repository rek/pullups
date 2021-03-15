import React from "react";
import max from "lodash/max";
// import { useRecoilValue } from "recoil";

import type { Log, ProcessedLog, UserLog } from "../types";
import { Line, Marker } from "../graphs/line";
import { Loading, Text, Title } from "../common";
import { useProcessedLog } from "../hooks";
import { useClosestKnownWeight } from "../hooks/useClosestKnownWeight";

// export const UserChartForActiveUser = () => {
// 	const activeSession = useRecoilValue(sessionState);
// 	return <UserChart sessionId={activeSession} user='adam' />
// }

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
  // console.log("Processed data from db:", processedLogData);

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

  if (medianLine === -1 && logId) {
    medianLine = useClosestKnownWeight({ user, logId });
  }

  const extraMarkers = extras || [];

  return (
    <>
      <Line
        data={formattedData}
        medianLine={medianLine}
        maxDomain={maxDomain}
        markers={extraMarkers}
      />
      {processedLogData && <LogStats logs={processedLogData} />}
      {<RawStats log={data} />}
    </>
  );
};

const RawStats: React.FC<{ log: UserLog }> = ({ log }) => {
  // console.log('log', log)

  const Duration: React.FC<{ value?: number, total: number }> = ({ value, total }) => {
    if (!value) {
      return null
    }

    const calculatedDuration = value / total

    return (
        <>
          <div>Duration: {value / 1000} s</div>
          <div>Calculated interval: {calculatedDuration.toFixed(2)}</div>
        </>
    )
  }

  const hasStats = log.duration !== undefined

  if (!hasStats) {
    return null
  }

  return (
    <>
    <Title>Raw stats:</Title>
    <Duration value={log.duration} total={log.data.length} />
    </>
  )
}

  // console.log("logs", RawStats);
const LogStats: React.FC<{ logs: ProcessedLog[] }> = ({ logs }) => {
  // console.log("logs", logs);
  return (
    <div>
      <Title>Stats:</Title>
      <div>{logs.length === 0 && "This log has not been processed."}</div>
      {logs.map((log) => {
        return (
          <Text key={log.logId}>Processed average weight found: {log.weight.toFixed(2)} </Text>
        );
      })}
    </div>
  );
};
