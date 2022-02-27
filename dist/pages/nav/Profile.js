import * as React from "../../../_snowpack/pkg/react.js";
import {PersonIcon, Tooltip} from "../../common/index.js";
import IconButton from "../../../_snowpack/pkg/@material-ui/core/IconButton.js";
import {useSettings} from "../../hooks/index.js";
export const Profile = ({handleClick}) => {
  const {data: settings} = useSettings();
  if (!settings) {
    return null;
  }
  return /* @__PURE__ */ React.createElement("div", {
    onClick: handleClick
  }, /* @__PURE__ */ React.createElement(Tooltip, {
    title: settings.active,
    label: "add"
  }, /* @__PURE__ */ React.createElement(IconButton, null, /* @__PURE__ */ React.createElement(PersonIcon, {
    color: "secondary"
  }))));
};
