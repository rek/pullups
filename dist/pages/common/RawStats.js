import React from "../../../_snowpack/pkg/react.js";
import {Title} from "../../common/index.js";
import {Duration} from "./Duration.js";
export const RawStats = ({log}) => {
  const hasStats = log.duration !== void 0;
  if (!hasStats) {
    return null;
  }
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Title, null, "Raw stats:"), /* @__PURE__ */ React.createElement(Duration, {
    value: log.duration,
    total: log.data.length
  }));
};
