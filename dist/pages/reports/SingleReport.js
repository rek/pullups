import React from "../../../_snowpack/pkg/react.js";
import get from "../../../_snowpack/pkg/lodash/get.js";
import {useProcessedLogsForUser} from "../../hooks/index.js";
import {BarWeight} from "../../graphs/index.js";
import {Loading, SubTitle} from "../../common/index.js";
export const SingleReport = ({user, report}) => {
  const {data: reportData, isLoading} = useProcessedLogsForUser(user);
  if (isLoading) {
    return /* @__PURE__ */ React.createElement(Loading, null);
  }
  if (!reportData || reportData.length === 0) {
    return /* @__PURE__ */ React.createElement("div", null, "Missing data for this report");
  }
  const reportInfo = reportData;
  const mappedData = reportInfo.map(({created, ...rest}) => {
    const yData = get(rest, report.fields[0]);
    return {x: created, y: yData};
  });
  const line1 = {
    data: mappedData,
    name: "Weight"
  };
  const line2 = {
    data: [],
    name: "Weight",
    color: "blue"
  };
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(SubTitle, {
    title: report.name
  }), report.type === "BarWeight" && /* @__PURE__ */ React.createElement(BarWeight, {
    data: mappedData
  }));
};
