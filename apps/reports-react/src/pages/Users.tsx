import React from "react";
import { useHistory } from "react-router-dom";

import { useSettings, useUsers, mutateSettings } from "../hooks";
import {
  Text,
  Table,
  LeftRightContainer,
  Title,
  Loading,
  ReportIcon,
  LogsIcon,
  AddIcon,
} from "../common";
import { getShortDate } from "../utils";

export const Users: React.FC = () => {
  const { data: users } = useUsers();
  const { data: settings } = useSettings();
  const updateSettings = mutateSettings();
  // console.log("Users:", users);
  // console.log("Settings:", settings);

  const history = useHistory();

  if (!users || !settings) {
    return <Loading />;
  }

  if (users.length === 0) {
    return <Text>No users yet.</Text>;
  }

  const columns = [
    { name: "Name", align: "left" },
    { name: "Weight", align: "right" },
    { name: "Weight updated", align: "right" },
  ];
  const data = users.map((user) => [
    { data: user.displayName ? user.displayName : user.name },
    { data: user.weight ? user.weight.toFixed(2) : "" },
    { data: getShortDate(user.weightLastUpdated) },
  ]);

  const handleRowClick = (row: number) => {
    history.push(`user/${users[row].name}/totals`);
  };

  const actions = [
    {
      name: "View Logs",
      action: (row: number) => {
        history.push(`user/${users[row].name}/logs`);
      },
      renderIcon: () => <LogsIcon />,
    },
    {
      name: "Manage reports",
      action: (row: number) => {
        history.push(`user/${users[row].name}/reports`);
      },
      renderIcon: () => <ReportIcon />,
    },
    {
      name: "Set active",
      action: (row: number) => {
        console.log(users[row].name);
        updateSettings.mutate({ active: users[row].name });
      },
      renderIcon: () => <AddIcon />,
    },
  ];

  const activeUser = settings ? settings.active : "";

  return (
    <>
      <LeftRightContainer>
        <Title title="All users" />
        <Text>Active user: {activeUser}</Text>
      </LeftRightContainer>
      <Table
        actions={actions}
        columns={columns}
        data={data}
        handleRowClick={handleRowClick}
      />
    </>
  );
};
