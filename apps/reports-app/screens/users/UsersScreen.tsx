import * as React from "react";
import { StackScreenProps } from "@react-navigation/stack";

// import Colors from "../constants/Colors";
// import useColorScheme from "../hooks/useColorScheme";
import { UsersParamList } from "../../navigation/types";
import { IDToken } from "../../components/types";
import { RefreshView } from "../../components/RefreshView";
import { UsersList } from "./UsersList";
import {
  useUsers,
  useUsersInvalidate,
  useSettingsInvalidate,
  useSettingsMutate,
  useSettingsQuery,
  useSettingsInvalidateCallback,
} from "database";
import { Loading } from "../../components";

type Props = StackScreenProps<UsersParamList, "UsersScreen">;
const UsersScreen: React.FC<Props & IDToken> = ({ idToken, navigation }) => {
  const { data: users, isLoading } = useUsers();
  const { data: settingsData } = useSettingsQuery();
  const { mutate: updateSettings } = useSettingsMutate();
  const resetSettings = useSettingsInvalidateCallback();
  const resetUsers = () => useUsersInvalidate();
  // const colorScheme = useColorScheme();

  const onRefresh = React.useCallback(async () => {
    resetSettings();
    resetUsers();
  }, []);

  const handleSelect = async (user: string) => {
    await updateSettings({ active: user });
    resetSettings();
  };
  const handleShowStats = (user: string) => {
    navigation.navigate("ShowUserStatsScreen", { user });
  };

  // const scrollStyles = {
  //   ...styles.container,
  //   backgroundColor: Colors[colorScheme].background,
  // };

  if (isLoading) {
    return <Loading />;
  }

  const activeUser =
    users?.find((user) => user.name === settingsData?.active)?.name || "";

  return (
    <RefreshView refreshAction={onRefresh}>
      <UsersList
        users={users || []}
        active={activeUser}
        handleSelect={handleSelect}
        handleShowStats={handleShowStats}
      />
    </RefreshView>
  );
};

export default UsersScreen;
