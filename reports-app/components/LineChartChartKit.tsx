import React from "react";
import { Dimensions } from "react-native";
import { LineChart as LineChartRaw } from "react-native-chart-kit";
import { ChartData } from "../hooks/types";
import { getShortDate } from "../utils/date";
import { View } from "./Themed";

export const LineChart: React.FC<{ data: ChartData }> = ({ data }) => {
  // console.log("data", data);

  if (!data || data.length === 0) {
    return null;
  }

  // console.log("Total data:", data.length);

  const height = 250;
  // const screenWidth = 1000;
  const screenWidth = Dimensions.get("window").width;

  const labelInterval = Number((data.length / 10).toFixed(0));
  // console.log("labelInterval", labelInterval);

  let initialData: ChartData = [];
  const labels = data
    .reduce((result, item, index) => {
      if (index % labelInterval === 0) {
        return result;
      }

      return [...result, item];
    }, initialData)
    .map((item) => getShortDate(item.x));

  return (
    <View
      // make a dynamic sized view:
      style={{
        flexDirection: "row",
        height: height,
        width: screenWidth,
      }}
    >
      <LineChartRaw
        data={{
          labels,
          datasets: [
            {
              data: data.map((item) => item.y),
            },
          ],
        }}
        width={screenWidth}
        height={height}
        // fromZero={true}
        // verticalLabelRotation={0}
        // horizontalLabelRotation={0}
        xLabelsOffset={-10}
        // yLabelsOffset={0}
        segments={5}
        yAxisLabel=""
        yAxisSuffix="kg"
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: "#333",
          backgroundGradientFrom: "#333",
          backgroundGradientTo: "#333",
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726",
          },
        }}
        bezier
        style={
          {
            // marginVertical: 8,
            // borderRadius: 16,
          }
        }
      />
    </View>
  );
};
