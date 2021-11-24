import * as React from "react";
import capitalize from "lodash/capitalize";
import compact from "lodash/compact";
import { StyleSheet, ScrollView, RefreshControl } from "react-native";
import sortBy from "lodash/sortBy";

import { View } from "../../components/Themed";
import { PreparedChart } from "../../components/PreparedChart";
import { useFirebase } from "../../hooks/useFirebase";
import {
  useProcessedLogsForUser,
  useResetProcessedLogs,
} from "../../hooks/useProcessedLogsForUser";

export default function SingleChartScreen() {
  const { data: idToken } = useFirebase();
  const [refreshing, setRefreshing] = React.useState(false);

  const user = "adam";

  const resetProcessedLogs = useResetProcessedLogs("adam");
  const { data: logs } = useProcessedLogsForUser({
    idToken,
    user,
  });

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    resetProcessedLogs();
    setRefreshing(false);
  }, []);

  if (!idToken) {
    return null;
  }

  // this represents bad data
  const WEIGHT_LIMIT = 40;

  // console.log("logs", logs);
  const chartData = compact(
    logs?.map((log) => {
      if (!log.created && !log.processed) {
        return false;
      }

      if (!log.weight) {
        return false;
      }

      if (log.weight < WEIGHT_LIMIT) {
        return false;
      }

      return { y: log.weight, x: log.created || log.processed };
    })
  );

  const sortedData = sortBy(chartData, ["x"]);

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.container}>
        <PreparedChart data={sortedData} title={capitalize(user)} />
      </View>
    </ScrollView>
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
