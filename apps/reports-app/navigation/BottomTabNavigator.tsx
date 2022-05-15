import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as React from "react";

import { BottomTabParamList } from "./types";
import { StatsIcon, StatsNavigator } from "./stats";
import { UsersIcon, UsersNavigator } from "./users";
import { useCurrentTheme } from "../components";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  // const theme = useCurrentTheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Users"
      tabBarOptions={{
        // activeTintColor: theme.tabIconSelected,
        // inactiveTintColor: theme.tabIconDefault,
        // inactiveBackgroundColor: "#444",

        // both light:
        // activeBackgroundColor: "#fff",
        // inactiveBackgroundColor: "#fff",

        // both dark:
        // activeBackgroundColor: theme.background,
        // inactiveBackgroundColor: theme.background,

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
