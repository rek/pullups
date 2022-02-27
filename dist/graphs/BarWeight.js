import React from "../../_snowpack/pkg/react.js";
import dayjs from "../../_snowpack/pkg/dayjs.js";
import {Bar} from "./bar.js";
export const BarWeight = ({data}) => {
  return /* @__PURE__ */ React.createElement(Bar, {
    data,
    yLabel: "Weight (kg)",
    tooltip: (datum) => {
      const tip = [`Date: ${dayjs(datum.x).format("ddd D/MM/YY ha")}`];
      if (datum.y) {
        tip.unshift(`Weight: ${datum.y.toFixed(1)} kgs`);
      }
      return tip;
    }
  });
};
