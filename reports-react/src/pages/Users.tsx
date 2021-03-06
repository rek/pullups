import React from "react";
import { useHistory } from "react-router-dom";

import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

import { useSettings, useUsers, mutateSettings } from "../hooks";
import { Text, Table, LeftRightContainer, Title, Loading } from "../common";

export const Users = () => {
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

  const columns = [{ name: "Name", align: "left" }];
  const data = users.map((user) => [{ data: user.name }]);

  const handleRowClick = (row: number) => {
    history.push(`user/${users[row].name}/totals`);
  };

  const actions = [
    {
      name: "View Logs",
      action: (row: number) => {
        history.push(`user/${users[row].name}/logs`);
      },
      renderIcon: () => <LibraryBooksIcon />,
    },
    {
      name: "Set active",
      action: (row: number) => {
        console.log(users[row].name);
        updateSettings.mutate({ active: users[row].name });
      },
      renderIcon: () => <AddCircleOutlineIcon />,
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
