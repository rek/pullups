import * as React from "react";
import capitalize from "lodash/capitalize";
import { StyleSheet, ScrollView, RefreshControl } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";

import { IDToken, PreparedChart, Loading, View } from "../../components";
import { useProcessedLogsForUserQuery } from "database";
import { StatsParamList } from "../../navigation/types";
import { usePreparedLogsForCharts } from "../../hooks/usePreparedLogsForCharts";

type Props = StackScreenProps<StatsParamList, "ShowStatsScreen">;
const SingleChartScreen: React.FC<Props> = ({ route, navigation }) => {
  const [refreshing, setRefreshing] = React.useState(false);
  const { user: currentUser } = route.params;

  // const resetProcessedLogs = useResetProcessedLogs(currentUser);
  const { data: logs, isLoading } = useProcessedLogsForUserQuery({
    user: currentUser,
  });

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // resetProcessedLogs();
    setRefreshing(false);
  }, []);

  // console.log("logs", logs?.length, { isLoading }, logs);
  const chartData = usePreparedLogsForCharts({ logs });

  React.useEffect(() => {
    navigation.setOptions({ title: capitalize(currentUser) });
  }, [currentUser]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.container}>
        <PreparedChart data={chartData} title="" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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

export default SingleChartScreen;
