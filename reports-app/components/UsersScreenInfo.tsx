import * as WebBrowser from "expo-web-browser";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import Colors from "../constants/Colors";
import { User } from "../hooks/useUsers";
import { Text, View } from "./Themed";

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    marginHorizontal: 50,
    display: "flex",
    flexDirection: "column",
    paddingVertical: 15,
    height: "100%",
  },
  userContainer: {
    marginTop: 15,
    marginHorizontal: 20,
    alignItems: "center",
    paddingVertical: 15,
    backgroundColor: "#ccc",
    width: 300,
  },
  userText: {
    textAlign: "left",
  },
});

export default function UsersScreenInfo({
  users,
  active,
  handleChange,
}: {
  users: User[];
  active: string;
  handleChange: (user: string) => () => void;
}) {
  return (
    <View style={styles.wrapper}>
      {users.map((user) => {
        const displayName = `${user.displayName} (${user.weight}kg)`;
        return (
          <TouchableOpacity key={user.name} onPress={handleChange(user.name)}>
            <View style={styles.userContainer}>
              <Text
                style={styles.userText}
                lightColor={
                  active === user.name ? Colors.light.tint : Colors.dark.tint
                }
              >
                {displayName}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
