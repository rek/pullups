import React from "../../../_snowpack/pkg/react.js";
import styled from "../../../_snowpack/pkg/styled-components.js";
import TableCell from "../../../_snowpack/pkg/@material-ui/core/TableCell.js";
import Button from "../../../_snowpack/pkg/@material-ui/core/Button.js";
import MoreVertIcon from "../../../_snowpack/pkg/@material-ui/icons/MoreVert.js";
import Menu from "../../../_snowpack/pkg/@material-ui/core/Menu.js";
import MenuItem from "../../../_snowpack/pkg/@material-ui/core/MenuItem.js";
import {useStyles} from "./theme.js";
const IconWrapper = styled.div`
  margin-right: 10px;
  margin-top: 5px;
`;
export const IsolatedMenu = ({actions, row} = {
  actions: [],
  row: -1
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const classes = useStyles();
  const handleOpenMenu = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (event) => {
    if (event) {
      if ("stopPropagation" in event) {
        event.stopPropagation();
      }
    }
    setAnchorEl(null);
  };
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Menu, {
    anchorEl,
    keepMounted: true,
    open: Boolean(anchorEl),
    onClose: handleClose
  }, actions.map(({renderIcon, action, name}) => {
    return /* @__PURE__ */ React.createElement(MenuItem, {
      key: `action-${name}`,
      onClick: (event) => {
        event.stopPropagation();
        action(row);
        handleClose();
      },
      className: classes.menuItem
    }, /* @__PURE__ */ React.createElement(React.Fragment, null, renderIcon && /* @__PURE__ */ React.createElement(IconWrapper, null, renderIcon && renderIcon()), name));
  })), /* @__PURE__ */ React.createElement(TableCell, {
    align: "right",
    style: {width: "20px"}
  }, /* @__PURE__ */ React.createElement(Button, {
    "aria-controls": "user-session-menu",
    "aria-haspopup": "true",
    onClick: handleOpenMenu
  }, /* @__PURE__ */ React.createElement(MoreVertIcon, null))));
};
