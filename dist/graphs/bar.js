import React from "../../_snowpack/pkg/react.js";
import maxBy from "../../_snowpack/pkg/lodash/maxBy.js";
import assign from "../../_snowpack/pkg/lodash/assign.js";
import dayjs from "../../_snowpack/pkg/dayjs.js";
import {
  VictoryChart,
  VictoryVoronoiContainer,
  VictoryBar,
  VictoryTheme,
  VictoryTooltip,
  VictoryAxis
} from "../../_snowpack/pkg/victory.js";
import {Loading} from "../common/index.js";
import {colours} from "../styles/colours.js";
export const Bar = ({data, yLabel, tooltip}) => {
  if (!data) {
    return /* @__PURE__ */ React.createElement(Loading, null);
  }
  const baseProps = {
    width: 350,
    height: 350,
    padding: 50
  };
  const padding = 8;
  const sansSerif = "'Helvetica Neue', 'Helvetica', sans-serif";
  const letterSpacing = "normal";
  const fontSize = 12;
  const baseLabelStyles = {
    fontFamily: sansSerif,
    fontSize,
    letterSpacing,
    padding,
    fill: colours.blueGrey700,
    stroke: "transparent",
    strokeWidth: 0
  };
  const theme = {
    ...VictoryTheme.grayscale,
    bar: assign({
      style: {
        data: {
          fill: colours.blueGrey700,
          padding,
          strokeWidth: 0
        },
        labels: baseLabelStyles
      }
    }, baseProps)
  };
  const barWidth = 16;
  const style = {
    data: {
      fill: ({datum}) => {
        const afterLunch = Number(dayjs(datum.x).format("H")) > 12;
        return afterLunch ? colours.redDark : colours.red;
      }
    },
    labels: {
      fontSize: 10,
      fill: "#000"
    }
  };
  const maxDataItem = maxBy(data, "y") || {x: 1, y: 1};
  const maxDomain = (maxDataItem.y || 1) * 1.2;
  const containerStyle = {
    padding: "60px",
    backgroundColor: "#777"
  };
  return /* @__PURE__ */ React.createElement("div", {
    style: containerStyle
  }, /* @__PURE__ */ React.createElement(VictoryChart, {
    height: 200,
    width: 500,
    domainPadding: {x: 5},
    padding: {top: 5, bottom: 50, left: 100, right: 40},
    containerComponent: /* @__PURE__ */ React.createElement(VictoryVoronoiContainer, {
      responsive: false
    })
  }, /* @__PURE__ */ React.createElement(VictoryBar, {
    data,
    style,
    alignment: "start",
    maxDomain,
    barWidth,
    labelComponent: /* @__PURE__ */ React.createElement(VictoryTooltip, {
      flyoutWidth: 200,
      flyoutHeight: 50
    }),
    labels: ({datum}) => tooltip ? tooltip(datum) : []
  }), /* @__PURE__ */ React.createElement(VictoryAxis, {
    crossAxis: true,
    tickCount: 2,
    label: "",
    tickFormat: (date) => dayjs(date).format("D/MM/YY"),
    style: {
      tickLabels: {
        fontSize: 12
      },
      axisLabel: {
        padding: 30,
        border: "1px solid",
        fontSize: 13,
        fontStyle: "italic"
      }
    }
  }), /* @__PURE__ */ React.createElement(VictoryAxis, {
    dependentAxis: true,
    label: yLabel,
    tickFormat: (count) => count.toFixed(0),
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
  })));
};
