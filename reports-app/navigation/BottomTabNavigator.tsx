import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as React from "react";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import { BottomTabParamList } from "./types";
import { StatsIcon, StatsNavigator } from "./stats";
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
        component={StatsNavigator}
        options={{
          tabBarIcon: StatsIcon,
        }}
      />
      <BottomTab.Screen
        name="Users"
        component={UsersNavigator}
        options={{
          tabBarIcon: UsersIcon,
        }}
      />
    </BottomTab.Navigator>
  );
}
