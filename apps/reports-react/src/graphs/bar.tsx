import * as React from "react";
import maxBy from "lodash/maxBy";
import assign from "lodash/assign";
import dayjs from "dayjs";

import {
  VictoryChart,
  VictoryVoronoiContainer,
  VictoryBar,
  VictoryTheme,
  VictoryLabel,
  VictoryTooltip,
  VictoryAxis,
  VictoryLine,
} from "victory";
import { Loading } from "../common";
import type { XY } from "../types";
import { colours } from "../styles/colours";

interface Props {
  data: XY[];
  yLabel?: string;
  tooltip?: (datum: XY) => string[];
}
export const Bar: React.FC<Props> = ({ data, yLabel, tooltip }) => {
  if (!data) {
    return <Loading />;
  }

  const baseProps = {
    width: 350,
    height: 350,
    padding: 50,
  };
  const padding = 8;
  // *
  // * Typography
  // *
  const sansSerif = "'Helvetica Neue', 'Helvetica', sans-serif";
  const letterSpacing = "normal";
  const fontSize = 12;
  const baseLabelStyles = {
    fontFamily: sansSerif,
    fontSize,
    letterSpacing,
    padding,
    fill: colours.blueGrey700,
    stroke: "transparent",
    strokeWidth: 0,
  };
  const theme = {
    ...VictoryTheme.grayscale,
    bar: assign(
      {
        style: {
          data: {
            fill: colours.blueGrey700,
            padding,
            strokeWidth: 0,
          },
          labels: baseLabelStyles,
        },
      },
      baseProps
    ),
    // axis: {
    // style: {
    // grid: {
    // fill: "transparent",
    // stroke: "#333",
    // strokeWidth: 2,
    // strokeDasharray: "10, 5",
    // strokeLinecap: "round",
    // strokeLinejoin: "round",
    // },
    // },
    // },
  };

  const barWidth = 3;
  const style = {
    data: {
      // make the bars differnt for morning and evening.
      // fill: ({ datum }: { datum: XY }) => {
      //   const afterLunch = Number(dayjs(datum.x).format("H")) > 12;
      //   return afterLunch ? colours.redDark : colours.red;
      // },
    },
    labels: {
      fontSize: 10,
      fill: "#000",
    },
  };

  const maxDataItem = maxBy(data, "y") || { x: 1, y: 1 };
  const maxDomain = (maxDataItem.y || 1) * 1.2;
  // console.log("maxDomain", maxDomain);

  const containerStyle = {
    padding: "60px",
    backgroundColor: "#777",
  };

  return (
    <div style={containerStyle}>
      <VictoryChart
        // theme={theme}
        height={200}
        width={500}
        domainPadding={{ x: 5 }}
        padding={{ top: 5, bottom: 50, left: 100, right: 40 }}
        containerComponent={<VictoryVoronoiContainer responsive={false} />}
      >
        <VictoryBar
          data={data}
          style={style}
          // barRatio={0.8}
          // padding={{ left: 20, right: 60 }}
          alignment="start"
          // maxDomain={{ x: undefined, y: maxDomain }}
          maxDomain={maxDomain}
          barWidth={barWidth}
          // labelComponent={<VictoryLabel dy={12} dx={8} />}
          labelComponent={
            <VictoryTooltip flyoutWidth={200} flyoutHeight={50} />
          }
          labels={({ datum }) => (tooltip ? tooltip(datum) : [])}
        />
        <VictoryAxis
          crossAxis
          tickCount={2}
          label=""
          tickFormat={(date) => dayjs(date).format("D/MM/YY")}
          style={{
            tickLabels: {
              fontSize: 12,
            },
            axisLabel: {
              padding: 30,
              border: "1px solid",
              fontSize: 13,
              fontStyle: "italic",
            },
          }}
        />
        <VictoryAxis
          dependentAxis
          label={yLabel}
          tickFormat={(count) => count.toFixed(0)}
          style={{
            tickLabels: {
              fontSize: 13,
            },
            axisLabel: {
              padding: 59,
              fontSize: 13,
              fontStyle: "italic",
            },
          }}
        />
        {/* <VictoryLine
          style={{ data: { stroke: colours.blueGrey300, strokeWidth: 1 } }}
          // y0={() => -10}
          y={() => 50}
        /> */}
      </VictoryChart>
    </div>
  );
};
