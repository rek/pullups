import React from "react";
import get from "lodash/get";
import { useParams } from "react-router-dom";

import { useData } from "../hooks/useData";
import { Loading } from "../common";
import { Action, List, RowProps } from "./logs";
import { useUser } from "../hooks/useUser";
import type { User } from "../types";
// import { mutateReportPullups, mutateReportWeight } from "../hooks/useReports";
import { processLog } from "../processing/processLog";

const UserLogList: React.FC<{ user: User }> = ({ user }) => {
  const sessionData = useData({ user: user.name });
  // const mutatePullups = mutateReportPullups(user.name);
  // const mutateWeight = mutateReportWeight(user.name);
  const [extra, setExtra] = React.useState<any>();

  if (!sessionData) {
    return <Loading />;
  }

  console.log("All session data: ", sessionData);

  let rows: RowProps[] = [];

  rows = sessionData.reduce((result, item, index) => {
    if (!item.data || !item.created) {
      return result;
    }
    return [
      ...result,
      {
        id: index,
        markers: [],
        // processed: false,
        ...item,
      },
    ];
  }, rows);

  rows.sort((a, b) => {
    const aTime = get(a, "created.seconds");
    const bTime = get(b, "created.seconds");
    return aTime - bTime;
  });

  const actions: Action[] = [
    {
      name: "delete",
      action: async (id: number) => {
        console.log("Delete:", id);
      },
    },
    {
      name: "process",
      action: async (id: number) => {
        // console.log("Row:", rows[id]);
        const result = await processLog(rows[id].data);
        console.log("Processing result:", result);
        // rows[id].markers = result;
        setExtra(result);
      },
    },
  ];

  return <List rows={rows} actions={actions} extra={extra} />;
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

  return <UserLogList user={userData} />;
}
