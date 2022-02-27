import React from "../../../_snowpack/pkg/react.js";
import {useParams} from "../../../_snowpack/pkg/react-router.js";
import {Loading, UserName} from "../../common/index.js";
import {TitleHeader} from "../../common/components/TitleHeader.js";
import {useUser} from "../../hooks/index.js";
import {ListLogItems} from "./ListLogItems.js";
export const ListLogs = () => {
  const {id} = useParams();
  const {data: userData, isLoading} = useUser(id);
  if (isLoading) {
    return /* @__PURE__ */ React.createElement(Loading, null);
  }
  if (!userData) {
    return /* @__PURE__ */ React.createElement("div", null, "This users data is missing: ", id);
  }
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(TitleHeader, null, /* @__PURE__ */ React.createElement(UserName, {
    name: userData.name
  })), /* @__PURE__ */ React.createElement(ListLogItems, {
    user: userData
  }));
};
