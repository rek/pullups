import * as React from "react";
import {
  createStackNavigator,
  HeaderBackButton,
  StackScreenProps,
} from "@react-navigation/stack";

import UsersScreen from "../../screens/users/UsersScreen";
import SingleChartScreen from "../../screens/stats/SingleChart";

import { UsersParamList } from "../types";
import { useCurrentTheme } from "../../components";

const UsersStack = createStackNavigator<UsersParamList>();

type Props = StackScreenProps<UsersParamList, "UsersScreen">;
export const UsersNavigator: React.FC<Props> = ({ navigation }) => {
  const theme = useCurrentTheme();

  const handleBack = () => {
    navigation.navigate("UsersScreen");
  };
  return (
    <UsersStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.background,
        },
        headerTintColor: theme.colors.text,
      }}
    >
      <UsersStack.Screen
        name="UsersScreen"
        component={UsersScreen}
        options={{ headerTitle: "Users" }}
      />
      <UsersStack.Screen
        name="ShowUserStatsScreen"
        component={SingleChartScreen}
        options={{
          headerLeft: () => <HeaderBackButton onPress={handleBack} />,
        }}
      />
    </UsersStack.Navigator>
  );
};
