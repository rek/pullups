import React from "react";
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { useCurrentTheme } from ".";

import { Text, View } from "./Themed";

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
  const theme = useCurrentTheme();

  const styles = StyleSheet.create({
    container: {
      alignItems: "center",
      backgroundColor: active ? "red" : theme.inverseBackground,
      borderRadius: 4,
    },
    text: {
      textAlign: "left",
    },
  });

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={[styles.container, containerStyles]}>
        <Text
          style={styles.text}
          color={active === true ? theme.tint : theme.inverseText}
        >
          {children}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
