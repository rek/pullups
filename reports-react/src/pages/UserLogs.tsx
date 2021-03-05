import React from "react";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";

import { useData } from "../hooks/useData";
import { Loading } from "../common";
import { Action, List, RowProps } from "./logs";
import { useUser } from "../hooks/useUser";
import type { User } from "../types";
import { mutateReportPullups, mutateReportWeight } from "../hooks/useReports";
import { processLog } from "../processing/processLog";

const UserLogList: React.FC<{ user: User }> = ({ user }) => {
  const sessionData = useData({ user: user.name });
  const mutatePullups = mutateReportPullups(user.name);
  const mutateWeight = mutateReportWeight(user.name);

  if (!sessionData) {
    return <Loading />;
  }

  console.log("All session data: ", sessionData);

  let rows: RowProps[] = [];
  // @ts-expect-error fix me
  rows = sessionData.reduce(
    // @ts-expect-error fix me
    (result, { user, data, created, type, ...rest }, index) => {
      if (!data || !created) {
        return result;
      }
      return [
        ...result,
        {
          id: index,
          date: created
            ? dayjs(created.seconds * 1000).format("D ddd MMM YYYY HH:mm:ss")
            : "unknown",
          user,
          type,
          data,
          processed: false,
          ...rest,
        },
      ];
    },
    rows
  );

  const actions: Action[] = [
    {
      name: "process",
      action: (id: number) => {
        // console.log("Row:", rows[id]);
        const result = processLog(rows[id].data);
        console.log("Processing result:", result);
      },
    },
  ];

  return <List rows={rows} actions={actions} />;
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
