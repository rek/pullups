import * as React from "react";
import { StyleSheet } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { useUsers } from "../hooks/useUsers";
import { useSettings, mutateSettings } from "../hooks/useSettings";
import { useFirebase } from "../hooks/useFirebase";

export default function UsersScreen() {
  const { data } = useFirebase();
  const { data: users } = useUsers({ idToken: data });
  const { data: settingsData } = useSettings({ idToken: data });
  const updateSettings = mutateSettings({ idToken: data });

  const handleChange = (user: string) => () => {
    updateSettings.mutate(user);
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
        users={users?.map((user) => user.name) || []}
        active={settingsData?.active || ""}
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
