import React from "react";
import { View } from "react-native";
import { BarChart as BarChartComponent, Grid } from "react-native-svg-charts";
import { Text } from "react-native-svg";

const CUT_OFF = 20;
interface LabelsProps {
  x: (x: number) => number;
  y: (y: number) => number;
  bandwidth: number;
  data: number[];
}
const Labels = ({ x, y, bandwidth, data }: LabelsProps) => (
  <>
    {data.map((value, index) => (
      <Text
        key={index}
        x={x(index) + bandwidth / 2}
        y={value < CUT_OFF ? y(value) - 10 : y(value) + 15}
        fontSize={14}
        fill={value >= CUT_OFF ? "white" : "black"}
        alignmentBaseline={"middle"}
        textAnchor={"middle"}
      >
        {value}
      </Text>
    ))}{" "}
  </>
);

export const BarChart: React.FC<{ data: number[] }> = ({ data }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        height: 200,
        paddingVertical: 16,
        width: 500,
      }}
    >
      <BarChartComponent
        style={{ flex: 1 }}
        data={data}
        svg={{ fill: "rgba(134, 65, 244, 0.8)" }}
        contentInset={{ top: 10, bottom: 10 }}
        gridMin={0}
      >
        <Grid direction={Grid.Direction.HORIZONTAL} />
        {/* @ts-expect-error gahs */}
        <Labels />
      </BarChartComponent>
    </View>
  );
};
