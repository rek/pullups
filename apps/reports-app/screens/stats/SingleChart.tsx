import * as React from "react";
import capitalize from "lodash/capitalize";
import { StyleSheet, ScrollView, RefreshControl } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";

import { IDToken, PreparedChart, Loading, View } from "../../components";
import {
  useProcessedLogsForUser,
  useResetProcessedLogs,
} from "../../hooks/queries/useProcessedLogsForUser";
import { StatsParamList } from "../../navigation/types";
// import { usePreparedLogsForCharts } from "../../hooks/usePreparedLogsForCharts";

type Props = StackScreenProps<StatsParamList, "ShowStatsScreen">;
const SingleChartScreen: React.FC<Props & IDToken> = ({
  idToken,
  route,
  navigation,
}) => {
  const [refreshing, setRefreshing] = React.useState(false);
  const { user: currentUser } = route.params;

  const resetProcessedLogs = useResetProcessedLogs(currentUser);
  const { data: logs, isLoading } = useProcessedLogsForUser({
    idToken,
    user: currentUser,
  });

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    resetProcessedLogs();
    setRefreshing(false);
  }, []);

  // console.log("logs", logs?.length);
  // const chartData = usePreparedLogsForCharts({ logs });
  const chartData: any = [];

  if (isLoading) {
    return <Loading />;
  }

  navigation.setOptions({ title: capitalize(currentUser) });

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
