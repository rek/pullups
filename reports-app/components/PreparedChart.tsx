import * as React from "react";
import { StyleSheet } from "react-native";

// import { BarChart } from "../components/BarChart";
// import { LineChart } from "../components/LineChart";
// import { LineChartResponsive } from "../components/LineChartResponsive";
import { LineChart } from "./LineChartChartKit";

import { Text, View } from "./Themed";
import { Loading } from "./Loading";
import { ChartDataItem } from "../hooks/types";

interface Props {
  title: string;
  data: ChartDataItem[];
}
export const PreparedChart: React.FC<Props> = ({ title, data }) => {
  const Chart = LineChart;
  // const Chart = mode === "bar" ? BarChart : LineChart;

  return (
    <>
      <Text style={styles.title}>{title}</Text>

      {data ? <Chart data={data} /> : <Loading />}
    </>
  );
};

const SeparatorLine = () => (
  <View
    style={styles.separator}
    lightColor="#eee"
    darkColor="rgba(255,255,255,0.1)"
  />
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 7,
  },
  title: {
    fontSize: 14,
    // fontWeight: "bold",
  },
  separator: {
    marginBottom: 20,
    marginTop: 10,
    height: 1,
    width: "80%",
  },
});
