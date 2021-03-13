import React from "react";
import maxBy from "lodash/maxBy";

import {
  VictoryChart,
  VictoryVoronoiContainer,
  VictoryBar,
  VictoryTheme,
  VictoryLabel,
} from "victory";
import { Loading } from "../common";
import type { XY } from "../types";

interface Props {
  data: XY[];
}
export const Bar: React.FC<Props> = ({ data }) => {
  if (!data) {
    return <Loading />;
  }
  const theme = {
    ...VictoryTheme.grayscale,
  };

  const barWidth = 16;
  const style = {
    data: { fill: "#c43a31" },
    labels: {
      fontSize: 10,
      // fill: ({ datum }) => (datum.x === 3 ? "#000000" : "#c43a31"),
      fill: "#000",
    },
  };

  const maxDomain = (maxBy(data, "x") || 1) * 1.2;

  return (
    <div style={{ padding: "20px", backgroundColor: "#777" }}>
      <VictoryChart
        theme={theme}
        height={200}
        padding={{ top: 5, bottom: 0, left: 100, right: 40 }}
        containerComponent={<VictoryVoronoiContainer responsive={false} />}
      >
        <VictoryBar
          data={data}
          style={style}
          alignment="start"
          maxDomain={maxDomain}
          barWidth={barWidth}
          labelComponent={<VictoryLabel dy={12} dx={8} />}
          labels={({ datum }) => datum.y.toFixed(0)}
        />
      </VictoryChart>
    </div>
  );
};
