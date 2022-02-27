import * as React from "../../../_snowpack/pkg/react.js";
import MaterialTooltip from "../../../_snowpack/pkg/@material-ui/core/Tooltip.js";
export const Tooltip = ({children, title, label}) => {
  if (!children) {
    return null;
  }
  return /* @__PURE__ */ React.createElement(MaterialTooltip, {
    title,
    "aria-label": label
  }, children);
};
