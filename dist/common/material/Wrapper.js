import * as React from "../../../_snowpack/pkg/react.js";
import {createMuiTheme, ThemeProvider} from "../../../_snowpack/pkg/@material-ui/core/styles.js";
import useMediaQuery from "../../../_snowpack/pkg/@material-ui/core/useMediaQuery.js";
import CssBaseline from "../../../_snowpack/pkg/@material-ui/core/CssBaseline.js";
export const Wrapper = ({children}) => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = React.useMemo(() => createMuiTheme({
    palette: {
      type: prefersDarkMode ? "dark" : "light",
      primary: {
        main: "#00897b"
      },
      secondary: {
        main: "#ccc"
      }
    }
  }), [prefersDarkMode]);
  return /* @__PURE__ */ React.createElement(ThemeProvider, {
    theme
  }, /* @__PURE__ */ React.createElement(CssBaseline, null), children);
};
