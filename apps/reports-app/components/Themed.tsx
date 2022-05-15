import * as React from "react";
import { Text as DefaultText, View as DefaultView } from "react-native";

import Colors from "../constants/Colors";

export const useCurrentTheme = () => {
  // const theme = useColorScheme();
  const theme = "dark";
  // console.log("-- currentThemeMode --", theme, Colors[theme]);

  return Colors[theme];
};

// export function useThemeColor(
//   props: { light?: string; dark?: string },
//   colorName: keyof typeof Colors.light & keyof typeof Colors.dark
// ) {
//   const theme = useColorScheme();
//   const colorFromProps = props[theme];

//   if (colorFromProps) {
//     return colorFromProps;
//   } else {
//     return Colors[theme][colorName];
//   }
// }

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
  color?: string;
};

export type TextProps = ThemeProps & DefaultText["props"];
export type ViewProps = ThemeProps & DefaultView["props"];

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, color, ...otherProps } = props;
  const { colors } = useCurrentTheme();

  return (
    <DefaultText
      style={[{ color: color || colors.text }, style]}
      {...otherProps}
    />
  );
}

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const { colors } = useCurrentTheme();

  return (
    <DefaultView
      style={[{ backgroundColor: colors.background }, style]}
      {...otherProps}
    />
  );
}
