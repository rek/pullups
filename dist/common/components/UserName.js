import React from "../../../_snowpack/pkg/react.js";
import capitalize from "../../../_snowpack/pkg/lodash/capitalize.js";
import {Title} from "../index.js";
export const UserName = ({name}) => {
  return /* @__PURE__ */ React.createElement(Title, {
    title: `User: ${capitalize(name) || "unknown"}`
  });
};
