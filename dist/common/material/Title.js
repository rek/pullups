import * as React from "../../../_snowpack/pkg/react.js";
import Typography from "../../../_snowpack/pkg/@material-ui/core/Typography.js";
export const Title = ({title, children}) => {
  return /* @__PURE__ */ React.createElement(Typography, {
    variant: "h5",
    component: "h2",
    gutterBottom: true
  }, title, children);
};
