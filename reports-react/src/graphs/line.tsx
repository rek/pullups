import React from "react";
import {VictoryChart, VictoryLine, VictoryTheme} from 'victory';

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

  // interpolation
  //  "basis", "bundle", "cardinal", "catmullRom", "linear", "monotoneX", "monotoneY", "natural", "step", "stepAfter", "stepBefore"
  return (
    <VictoryChart
      theme={VictoryTheme.material}
      domainPadding={20}
    >
      <VictoryLine
        data={data}
        interpolation="natural"
      />
    </VictoryChart>
  )
}