import React from "../../_snowpack/pkg/react.js";
import {Text} from "../common/index.js";
import {GroupGraphUser} from "../graphs/groups.js";
import {useReport} from "../hooks/useReports.js";
const UserGraph = () => {
  const [data] = React.useState([]);
  const {data: reportData} = useReport("adam", "weight");
  console.log("reportData", reportData);
  React.useEffect(() => {
  }, []);
  return /* @__PURE__ */ React.createElement(GroupGraphUser, {
    data
  });
};
export const Dashboard = () => {
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Text, null, "Overview"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(UserGraph, null)));
};
