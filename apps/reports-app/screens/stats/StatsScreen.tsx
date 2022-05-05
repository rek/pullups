import * as React from "react";
import capitalize from "lodash/capitalize";
import compact from "lodash/compact";
import { StyleSheet, ScrollView, RefreshControl } from "react-native";
import sortBy from "lodash/sortBy";
import { View } from "../../components/Themed";
import { PreparedChart } from "../../components/PreparedChart";

// import {
//   useProcessedLogsForUser,
//   useResetProcessedLogs,
// } from "../../hooks/queries/useProcessedLogsForUser";

const UserGraph = ({
  user,
  mode = "bar",
}: {
  user: string;
  mode: "line" | "bar";
}) => {
  // const { data: logs } = useProcessedLogsForUser({
  //   idToken,
  //   user,
  // });

  const logs: any = [];

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
  // console.log("chartData", sortedData);

  return <PreparedChart data={sortedData} title={capitalize(user)} />;
};

export default function StatsScreen() {
  const [refreshing, setRefreshing] = React.useState(false);

  // const resetProcessedLogs1 = useResetProcessedLogs("adam");
  // const resetProcessedLogs2 = useResetProcessedLogs("anette");

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // resetProcessedLogs1();
    // resetProcessedLogs2();
    setRefreshing(false);
  }, []);

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.container}>
        <UserGraph user="adam" mode="line" />
        <UserGraph user="anette" mode="line" />
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
