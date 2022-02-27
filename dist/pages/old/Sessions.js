import React from "../../../_snowpack/pkg/react.js";
import dayjs from "../../../_snowpack/pkg/dayjs.js";
import {useData} from "../../hooks/useData.js";
import {Loading} from "../../common/index.js";
import {ListLogs} from "../logs/index.js";
export function Sessions() {
  const sessionData = useData({user: ""});
  if (!sessionData) {
    return /* @__PURE__ */ React.createElement(Loading, null);
  }
  console.log("sessionData", sessionData);
  let rows = [];
  rows = sessionData.reduce((result, {user, data, created, type, ...rest}, index) => {
    if (!data || !created) {
      return result;
    }
    return [
      ...result,
      {
        id: index,
        date: created ? dayjs(created.seconds * 1e3).format("D ddd MMM YYYY HH:mm:ss") : "unknown",
        user,
        type,
        data,
        processed: false,
        ...rest
      }
    ];
  }, rows);
  console.log("rows", rows);
  return /* @__PURE__ */ React.createElement(ListLogs, null);
}
