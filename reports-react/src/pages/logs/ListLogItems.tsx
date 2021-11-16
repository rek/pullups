import React from "react";
import get from "lodash/get";
import { processLog } from "detect-pullups";

import { markAsProcessedLogData, useData } from "../../hooks/useData";
import {
  Loading,
  Table,
  TableActions,
  TableRow,
  TableRows,
  DeleteIcon,
  ViewIcon,
  AddIcon,
} from "../../common";
import { mutateUserWeight } from "../../hooks/useUser";
import type { User } from "../../types";
import {
  mutateProcessedLogs,
  deleteLogData,
  getMarkersFromProcessedData,
} from "../../hooks";
import { UserLogChart } from "../UserLogChart";
import type { Marker } from "../../graphs";
import { logDebug } from "../../utils";

export const ListLogItems: React.FC<{ user: User }> = ({ user }) => {
  const allDataForUser = useData({ user: user.name });
  const updateUserWeight = mutateUserWeight(user.name);
  const markAsProcessed = markAsProcessedLogData(user.name);
  const addProcessedLog = mutateProcessedLogs(user.name, (log) => {
    markAsProcessed.mutate(log.logId);
  });
  // const addProcessedLog = mutateReport(user.name);
  const deleteLog = deleteLogData(user.name);
  // const mutateWeight = mutateReportWeight(user.name);
  const [markers, setExtra] = React.useState<Marker[]>();

  if (!allDataForUser) {
    return <Loading />;
  }

  console.log("[User Logs] All session data: ", allDataForUser);
  console.log("[User Logs] User:", user);

  let rows: TableRows = [];

  const columns = [
    // { name: "Id", align: "left" },
    { name: "Date", align: "left" },
    // { name: "Type", align: "right" },
    { name: "Processed", align: "right" },
  ];

  // display all logs in order
  // with newist at the bottom
  allDataForUser.sort((a, b) => {
    const aTime = get(a, "created.seconds");
    const bTime = get(b, "created.seconds");
    return bTime - aTime;
  });

  rows = allDataForUser.reduce((result, userLog) => {
    // don't show data without the right fields
    if (!userLog.data || !userLog.created) {
      return result;
    }

    const newRow: TableRow[] = [
      { data: userLog.created.date },
      { data: userLog.isProcessed ? "Yes" : "No" },
    ];

    return [...result, newRow];
  }, rows);

  const actions: TableActions = [
    {
      name: "Delete",
      action: async (rowId) => {
        // console.log("Delete:", rows[rowId]);
        deleteLog.mutate(allDataForUser[rowId]._id);
      },
      renderIcon: () => <DeleteIcon />,
    },
    {
      name: "Transfer",
      action: async (rowId) => {
        console.log("Transfer log:", rows[rowId]);
      },
      renderIcon: () => <div>T</div>,
    },
    {
      name: "Test",
      action: async (rowId) => {
        const row = allDataForUser[rowId as number];
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
      renderIcon: () => <ViewIcon />,
    },
    {
      name: "Process",
      renderIcon: () => <AddIcon />,
      action: async (id) => {
        const row = allDataForUser[id as number];
        // console.log("Row:", row);

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

          report: result.report,
        });

        // if we have a newer weight than that previous one, let's update it
        if (result.weight) {
          if (row.created.seconds > (user.weightLastUpdated || 0)) {
            updateUserWeight.mutate({
              ...user,
              weight: result.weight,
              weightLastUpdated: row.created.seconds,
            });
          }
        }

        setExtra(result.report.items[0].markers);
      },
    },
  ];

  return (
    <Table
      actions={actions}
      columns={columns}
      data={rows}
      options={{
        expandable: true,
        expandableContent: (tableRow, rowIndex) => {
          const rawRow = allDataForUser[rowIndex];

          return (
            <UserLogChart
              user={rawRow.user}
              logId={rawRow._id}
              data={rawRow}
              extras={markers}
            />
          );
        },
      }}
      // handleRowClick={handleRowClick}
    />
  );
  // return <List rows={rows} actions={actions} extra={extra} />;
};
