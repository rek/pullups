import React from "react";
import { useHistory } from "react-router-dom";

import Typography from "@material-ui/core/Typography";
// import DeleteIcon from "@material-ui/icons/Delete";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";

import { useUsers } from "../hooks/useUsers";
import { Loading } from "../common";
import { Table } from "../common";

export const Users = () => {
  const { data: users } = useUsers();
  // console.log("Users:", users);

  const history = useHistory();

  if (!users) {
    return <Loading />;
  }

  if (users.length === 0) {
    return <Typography paragraph>No users yet.</Typography>;
  }

  const columns = [
    { name: "Name", align: "left" },
    { name: "Records", align: "center" },
  ];
  const data = users.map((user) => [{ data: user.name }, { data: "N/A" }]);

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
    // {
    //   name: "Delete",
    //   action: (row: number) => {
    //     console.log("Delete not possible:", row);
    //   },
    //   renderIcon: () => <DeleteIcon />,
    // },
  ];

  return (
    <>
      <Typography paragraph>All users</Typography>
      <Table
        actions={actions}
        columns={columns}
        data={data}
        handleRowClick={handleRowClick}
      />
    </>
  );
};
