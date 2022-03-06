import React from "react";
import { ActivityIndicator } from "react-native";
import { Layouts } from "./layouts";
import { View } from "./Themed";

import { StyleSheet } from "react-native";

export const Loading: React.FC = () => {
  return (
    <Layouts.Center>
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    </Layouts.Center>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 70,
  },
});
