import React from "../../../_snowpack/pkg/react.js";
import {useHistory} from "../../../_snowpack/pkg/react-router.js";
import {ArrowBackIcon} from "../material/icons.js";
export const Back = () => {
  const history = useHistory();
  const handleBack = () => {
    history.goBack();
  };
  return /* @__PURE__ */ React.createElement("div", {
    onClick: handleBack
  }, /* @__PURE__ */ React.createElement(ArrowBackIcon, null));
};
