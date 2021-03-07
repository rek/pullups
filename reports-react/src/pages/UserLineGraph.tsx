import React from "react";
import max from "lodash/max";
import { useRecoilValue } from "recoil";

import type { Log, UserLog } from "../types";
import { Line } from "../graphs/line";
import { useData } from "../hooks/useData";
import { sessionState } from "../modules/session";
import { Loading } from "../common";

// export const UserChartForActiveUser = () => {
// 	const activeSession = useRecoilValue(sessionState);
// 	return <UserChart sessionId={activeSession} user='adam' />
// }

interface Props {
  // sessionId: number,
  domainTop?: number;
  user: string;
  data: UserLog;
}
export const UserChart: React.FC<Props> = ({ data, user }) => {
  // const data = useData({user})
  const [formattedData, setFormattedData] = React.useState<
    { x: number; y: number }[]
  >([]);
  const [maxDomain, setMaxDomain] = React.useState<number>(1);

  // console.log("UserChart data from db:", data);

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

  let medianLine: number | undefined = data.weight;

  const groupLines = data.groups || [];

  // defaults if weight is not logged
  // @TODO -
  // 1. (ok) calculate average weight,
  // 2. (better) find closest logged weight to this date
  if (!medianLine && user === "adam") {
    medianLine = 97; // make dynamic
  }
  if (!medianLine && user === "anette") {
    medianLine = 67; // make dynamic
  }
  if (!medianLine && user === "j") {
    medianLine = 61; // make dynamic
  }

  return (
    <>
      <Line
        data={formattedData}
        medianLine={medianLine}
        maxDomain={maxDomain}
        markers={groupLines}
      />
      <div>Stats:</div>
    </>
  );
};
