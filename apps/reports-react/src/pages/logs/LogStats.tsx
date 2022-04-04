import * as React from "react";
import type { ProcessedLog } from "../../types";
import { Marker } from "../../graphs/line";
import { Text, Title } from "../../common";
import { getPower } from "../../service/logs/selectors/getPower";
import { getWeight } from "../../service/logs/selectors/getWeight";
import { getPullups } from "../../service/logs/selectors/getPullups";

const useLogStatsData = ({ logs, first }: Props) => {
  console.log("logs", logs);
  return logs.map((log) => {
    return {
      id: log.logId,
      weight: getWeight(log) || "Unknown",
      power: getPower(log, first) || "Unknown",
      pullups: getPullups(log) || "None",
    };
  });
};

// console.log("logs", RawStats);
interface Props {
  logs: ProcessedLog[];
  first: Marker;
}
export const LogStats = (props: Props) => {
  const items = useLogStatsData(props);

  return (
    <div>
      <Title>Stats:</Title>
      {items.length === 0 && <div>This log has not been processed.</div>}
      {items.map((item) => {
        return (
          <span key={item.id}>
            <Text>Processed average weight found: {item.weight}</Text>
            <Text>Power: {item.power} </Text>
            <Text>Pullups: {item.pullups} </Text>
          </span>
        );
      })}
    </div>
  );
};
