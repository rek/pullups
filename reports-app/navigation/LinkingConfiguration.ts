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
            },
          },
          Users: {
            screens: {
              UsersScreen: "Users",
            },
          },
        },
      },
      NotFound: "*",
    },
  },
};
