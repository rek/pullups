import React from "react";

import {
  VictoryChart,
  VictoryVoronoiContainer,
  VictoryLine,
  VictoryTheme,
  VictoryTooltip,
} from "victory";
import { Loading } from "../common";

export interface ChartDataItem {
  x: number;
  y: number;
}
export interface Props {
  data: ChartDataItem[];
  medianLine?: number;
  maxDomain?: number;
}
export const Line: React.FC<Props> = ({ data, medianLine, maxDomain }) => {
  if (!data) {
    return <Loading />;
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
  };

  // console.log('data', data)
  // console.log('medianLine', medianLine)

  const start = 1;
  const end = data.length;

  return (
    <div style={{ padding: "20px", backgroundColor: "#777" }}>
      <VictoryChart
        theme={theme}
        height={200}
        width={1000}
        padding={{ top: 5, bottom: 0, left: 100, right: 40 }}
        containerComponent={<VictoryVoronoiContainer responsive={false} />}
      >
        <VictoryLine
          data={data}
          interpolation="natural"
          domain={{ y: [0, maxDomain || 1] }}
          labels={({ datum }) => datum.y}
          labelComponent={<VictoryTooltip />}
        />
        {medianLine && (
          <VictoryLine
            style={{
              data: { stroke: "#c43a31" },
              parent: { border: "1px dotted #ccc" },
            }}
            data={[
              { x: start, y: medianLine },
              { x: end, y: medianLine },
            ]}
          />
        )}
      </VictoryChart>
    </div>
  );
};
