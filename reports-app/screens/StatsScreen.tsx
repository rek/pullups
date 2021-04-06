import * as React from "react";
import capitalize from "lodash/capitalize";
import compact from "lodash/compact";
import { StyleSheet, ScrollView, RefreshControl } from "react-native";

import { BarChart } from "../components/BarChart";
import { LineChart } from "../components/LineChart";
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
  const chartData = compact(logs?.map((log) => log.weight));
  // console.log("chartData", chartData);

  const Chart = mode === "bar" ? BarChart : LineChart;

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

      {chartData ? <Chart data={chartData} /> : <Loading />}
    </ScrollView>
  );
};

export default function StatsScreen() {
  const { data } = useFirebase();

  if (!data) {
    return null;
  }

  return (
    <View style={styles.container}>
      <UserGraph idToken={data} user="adam" mode="line" />
      <UserGraph idToken={data} user="anette" mode="line" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
