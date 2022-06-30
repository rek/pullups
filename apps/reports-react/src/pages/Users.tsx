import {
  useLogsInvalidate,
  useSettingsMutate,
  useSettingsQuery,
  useUsers,
  useUsersInvalidate,
} from "database";
import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import {
  AddIcon,
  LeftRightContainer,
  Loading,
  LogsIcon,
  ReportIcon,
  Table,
  Text,
  Button,
  Title,
} from "../common";
import { getShortDate } from "../utils";

const Footer = styled.div`
  margin-top: 20px;
`;
const Wrapper = styled.div`
  overflow-x: auto;
  margin-right: auto;
  margin-left: auto;
  flex: 1;
`;

export const Users: React.FC = () => {
  const { data: users } = useUsers();
  const { data: settings } = useSettingsQuery();
  const { mutate: updateSettings } = useSettingsMutate();
  const invalidateUsers = useUsersInvalidate();
  const invalidateLogs = useLogsInvalidate(settings?.active);
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
    { name: "Name", align: "left", flex: 1 },
    { name: "Weight", align: "right", flex: 1 },
    { name: "Weight updated", align: "right", flex: 1 },
  ];
  const data = users.map((user) => [
    { data: user.displayName ? user.displayName : user.name },
    { data: user.weight ? user.weight.toFixed(2) : "" },
    { data: getShortDate(user.weightLastUpdated) },
  ]);

  const handleRowClick = (row: number) => {
    history.push(`user/${users[row].name}/totals`);
  };

  const handleRefreshClick = () => {
    invalidateLogs();
    invalidateUsers();
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
        updateSettings({ active: users[row].name });
      },
      renderIcon: () => <AddIcon />,
    },
  ];

  const activeUser = settings ? settings.active : "";

  return (
    <Wrapper>
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

      <Footer>
        <Button onClick={handleRefreshClick}>Refresh</Button>
      </Footer>
    </Wrapper>
  );
};
