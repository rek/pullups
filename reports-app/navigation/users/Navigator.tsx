import * as React from "react";
import {
  createStackNavigator,
  HeaderBackButton,
  StackScreenProps,
} from "@react-navigation/stack";

import UsersScreen from "../../screens/users/UsersScreen";
import SingleChartScreen from "../../screens/stats/SingleChart";

import { UsersParamList } from "../types";

const UsersStack = createStackNavigator<UsersParamList>();

type Props = StackScreenProps<UsersParamList, "UsersScreen">;
export const UsersNavigator: React.FC<Props> = ({ navigation }) => {
  const handleBack = () => {
    navigation.navigate("UsersScreen");
  };
  return (
    <UsersStack.Navigator>
      <UsersStack.Screen
        name="UsersScreen"
        component={UsersScreen}
        options={{ headerTitle: "Users" }}
      />
      <UsersStack.Screen
        name="ShowStatsScreen"
        component={SingleChartScreen}
        options={{
          headerLeft: () => <HeaderBackButton onPress={handleBack} />,
        }}
      />
    </UsersStack.Navigator>
  );
};
