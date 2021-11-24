import React from "react";
import { StyleSheet } from "react-native";

import { User } from "../hooks/useUsers";
import { Button } from "./Button";
import { View } from "./Themed";

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
  },
  wrapper: {
    alignItems: "center",
    marginHorizontal: 50,
    display: "flex",
    flexDirection: "column",
    paddingVertical: 15,
    height: "100%",
  },
  statsButtonContainer: {
    marginTop: 15,
    marginLeft: 5,
    paddingLeft: 8,
    paddingRight: 8,
    paddingVertical: 15,
  },
  userButtonContainer: {
    width: 200,
    marginTop: 15,
    // marginHorizontal: 20,
    paddingVertical: 15,
  },
});

interface Props {
  users: User[];
  active: string;
  handleSelect: (user: string) => void;
  handleShowStats: (user: string) => void;
}
export default function UsersScreenInfo({
  users,
  active,
  handleSelect,
  handleShowStats,
}: Props) {
  return (
    <View style={styles.wrapper}>
      {users.map((user) => {
        const displayName = `${user.displayName} (${user.weight}kg)`;

        return (
          <View key={user.name} style={styles.row}>
            <Button
              active={active === user.name}
              handlePress={() => handleSelect(user.name)}
              containerStyles={styles.userButtonContainer}
            >
              {displayName}
            </Button>
            <Button
              containerStyles={styles.statsButtonContainer}
              handlePress={() => handleShowStats(user.name)}
            >
              Stats
            </Button>
          </View>
        );
      })}
    </View>
  );
}
