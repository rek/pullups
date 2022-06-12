import React from "react";
import { VictoryBar, VictoryGroup } from "victory";

export interface ChartDataItem {
  x: string | number;
  y: number;
}
export type ChartDataItems = ChartDataItem[];

export const GroupGraphDemo: React.FC = () => {
  return (
    <GroupGraph
      data={[
        [
          { x: "a", y: 2 },
          { x: "b", y: 3 },
          { x: "c", y: 5 },
        ],
        [
          { x: "a", y: 1 },
          { x: "b", y: 4 },
          { x: "c", y: 5 },
        ],
        [
          { x: "a", y: 3 },
          { x: "b", y: 2 },
          { x: "c", y: 6 },
        ],
      ]}
    />
  );
};

export interface GraphDataItem {
  x: string;
  y: number;
}
export type GraphData = GraphDataItem[];
export const GroupGraphUser: React.FC<{ data: GraphData[] }> = ({ data }) => {
  return <GroupGraph data={data} />;
};

export interface Props {
  data: ChartDataItems[];
}
export const GroupGraph: React.FC<Props> = ({ data }) => {
  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <VictoryGroup offset={25} colorScale={["tomato", "orange", "gold"]}>
      {data.map((item) => (
        <VictoryBar data={item} />
      ))}
    </VictoryGroup>
  );
};
