import * as React from "react";
import { StyleSheet, ScrollView, RefreshControl } from "react-native";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import { IDToken } from "../types";
import { Loading } from "../components/Loading";
import UsersScreenInfo from "../components/UsersScreenInfo";
import { Text, View } from "../components/Themed";
import { useResetUsers, useUsers } from "../hooks/useUsers";
import {
  useSettings,
  mutateSettings,
  useResetSettings,
} from "../hooks/useSettings";
import { useFirebase } from "../hooks/useFirebase";

export default function ProvideIDToken() {
  const { data } = useFirebase();

  if (!data) {
    return <Loading />;
  }

  return <UsersScreen idToken={data} />;
}

function UsersScreen({ idToken }: IDToken) {
  const [refreshing, setRefreshing] = React.useState(false);
  const { data: users } = useUsers({ idToken });
  const { data: settingsData } = useSettings({ idToken });
  const updateSettings = mutateSettings({ idToken });
  const resetSettings = useResetSettings();
  const resetUsers = useResetUsers();
  const colorScheme = useColorScheme();

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    resetSettings();
    resetUsers();
    setRefreshing(false);
  }, []);

  const handleChange = (user: string) => () => {
    updateSettings.mutate(user);
  };

  const scrollStyles = {
    ...styles.container,
    backgroundColor: Colors[colorScheme].background,
  };

  return (
    <ScrollView
      style={scrollStyles}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <UsersScreenInfo
        users={users || []}
        active={
          users?.find((user) => user.name === settingsData?.active)?.name || ""
        }
        handleChange={handleChange}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
});
