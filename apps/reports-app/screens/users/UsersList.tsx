import * as React from "react";
import { StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { View, Button } from "../../components";
type User = any;
interface Props {
  users: User[];
  active: string;
  handleSelect: (user: string) => void;
  handleShowStats: (user: string) => void;
}

const prepareUsersListData = (props: Props) => {
  console.log("Initial props:", props);
  return {
    ...props,
    users: props.users.map((user) => {
      console.log("user", user);
      return {
        ...user,
        displayName: `${user.displayName} (${user.displayWeight}kg)`,
        isActive: props.active === user.name,
      };
    }),
  };
};

export function UsersList(props: Props) {
  const { users } = prepareUsersListData(props);

  return (
    <View style={styles.wrapper}>
      {users.map((user) => {
        return (
          <View key={user.name} style={styles.row}>
            <Button
              active={user.isActive}
              handlePress={() => props.handleSelect(user.name)}
              containerStyles={styles.userButtonContainer}
            >
              {user.displayName}
            </Button>
            <Button
              containerStyles={styles.statsButtonContainer}
              handlePress={() => props.handleShowStats(user.name)}
            >
              <Ionicons
                size={20}
                // style={{ marginBottom: -4 }}
                // color="black"
                name="bar-chart"
              />
            </Button>
          </View>
        );
      })}
    </View>
  );
}

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
    padding: 11,
    paddingVertical: 13,
  },
  userButtonContainer: {
    width: 200,
    marginTop: 15,
    // marginHorizontal: 20,
    paddingVertical: 15,
  },
});
