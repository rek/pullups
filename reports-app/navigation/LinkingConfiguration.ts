import * as Linking from "expo-linking";

export default {
  prefixes: [Linking.makeUrl("/")],
  config: {
    screens: {
      Root: {
        screens: {
          Stats: {
            screens: {
              StatsScreen: "Stats",
              ShowStatsScreen: "ShowStatsScreen",
            },
          },
          Users: {
            screens: {
              UsersScreen: "Users",
              ShowUserStatsScreen: "ShowUserStatsScreen",
            },
          },
        },
      },
      NotFound: "*",
    },
  },
};
