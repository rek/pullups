import React from "react";
import {VictoryChart, VictoryContainer, VictoryLine, VictoryTheme} from 'victory';
import {Loading} from "../common";

export interface ChartDataItem {
  x: number,
  y: number
}
export interface Props {
  data: ChartDataItem[]
}
export const Line: React.FC<Props> = ({data}) => {
  if (!data) {
    return <Loading />
  }

  // interpolation
  //  "basis", "bundle", "cardinal", "catmullRom", "linear", "monotoneX", "monotoneY", "natural", "step", "stepAfter", "stepBefore"

  // console.log('VictoryTheme.material.line', VictoryTheme.material)
  const theme = {
    ...VictoryTheme.grayscale,

    // line: {
    //   ...VictoryTheme.grayscale.line,
    //   style: {
    //     ...VictoryTheme.grayscale.line.style,
    //     data: {
    //       ...VictoryTheme.grayscale.line.style.data,
    //       // fill: "transparent",
    //       // stroke: charcoal,
    //       // strokeWidth: 2
    //     },
    //     labels: {
    //       ...VictoryTheme.grayscale.line.style.labels,
    //       // fill: '#f00'
    //     }
    //   }
    // }
  }

  return (
    <div style={{padding: '20px', backgroundColor: '#777'}}>
      <VictoryChart
        theme={theme}
        height={200}
        width={1000}
        padding={{top: 5, bottom: 0, left: 100, right: 40}}
        containerComponent={
          <VictoryContainer
            responsive={false}
          />
        }
      >
        <VictoryLine
          data={data}
          interpolation="natural"
        />
      </VictoryChart>
    </div>

  )
}