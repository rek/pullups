import React from "../../../_snowpack/pkg/react.js";
import get from "../../../_snowpack/pkg/lodash/get.js";
import {processLog} from "../../../_snowpack/pkg/detect-pullups.js";
import {markAsProcessedLogData, useData} from "../../hooks/useData.js";
import {
  Loading,
  Table,
  DeleteIcon,
  ViewIcon,
  AddIcon
} from "../../common/index.js";
import {mutateUserWeight} from "../../hooks/useUser.js";
import {
  mutateProcessedLogs,
  deleteLogData,
  getMarkersFromProcessedData
} from "../../hooks/index.js";
import {UserLogChart} from "../UserLogChart.js";
import {logDebug} from "../../utils.js";
export const ListLogItems = ({user}) => {
  const allDataForUser = useData({user: user.name});
  const updateUserWeight = mutateUserWeight(user.name);
  const markAsProcessed = markAsProcessedLogData(user.name);
  const addProcessedLog = mutateProcessedLogs(user.name, (log) => {
    markAsProcessed.mutate(log.logId);
  });
  const deleteLog = deleteLogData(user.name);
  const [markers, setExtra] = React.useState();
  if (!allDataForUser) {
    return /* @__PURE__ */ React.createElement(Loading, null);
  }
  console.log("[User Logs] All session data: ", allDataForUser);
  console.log("[User Logs] User:", user);
  let rows = [];
  const columns = [
    {name: "Date", align: "left"},
    {name: "Processed", align: "right"}
  ];
  allDataForUser.sort((a, b) => {
    const aTime = get(a, "created.seconds");
    const bTime = get(b, "created.seconds");
    return bTime - aTime;
  });
  rows = allDataForUser.reduce((result, userLog) => {
    if (!userLog.data || !userLog.created) {
      return result;
    }
    const newRow = [
      {data: userLog.created.date},
      {data: userLog.isProcessed ? "Yes" : "No"}
    ];
    return [...result, newRow];
  }, rows);
  const actions = [
    {
      name: "Delete",
      action: async (rowId) => {
        deleteLog.mutate(allDataForUser[rowId]._id);
      },
      renderIcon: () => /* @__PURE__ */ React.createElement(DeleteIcon, null)
    },
    {
      name: "Transfer",
      action: async (rowId) => {
        console.log("Transfer log:", rows[rowId]);
      },
      renderIcon: () => /* @__PURE__ */ React.createElement("div", null, "T")
    },
    {
      name: "Test",
      action: async (rowId) => {
        const row = allDataForUser[rowId];
        console.log("RAW", row.data);
        console.log("========== Result: =============");
        const result = await processLog(row.data, user.weight);
        console.log("Processing result:", result);
        if (result.report.items.length > 0) {
          const allFoundMarkers = getMarkersFromProcessedData(result.report);
          logDebug("allFoundMarkers", allFoundMarkers);
          setExtra(allFoundMarkers);
        }
        console.log("================================");
      },
      renderIcon: () => /* @__PURE__ */ React.createElement(ViewIcon, null)
    },
    {
      name: "Process",
      renderIcon: () => /* @__PURE__ */ React.createElement(AddIcon, null),
      action: async (id) => {
        const row = allDataForUser[id];
        if (row.isProcessed) {
          console.warn("Cannot double process!");
          return;
        }
        const result = await processLog(row.data, user.weight);
        console.log("[User Logs] Processing result:", result);
        addProcessedLog.mutate({
          format: 1,
          logId: row._id,
          created: row.created.seconds,
          processed: +new Date(),
          weight: result.weight,
          report: result.report
        });
        if (result.weight) {
          if (row.created.seconds > (user.weightLastUpdated || 0)) {
            updateUserWeight.mutate({
              ...user,
              weight: result.weight,
              weightLastUpdated: row.created.seconds
            });
          }
        }
        setExtra(result.report.items[0].markers);
      }
    }
  ];
  return /* @__PURE__ */ React.createElement(Table, {
    actions,
    columns,
    data: rows,
    options: {
      expandable: true,
      expandableContent: (tableRow, rowIndex) => {
        const rawRow = allDataForUser[rowIndex];
        return /* @__PURE__ */ React.createElement(UserLogChart, {
          user: rawRow.user,
          logId: rawRow._id,
          data: rawRow,
          extras: markers
        });
      }
    }
  });
};
