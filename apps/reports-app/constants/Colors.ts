import { DefaultTheme, Theme } from "@react-navigation/native";
import { Appearance, ColorSchemeName } from "react-native";

const tintColorLight = "#eee";
const tintColorDark = "#fff";

const lighterGrey = "#eee";
const lightGrey = "#ccc";
const darkGrey = "#444";
const darkerGrey = "#222";
const blackish = "#111";

const red = "#fc5060";

export type CustomTheme = {
  icons: string;
  error: string;
  tint: string;
  tabIconDefault: string;
  tabIconSelected: string;
} & Theme &
  ThemeExtentions;

interface ThemeExtentions {
  inverseBackground: string;
  inverseText: string;
}

type Themes = Record<"light" | "dark", CustomTheme>;

export const currentThemeMode = "dark";
// export const currentThemeMode = Appearance.getColorScheme() || "dark";

export default {
  light: {
    dark: false,

    icons: "black",
    error: red,
    tint: lighterGrey,
    tabIconDefault: lightGrey,
    tabIconSelected: darkGrey,

    colors: {
      ...DefaultTheme.colors,
      text: darkGrey,
      background: lighterGrey,
    },

    inverseText: lightGrey,
    inverseBackground: darkGrey,
  },
  dark: {
    dark: true,

    icons: "white",
    error: red,
    tint: darkerGrey,
    tabIconDefault: lightGrey,
    tabIconSelected: darkGrey,

    colors: {
      ...DefaultTheme.colors,
      text: lighterGrey,
      background: blackish,
    },

    inverseText: darkGrey,
    inverseBackground: tintColorLight,
  },
} as Themes;
