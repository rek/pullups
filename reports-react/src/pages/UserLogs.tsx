import React from "react";
import get from "lodash/get";
import { useParams } from "react-router-dom";

import { useData } from "../hooks/useData";
import {
  Loading,
  Table,
  TableActions,
  TableRow,
  TableRows,
  DeleteIcon,
  AddCircleOutlineIcon,
  Title,
} from "../common";
import { useUser } from "../hooks/useUser";
import type { User } from "../types";
import { mutateProcessedLogs, deleteLogData } from "../hooks";
import { processLog } from "../processing/processLog";
import { UserChart } from "./UserLineGraph";

const UserLogList: React.FC<{ user: User }> = ({ user }) => {
  const sessionData = useData({ user: user.name });
  const addProcessedLog = mutateProcessedLogs(user.name);
  // const addProcessedLog = mutateReport(user.name);
  const deleteLog = deleteLogData(user.name);
  // const mutateWeight = mutateReportWeight(user.name);
  const [extra, setExtra] = React.useState<any>();

  if (!sessionData) {
    return <Loading />;
  }

  console.log("All session data: ", sessionData);

  let rows: TableRows = [];

  const columns = [
    { name: "Id", align: "left" },
    { name: "Date", align: "center" },
    // { name: "Type", align: "right" },
    // { name: "Processed", align: "right" },
  ];

  // display all logs in order
  // with newist at the bottom
  sessionData.sort((a, b) => {
    const aTime = get(a, "created.seconds");
    const bTime = get(b, "created.seconds");
    return bTime - aTime;
  });

  rows = sessionData.reduce((result, userLog, index) => {
    // don't show data without the right fields
    if (!userLog.data || !userLog.created) {
      return result;
    }

    const newRow: TableRow[] = [
      { data: userLog._id },
      { data: userLog.created.date },
    ];

    return [...result, newRow];
  }, rows);

  const actions: TableActions = [
    {
      name: "Delete",
      action: async (rowId) => {
        // console.log("Delete:", rows[rowId]);
        deleteLog.mutate(sessionData[rowId]._id);
      },
      renderIcon: () => <DeleteIcon />,
    },
    {
      name: "Process",
      renderIcon: () => <AddCircleOutlineIcon />,
      action: async (id) => {
        const row = sessionData[id as number];
        // console.log("Row:", row);
        const result = await processLog(row.data);
        // console.log("Processing result:", result);
        addProcessedLog.mutate({
          logId: row._id,
          // count: result.results.pullups.algo1.count,
          weight: result.weight,
          created: row.created.seconds,
          processed: +new Date(),
        });
        setExtra(result);
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
        expandableContent: (row, rowIndex) => {
          return (
            <UserChart
              user={sessionData[rowIndex].user}
              data={sessionData[rowIndex]}
            />
          );
        },
      }}
      // handleRowClick={handleRowClick}
    />
  );

  // return <List rows={rows} actions={actions} extra={extra} />;
};

export function UserLogs() {
  const { id } = useParams<{ id: string }>();

  const { data: userData, isLoading } = useUser(id);

  if (isLoading) {
    return <Loading />;
  }

  if (!userData) {
    return <div>This users data is missing: {id}</div>;
  }

  return (
    <>
      <Title title={`User: ${userData.name || "unknown"}`} />
      <UserLogList user={userData} />
    </>
  );
}
