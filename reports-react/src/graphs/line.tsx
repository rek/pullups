import React from "react";
import {VictoryChart, VictoryLine} from 'victory';

export interface ChartDataItem {
  x: number,
  y: number
}
export interface Props {
  data: ChartDataItem[]
}
export const Line: React.FC<Props> = ({data}) => {
  if (!data) {
    return <div>Loading...</div>
  }

  return (
    <VictoryChart>
      <VictoryLine
        data={data}
      />
    </VictoryChart>
  )
}