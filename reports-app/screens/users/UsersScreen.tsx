import * as React from "react";

// import Colors from "../constants/Colors";
// import useColorScheme from "../hooks/useColorScheme";
import { IDToken } from "../../navigation/types";
import { RefreshView } from "../../components/RefreshView";
import UsersScreenInfo from "../../components/UsersScreenInfo";
import { useResetUsers, useUsers } from "../../hooks/useUsers";
import {
  useSettings,
  mutateSettings,
  useResetSettings,
} from "../../hooks/useSettings";
import { ProvideIDToken } from "../../components/ProvideIDToken";

function UsersScreen({ idToken }: IDToken) {
  const { data: users } = useUsers({ idToken });
  const { data: settingsData } = useSettings({ idToken });
  const updateSettings = mutateSettings({ idToken });
  const resetSettings = useResetSettings();
  const resetUsers = useResetUsers();
  // const colorScheme = useColorScheme();

  const onRefresh = React.useCallback(async () => {
    await resetSettings();
    await resetUsers();
  }, []);

  const handleSelect = (user: string) => {
    updateSettings.mutate(user);
  };
  const handleShowStats = (user: string) => {
    console.log("handleShowStats user", user);
  };

  // const scrollStyles = {
  //   ...styles.container,
  //   backgroundColor: Colors[colorScheme].background,
  // };

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
}

const WithProvicer: React.FC = () => {
  return (
    <ProvideIDToken>
      <UsersScreen />
      {/* {() => UsersScreen} */}
    </ProvideIDToken>
  );
};

export default WithProvicer;
