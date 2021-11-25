import * as React from "react";
import {
  createStackNavigator,
  HeaderBackButton,
  StackScreenProps,
} from "@react-navigation/stack";

import { StatsParamList } from "../types";
import StatsScreen from "../../screens/stats/StatsScreen";
import SingleChartScreen from "../../screens/stats/SingleChart";

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const StatsStack = createStackNavigator<StatsParamList>();

type Props = StackScreenProps<StatsParamList, "StatsScreen">;
export const StatsNavigator: React.FC<Props> = ({ navigation }) => {
  const handleBack = () => {
    navigation.navigate("StatsScreen");
  };
  return (
    <StatsStack.Navigator>
      <StatsStack.Screen
        name="StatsScreen"
        component={StatsScreen}
        options={{ headerTitle: "Stats" }}
      />
      <StatsStack.Screen
        name="ShowStatsScreen"
        component={SingleChartScreen}
        options={{
          headerLeft: () => <HeaderBackButton onPress={handleBack} />,
        }}
      />
    </StatsStack.Navigator>
  );
};
