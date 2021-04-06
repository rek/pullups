import * as React from "react";
import { StyleSheet, ScrollView, RefreshControl } from "react-native";

import { IDToken } from "../types";
import { Loading } from "../components/Loading";
import EditScreenInfo from "../components/EditScreenInfo";
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

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    resetSettings();
    resetUsers();
    setRefreshing(false);
  }, []);

  const handleChange = (user: string) => () => {
    updateSettings.mutate(user);
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Text style={styles.title}>Users</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <EditScreenInfo
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
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
