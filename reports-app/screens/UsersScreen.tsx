import * as React from "react";
import { StyleSheet } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { useUsers } from "../hooks/useUsers";
import { useSettings, mutateSettings } from "../hooks/useSettings";

export default function UsersScreen() {
  const { data } = useUsers();
  const { data: settingsData } = useSettings();
  const updateSettings = mutateSettings();

  const handleChange = (user: string) => () => {
    updateSettings.mutate({ active: user });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Users</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <EditScreenInfo
        users={data?.map((user) => user.name) || []}
        active={settingsData.active}
        handleChange={handleChange}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
