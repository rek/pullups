import React from "react";
import { View } from "react-native";
import {
  LineChart as LineChartComponent,
  Grid,
  YAxis,
} from "react-native-svg-charts";
import { Circle, G, Line, Rect, Text } from "react-native-svg";

export const LineChart: React.FC<{ data: number[] }> = ({ data }) => {
  // console.log("data", data);

  if (!data || data.length === 0) {
    return null;
  }

  const contentInset = { top: 20, bottom: 20 };

  const Tooltip = getTooltip(data);

  return (
    <View
      style={{
        flexDirection: "row",
        height: 200,
        width: 350,
      }}
    >
      <YAxis
        data={data}
        contentInset={contentInset}
        svg={{
          fill: "grey",
          fontSize: 10,
        }}
        numberOfTicks={5}
        formatLabel={(value) => `${value}kg`}
      />
      <LineChartComponent
        style={{ flex: 1, marginLeft: 10, ...contentInset }}
        data={data}
        svg={{ stroke: "rgb(134, 65, 244)" }}
        yMin={55}
        contentInset={{ ...contentInset }}
      >
        <Grid />
        <Tooltip />
      </LineChartComponent>
    </View>
  );
};

const getTooltip = (data: number[]) => ({ x, y }) => {
  console.log("x, y", x, y);
  return (
    <G
      x={x(5) - 75 / 2}
      key={"tooltip"}
      onPress={() => console.log("tooltip clicked")}
    >
      <G y={50}>
        <Rect
          height={40}
          width={75}
          stroke={"grey"}
          fill={"white"}
          ry={10}
          rx={10}
        />
        <Text
          x={75 / 2}
          dy={20}
          alignmentBaseline={"middle"}
          textAnchor={"middle"}
          stroke={"rgb(134, 65, 244)"}
        >
          {`${data[5]}ºC`}
        </Text>
      </G>
      <G x={75 / 2}>
        <Line y1={50 + 40} y2={y(data[5])} stroke={"grey"} strokeWidth={2} />
        <Circle
          cy={y(data[5])}
          r={6}
          stroke={"rgb(134, 65, 244)"}
          strokeWidth={2}
          fill={"white"}
        />
      </G>
    </G>
  );
};
