import React from "../../../_snowpack/pkg/react.js";
import clsx from "../../../_snowpack/pkg/clsx.js";
import {useTheme} from "../../../_snowpack/pkg/@material-ui/core/styles.js";
import Drawer from "../../../_snowpack/pkg/@material-ui/core/Drawer.js";
import CssBaseline from "../../../_snowpack/pkg/@material-ui/core/CssBaseline.js";
import AppBar from "../../../_snowpack/pkg/@material-ui/core/AppBar.js";
import Toolbar from "../../../_snowpack/pkg/@material-ui/core/Toolbar.js";
import List from "../../../_snowpack/pkg/@material-ui/core/List.js";
import Typography from "../../../_snowpack/pkg/@material-ui/core/Typography.js";
import Divider from "../../../_snowpack/pkg/@material-ui/core/Divider.js";
import IconButton from "../../../_snowpack/pkg/@material-ui/core/IconButton.js";
import ListItem from "../../../_snowpack/pkg/@material-ui/core/ListItem.js";
import ListItemIcon from "../../../_snowpack/pkg/@material-ui/core/ListItemIcon.js";
import ListItemText from "../../../_snowpack/pkg/@material-ui/core/ListItemText.js";
import Box from "../../../_snowpack/pkg/@material-ui/core/Box.js";
import SettingsIcon from "../../../_snowpack/pkg/@material-ui/icons/Settings.js";
import ChevronLeftIcon from "../../../_snowpack/pkg/@material-ui/icons/ChevronLeft.js";
import ChevronRightIcon from "../../../_snowpack/pkg/@material-ui/icons/ChevronRight.js";
import MenuIcon from "../../../_snowpack/pkg/@material-ui/icons/Menu.js";
import {useHistory} from "../../../_snowpack/pkg/react-router-dom.js";
import {useStyles} from "./theme.js";
export const NavBar = ({title, leftPages, renderTopBarRight, children}) => {
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleSettingsOpen = () => {
    console.log("open");
  };
  const handleClick = (name = "") => () => {
    history.push(`/${name.toLowerCase().replace(" ", "")}`);
  };
  return /* @__PURE__ */ React.createElement("div", {
    className: classes.root
  }, /* @__PURE__ */ React.createElement(CssBaseline, null), /* @__PURE__ */ React.createElement(AppBar, {
    position: "fixed",
    className: clsx(classes.appBar, {
      [classes.appBarShift]: open
    })
  }, /* @__PURE__ */ React.createElement(Toolbar, null, /* @__PURE__ */ React.createElement(IconButton, {
    color: "inherit",
    "aria-label": "open drawer",
    onClick: handleDrawerOpen,
    edge: "start",
    className: clsx(classes.menuButton, open && classes.hide)
  }, /* @__PURE__ */ React.createElement(MenuIcon, null)), /* @__PURE__ */ React.createElement(Box, {
    display: "flex",
    flexGrow: 1
  }, /* @__PURE__ */ React.createElement(Typography, {
    variant: "h6",
    noWrap: true
  }, title)), renderTopBarRight && renderTopBarRight({handleClick: handleSettingsOpen}))), /* @__PURE__ */ React.createElement(Drawer, {
    className: classes.drawer,
    variant: "persistent",
    anchor: "left",
    open,
    classes: {
      paper: classes.drawerPaper
    }
  }, /* @__PURE__ */ React.createElement("div", {
    className: classes.drawerHeader
  }, /* @__PURE__ */ React.createElement(IconButton, {
    onClick: handleDrawerClose
  }, theme.direction === "ltr" ? /* @__PURE__ */ React.createElement(ChevronLeftIcon, null) : /* @__PURE__ */ React.createElement(ChevronRightIcon, null))), /* @__PURE__ */ React.createElement(Divider, null), /* @__PURE__ */ React.createElement(List, null, leftPages.map(({name, icon}) => {
    const DefaultIcon = () => /* @__PURE__ */ React.createElement("div", null, "?");
    const Icon = icon || DefaultIcon;
    return /* @__PURE__ */ React.createElement(ListItem, {
      button: true,
      key: name,
      onClick: handleClick(name)
    }, /* @__PURE__ */ React.createElement(ListItemIcon, null, /* @__PURE__ */ React.createElement(Icon, null)), /* @__PURE__ */ React.createElement(ListItemText, {
      primary: name
    }));
  })), /* @__PURE__ */ React.createElement(Divider, null), /* @__PURE__ */ React.createElement(List, null, ["Settings"].map((text) => /* @__PURE__ */ React.createElement(ListItem, {
    button: true,
    key: text,
    onClick: handleClick(text)
  }, /* @__PURE__ */ React.createElement(ListItemIcon, null, /* @__PURE__ */ React.createElement(SettingsIcon, null)), /* @__PURE__ */ React.createElement(ListItemText, {
    primary: text
  }))))), /* @__PURE__ */ React.createElement("main", {
    className: clsx(classes.content, {
      [classes.contentShift]: open
    })
  }, /* @__PURE__ */ React.createElement("div", {
    className: classes.drawerHeader
  }), children));
};
