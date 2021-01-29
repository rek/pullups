import React from "react";
import {VictoryGroup, VictoryBar} from 'victory';

export interface ChartDataItem {
  x: string | number,
  y: number
}
export type ChartDataItems = ChartDataItem[]

export const GroupGraphDemo: React.FC = () => {
  return (
    <GroupGraph
      data={[
        [{x: "a", y: 2}, {x: "b", y: 3}, {x: "c", y: 5}],
        [{x: "a", y: 1}, {x: "b", y: 4}, {x: "c", y: 5}],
        [{x: "a", y: 3}, {x: "b", y: 2}, {x: "c", y: 6}]
      ]}
    />
  )
}

export interface Props {
  data: ChartDataItems[]
}
export const GroupGraph: React.FC<Props> = ({data}) => {
  if (!data) {
    return <div>Loading...</div>
  }

  return (
    <VictoryGroup
      offset={25}
      colorScale={["tomato", "orange", "gold"]}
    >
      <VictoryBar
        data={data[0]}
      />
      <VictoryBar
        data={data[1]}
      />
      <VictoryBar
        data={data[2]}
      />
    </VictoryGroup>
  )
}