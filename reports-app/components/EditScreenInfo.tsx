import * as WebBrowser from "expo-web-browser";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import Colors from "../constants/Colors";
import { User } from "../hooks/useUsers";
import { Text, View } from "./Themed";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  developmentModeText: {
    marginBottom: 20,
    fontSize: 14,
    lineHeight: 19,
    textAlign: "center",
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: "contain",
    marginTop: 3,
    marginLeft: -10,
  },
  wrapper: {
    alignItems: "center",
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightContainer: {
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: "center",
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

export default function EditScreenInfo({
  users,
  active,
  handleChange,
}: {
  users: User[];
  active: string;
  handleChange: (user: string) => () => void;
}) {
  return (
    <View>
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
    </View>
  );
}
