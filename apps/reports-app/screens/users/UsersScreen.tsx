import * as React from "react";
import { StackScreenProps } from "@react-navigation/stack";

// import Colors from "../constants/Colors";
// import useColorScheme from "../hooks/useColorScheme";
import { UsersParamList } from "../../navigation/types";
import { IDToken } from "../../components/types";
import { RefreshView } from "../../components/RefreshView";
import UsersScreenInfo from "./UsersList";
// import { useResetUsers } from "../../hooks/queries/useUsers";
import { useUsers } from "../../hooks/useUser";
// import {
//   useSettings,
//   mutateSettings,
//   useResetSettings,
// } from "../../hooks/useSettings";
import { ProvideIDToken } from "../../components/ProvideIDToken";
import { Loading } from "../../components";

type Props = StackScreenProps<UsersParamList, "UsersScreen">;
const UsersScreen: React.FC<Props & IDToken> = ({ idToken, navigation }) => {
  const { data: users, isLoading } = useUsers();
  // const { data: users, isLoading } = useUsers({ idToken });
  // const { data: settingsData } = useSettings({ idToken });
  const settingsData = { active: false };
  // const updateSettings = mutateSettings({ idToken });
  // const resetSettings = useResetSettings();
  // const resetUsers = useResetUsers();
  // const colorScheme = useColorScheme();

  const onRefresh = React.useCallback(async () => {
    // await resetSettings();
    // await resetUsers();
  }, []);

  const handleSelect = (user: string) => {
    // updateSettings.mutate(user);
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
      <UsersScreenInfo
        users={users || []}
        active={activeUser}
        handleSelect={handleSelect}
        handleShowStats={handleShowStats}
      />
    </RefreshView>
  );
};

const WithProvicer: React.FC<Props> = (props) => (
  <ProvideIDToken>
    <UsersScreen {...props} />
  </ProvideIDToken>
);

export default WithProvicer;
