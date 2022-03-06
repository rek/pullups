import { IDToken } from "../components/types";

export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};

export type BottomTabParamList = {
  Stats: undefined;
  Users: undefined;
};

export type StatsParamList = {
  StatsScreen: undefined;
  ShowStatsScreen: { user: string };
};

export type UsersParamList = {
  UsersScreen: undefined;
  ShowUserStatsScreen: { user: string };
};
