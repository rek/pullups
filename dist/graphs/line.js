import React from "../../_snowpack/pkg/react.js";
import {
  VictoryChart,
  VictoryVoronoiContainer,
  VictoryLine,
  VictoryTheme,
  VictoryTooltip
} from "../../_snowpack/pkg/victory.js";
import {Loading} from "../common/index.js";
import {colours} from "../styles/colours.js";
export const Line = ({
  data,
  medianLine,
  maxDomain,
  markers
}) => {
  if (!data) {
    return /* @__PURE__ */ React.createElement(Loading, null);
  }
  const theme = {
    ...VictoryTheme.grayscale
  };
  const start = 1;
  const end = data.length;
  const showMedian = !!(medianLine && end > 0);
  return /* @__PURE__ */ React.createElement("div", {
    style: {padding: "20px", backgroundColor: "#777"}
  }, /* @__PURE__ */ React.createElement(VictoryChart, {
    theme,
    height: 200,
    width: 1e3,
    padding: {top: 5, bottom: 0, left: 100, right: 40},
    containerComponent: /* @__PURE__ */ React.createElement(VictoryVoronoiContainer, {
      responsive: false
    })
  }, markers && markers.map((marker, index) => /* @__PURE__ */ React.createElement(VictoryLine, {
    key: `group-line-${index}`,
    style: {
      data: {stroke: marker.stroke || colours.grey},
      parent: {border: "1px dotted #ccc"}
    },
    data: [
      {x: marker.x, y: 0},
      {x: marker.x, y: maxDomain}
    ]
  })), /* @__PURE__ */ React.createElement(VictoryLine, {
    data,
    interpolation: "natural",
    domain: {y: [0, maxDomain || 1]},
    labels: ({datum}) => `${datum.y} (${datum.x})`,
    labelComponent: /* @__PURE__ */ React.createElement(VictoryTooltip, null)
  }), showMedian && /* @__PURE__ */ React.createElement(VictoryLine, {
    style: {
      data: {stroke: "#c43a31"},
      parent: {border: "1px dotted #ccc"}
    },
    data: [
      {x: start, y: medianLine},
      {x: end, y: medianLine}
    ]
  })));
};
