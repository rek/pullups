import React from "react";
import { View } from "react-native";
import {
  LineChart as LineChartComponent,
  Grid,
  YAxis,
} from "react-native-svg-charts";

export const LineChart: React.FC<{ data: number[] }> = ({ data }) => {
  // console.log("data", data);

  if (!data || data.length === 0) {
    return null;
  }

  const contentInset = { top: 20, bottom: 20 };

  return (
    <View
      style={{
        flexDirection: "row",
        height: 250,
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
        style={{ flex: 1, marginLeft: 10 }}
        data={data}
        svg={{ stroke: "rgb(134, 65, 244)" }}
        yMin={55}
        contentInset={{ ...contentInset }}
      >
        <Grid />
      </LineChartComponent>
    </View>
  );
};
