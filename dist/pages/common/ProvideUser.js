import React from "../../../_snowpack/pkg/react.js";
import {useParams} from "../../../_snowpack/pkg/react-router-dom.js";
import {useUser} from "../../hooks/index.js";
import {Loading} from "../../common/index.js";
export const ProvideUser = ({children}) => {
  const {id} = useParams();
  const {data: user, isLoading} = useUser(id);
  if (isLoading) {
    return /* @__PURE__ */ React.createElement(Loading, null);
  }
  if (!user) {
    return /* @__PURE__ */ React.createElement("div", null, "This users data is missing: ", id);
  }
  return /* @__PURE__ */ React.createElement(React.Fragment, null, children && children({user}));
};
