import React from "../../_snowpack/pkg/react.js";
import {useReports} from "../hooks/index.js";
import {Loading, Title} from "../common/index.js";
import {SingleReport} from "./reports/SingleReport.js";
import {ProvideUser} from "./common/ProvideUser.js";
export const UserReports = ({user}) => {
  const {data: reports, isLoading} = useReports(user);
  if (isLoading) {
    return /* @__PURE__ */ React.createElement(Loading, null);
  }
  if (!reports) {
    return /* @__PURE__ */ React.createElement("div", null, "This user has no reports configured: ", user);
  }
  return /* @__PURE__ */ React.createElement(React.Fragment, null, reports.map((report) => /* @__PURE__ */ React.createElement(SingleReport, {
    key: report.name,
    user,
    report
  })));
};
export const UserTotals = () => {
  return /* @__PURE__ */ React.createElement(ProvideUser, null, ({user}) => {
    return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Title, {
      title: `User: ${user.name || "unknown"}`
    }), /* @__PURE__ */ React.createElement(UserReports, {
      user: user.name
    }));
  });
};
