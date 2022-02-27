import React from "../../../_snowpack/pkg/react.js";
import {PeopleIcon, GraphIcon} from "../../common/index.js";
import {NavBar} from "../../common/index.js";
import {Profile} from "./Profile.js";
export const Sidebar = ({children}) => {
  const renderTopBarRight = ({handleClick}) => {
    return /* @__PURE__ */ React.createElement(Profile, {
      handleClick
    });
  };
  return /* @__PURE__ */ React.createElement(NavBar, {
    title: "Pullup tracking system v1",
    leftPages: [
      {name: "Home", icon: GraphIcon},
      {name: "Users", icon: PeopleIcon}
    ],
    renderTopBarRight
  }, children);
};
