import * as React from "react";
import capitalize from "lodash/capitalize";
import compact from "lodash/compact";
import { StyleSheet, ScrollView, RefreshControl } from "react-native";
import sortBy from "lodash/sortBy";

// import { BarChart } from "../components/BarChart";
// import { LineChart } from "../components/LineChart";
// import { LineChartResponsive } from "../components/LineChartResponsive";
import { LineChart } from "../components/LineChartChartKit";
import { Text, View } from "../components/Themed";
import { useFirebase } from "../hooks/useFirebase";
import {
  useProcessedLogsForUser,
  useResetProcessedLogs,
} from "../hooks/useProcessedLogsForUser";
import { Loading } from "../components/Loading";

const UserGraph = ({
  idToken,
  user,
  mode = "bar",
}: {
  idToken: string;
  user: string;
  mode: "line" | "bar";
}) => {
  const [refreshing, setRefreshing] = React.useState(false);
  const { data: logs } = useProcessedLogsForUser({
    idToken,
    user,
  });
  const resetProcessedLogs = useResetProcessedLogs(user);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    resetProcessedLogs();
    setRefreshing(false);
  }, []);

  // console.log("logs", logs);
  const chartData = compact(
    logs?.map((log) => {
      if (!log.created && !log.processed) {
        return false;
      }

      if (!log.weight) {
        return false;
      }

      return { y: log.weight, x: log.created || log.processed };
    })
  );

  const sortedData = sortBy(chartData, ["x"]);
  // console.log("chartData", sortedData);

  const Chart = LineChart;
  // const Chart = mode === "bar" ? BarChart : LineChart;

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Text style={styles.title}>{capitalize(user)}</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />

      {chartData ? <Chart data={sortedData} /> : <Loading />}
    </ScrollView>
  );
};

export default function StatsScreen() {
  const { data: idToken } = useFirebase();

  if (!idToken) {
    return null;
  }

  return (
    <View style={styles.container}>
      <UserGraph idToken={idToken} user="adam" mode="line" />
      <UserGraph idToken={idToken} user="anette" mode="line" />
    </View>
  );
}

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
