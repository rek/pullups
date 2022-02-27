import React from "../../../_snowpack/pkg/react.js";
export const Duration = ({
  value,
  total
}) => {
  if (!value) {
    return null;
  }
  const calculatedDuration = value / total;
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", null, "Duration: ", value / 1e3, "s"), /* @__PURE__ */ React.createElement("div", null, "Calculated interval: ", calculatedDuration.toFixed(2), "ms"));
};
