import * as React from "react";
import capitalize from "lodash/capitalize";
import { StyleSheet } from "react-native";

import { BarChart } from "../components/BarChart";
import { Text, View } from "../components/Themed";
import { useFirebase } from "../hooks/useFirebase";
import { useProcessedLogsForUser } from "../hooks/useProcessedLogsForUser";

const UserGraph = ({ idToken, user }: { idToken: string; user: string }) => {
  const { data: logs } = useProcessedLogsForUser({
    idToken,
    user,
  });

  // console.log("logs", logs);
  const chartData = logs?.map((log) => log.weight);
  // console.log("chartData", chartData);

  return (
    <>
      <Text style={styles.title}>{capitalize(user)}</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      {chartData ? (
        <BarChart data={chartData} />
      ) : (
        <Text style={styles.title}>Loading...</Text>
      )}
    </>
  );
};

export default function StatsScreen() {
  const { data } = useFirebase();

  if (!data) {
    return null;
  }

  return (
    <View style={styles.container}>
      <UserGraph idToken={data} user="adam" />
      <UserGraph idToken={data} user="anette" />
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
