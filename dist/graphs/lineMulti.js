import dayjs from "../../_snowpack/pkg/dayjs.js";
import React from "../../_snowpack/pkg/react.js";
import styled from "../../_snowpack/pkg/styled-components.js";
import {
  VictoryChart,
  VictoryVoronoiContainer,
  VictoryLine,
  VictoryTheme,
  VictoryAxis
} from "../../_snowpack/pkg/victory.js";
import {Loading} from "../common/index.js";
const ChartContainer = styled.div`
  margin-bottom: 40px;
`;
export const LineMulti = ({
  config,
  labelX,
  labelY
}) => {
  if (!config) {
    return /* @__PURE__ */ React.createElement(Loading, null);
  }
  const theme = {
    ...VictoryTheme.grayscale
  };
  return /* @__PURE__ */ React.createElement("div", {
    style: {padding: "20px", backgroundColor: "#777"}
  }, /* @__PURE__ */ React.createElement(ChartContainer, null, /* @__PURE__ */ React.createElement(VictoryChart, {
    theme,
    height: 200,
    width: 1e3,
    scale: {x: "time"},
    padding: {top: 5, bottom: 24, left: 100, right: 40},
    containerComponent: /* @__PURE__ */ React.createElement(VictoryVoronoiContainer, {
      responsive: false
    })
  }, config.map(({data, color}, index) => {
    return /* @__PURE__ */ React.createElement(VictoryLine, {
      key: `line-${index}`,
      style: {data: {stroke: color || "red"}},
      data
    });
  }), /* @__PURE__ */ React.createElement(VictoryAxis, {
    tickCount: 4,
    tickFormat: (date) => dayjs(date).format("D MMM YY"),
    style: {
      tickLabels: {
        fontSize: 13
      }
    }
  }), /* @__PURE__ */ React.createElement(VictoryAxis, {
    dependentAxis: true,
    label: labelY || "",
    tickFormat: (count) => count.toFixed(2),
    style: {
      tickLabels: {
        fontSize: 13
      },
      axisLabel: {
        padding: 59,
        fontSize: 13,
        fontStyle: "italic"
      }
    }
  }))));
};
