import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import StatsScreen from "../screens/stats/StatsScreen";
import { BottomTabParamList, StatsParamList } from "./types";
import { StatsIcon } from "./stats";
import { UsersIcon, UsersNavigator } from "./users";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Users"
      tabBarOptions={{
        activeTintColor: Colors[colorScheme].tabIconSelected,
        inactiveTintColor: Colors[colorScheme].tabIconDefault,
        // inactiveBackgroundColor: "#444",

        // both light:
        // activeBackgroundColor: "#fff",
        // inactiveBackgroundColor: "#fff",

        // both dark:
        // activeBackgroundColor: Colors[colorScheme].background,
        // inactiveBackgroundColor: Colors[colorScheme].background,

        style: {
          borderTopWidth: 0,
          height: 56,
          paddingBottom: 5,
        },
        // active:
        // border: 1px solid rgb(119, 119, 119);
      }}
    >
      <BottomTab.Screen
        name="Stats"
        component={TabOneNavigator}
        options={{
          tabBarIcon: UsersIcon,
        }}
      />
      <BottomTab.Screen
        name="Users"
        component={UsersNavigator}
        options={{
          tabBarIcon: StatsIcon,
        }}
      />
    </BottomTab.Navigator>
  );
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator<StatsParamList>();

function TabOneNavigator() {
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="StatsScreen"
        component={StatsScreen}
        options={{ headerTitle: "Stats" }}
      />
    </TabOneStack.Navigator>
  );
}
