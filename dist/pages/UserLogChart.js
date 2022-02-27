import React from "../../_snowpack/pkg/react.js";
import max from "../../_snowpack/pkg/lodash/max.js";
import {Line} from "../graphs/line.js";
import {Loading, Text, Title} from "../common/index.js";
import {getMarkersFromProcessedData, useProcessedLog} from "../hooks/index.js";
import {useClosestKnownWeight} from "../hooks/useClosestKnownWeight.js";
import {RawStats} from "./common/RawStats.js";
const namespace = "[UserLogChart]";
export const UserLogChart = ({
  data,
  user,
  logId,
  extras
}) => {
  const [formattedData, setFormattedData] = React.useState([]);
  const [maxDomain, setMaxDomain] = React.useState(1);
  const {data: processedLogData} = useProcessedLog(user, logId || "");
  const convertDataIntoLine = (log) => {
    const result = log.data.map((value, index) => {
      return {x: index, y: value};
    });
    setFormattedData(result);
  };
  React.useEffect(() => {
    if (data) {
      convertDataIntoLine(data);
      const possibleMax = max(data.data);
      if (possibleMax) {
        setMaxDomain(possibleMax * 1.1);
      }
    }
  }, [data]);
  if (!data) {
    return /* @__PURE__ */ React.createElement(Loading, null);
  }
  let medianLine = processedLogData && processedLogData.length > 0 ? processedLogData[0].weight : -1;
  if (medianLine === -1 && logId) {
    medianLine = useClosestKnownWeight({user, logId});
  }
  let markersToShow = extras || [];
  let processedMarkers = [];
  if (processedLogData && processedLogData.length > 0) {
    processedMarkers = processedLogData.flatMap((pullup) => getMarkersFromProcessedData(pullup.report));
  }
  if (processedMarkers && processedMarkers.length > 0) {
    markersToShow = processedMarkers;
  }
  console.log("Processed log for line:", processedLogData);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Line, {
    data: formattedData,
    medianLine,
    maxDomain,
    markers: markersToShow
  }), processedLogData && /* @__PURE__ */ React.createElement(LogStats, {
    logs: processedLogData,
    first: markersToShow[0]
  }), /* @__PURE__ */ React.createElement(RawStats, {
    log: data
  }));
};
const LogStats = ({
  logs,
  first
}) => {
  console.log("first", first);
  console.log("logs", logs);
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(Title, null, "Stats:"), /* @__PURE__ */ React.createElement("div", null, logs.length === 0 && "This log has not been processed."), logs.map((log) => {
    const weight = log.weight || 0;
    const peak = first ? first.y || 0 : 0;
    const power = peak / weight;
    return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Text, {
      key: log.logId
    }, "Processed average weight found: ", log.weight.toFixed(2)), /* @__PURE__ */ React.createElement(Text, {
      key: `${log.logId}_power`
    }, "Power: ", Number(power).toFixed(2), " "));
  }));
};
