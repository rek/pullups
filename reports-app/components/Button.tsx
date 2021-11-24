import React from "react";
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from "react-native";

import Colors from "../constants/Colors";
import { Text, View } from "./Themed";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#ccc",
    borderRadius: 4,
  },
  text: {
    textAlign: "left",
  },
});

interface Props {
  handlePress: () => void;
  active?: boolean;
  containerStyles?: StyleProp<ViewStyle>;
}
export const Button: React.FC<Props> = ({
  handlePress,
  active,
  children,
  containerStyles,
}) => {
  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={[styles.container, containerStyles]}>
        <Text
          style={styles.text}
          lightColor={active ? Colors.light.tint : Colors.dark.tint}
        >
          {children}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
