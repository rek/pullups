import React from "../../_snowpack/pkg/react.js";
import {VictoryGroup, VictoryBar} from "../../_snowpack/pkg/victory.js";
export const GroupGraphDemo = () => {
  return /* @__PURE__ */ React.createElement(GroupGraph, {
    data: [
      [
        {x: "a", y: 2},
        {x: "b", y: 3},
        {x: "c", y: 5}
      ],
      [
        {x: "a", y: 1},
        {x: "b", y: 4},
        {x: "c", y: 5}
      ],
      [
        {x: "a", y: 3},
        {x: "b", y: 2},
        {x: "c", y: 6}
      ]
    ]
  });
};
export const GroupGraphUser = ({data}) => {
  return /* @__PURE__ */ React.createElement(GroupGraph, {
    data
  });
};
export const GroupGraph = ({data}) => {
  if (!data) {
    return /* @__PURE__ */ React.createElement("div", null, "Loading...");
  }
  return /* @__PURE__ */ React.createElement(VictoryGroup, {
    offset: 25,
    colorScale: ["tomato", "orange", "gold"]
  }, data.map((item) => /* @__PURE__ */ React.createElement(VictoryBar, {
    data: item
  })));
};
