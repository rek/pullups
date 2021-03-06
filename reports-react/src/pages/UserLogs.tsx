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
import { UserLogChart } from "./UserLogChart";
import { UserName } from "../common/components/UserName";
import type { Marker } from "../graphs";

const UserLogList: React.FC<{ user: User }> = ({ user }) => {
  const allDataForUser = useData({ user: user.name });
  const addProcessedLog = mutateProcessedLogs(user.name);
  // const addProcessedLog = mutateReport(user.name);
  const deleteLog = deleteLogData(user.name);
  // const mutateWeight = mutateReportWeight(user.name);
  const [markers, setExtra] = React.useState<Marker[]>();

  if (!allDataForUser) {
    return <Loading />;
  }

  console.log("All session data: ", allDataForUser);

  let rows: TableRows = [];

  const columns = [
    // { name: "Id", align: "left" },
    { name: "Date", align: "center" },
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
      name: "Process",
      renderIcon: () => <AddCircleOutlineIcon />,
      action: async (id) => {
        const row = allDataForUser[id as number];
        // console.log("Row:", row);
        const result = await processLog(row.data);
        console.log("Processing result:", result);

        // addProcessedLog.mutate({
        //   logId: row._id,
        //   // count: result.results.pullups.algo1.count,
        //   weight: result.weight,
        //   created: row.created.seconds,
        //   processed: +new Date(),
        // });

        setExtra(result.markers);
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
            <UserLogChart
              user={allDataForUser[rowIndex].user}
              logId={allDataForUser[rowIndex]._id}
              data={allDataForUser[rowIndex]}
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
      <UserName name={userData.name} />
      <UserLogList user={userData} />
    </>
  );
}
