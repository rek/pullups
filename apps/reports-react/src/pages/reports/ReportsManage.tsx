import { useReportsQuery } from "database";
import * as React from "react";

import { DeleteIcon, EditIcon, Table, TableActions, Title } from "../../common";
import { ProvideUser } from "../common/ProvideUser";

export const ReportsManage: React.FC<any> = ({ user }) => {
  const { data: reports } = useReportsQuery(user);

  if (!reports || reports.length === 0) {
    return <div>This user has no reports configured: {user}</div>;
  }

  const columns = [
    { name: "Name", align: "left" },
    { name: "Type", align: "right" },
    { name: "Fields", align: "right" },
  ];

  const data = reports.map((report) => [
    { data: report.name },
    { data: report.type },
    { data: report.fields.join(",") },
  ]);

  const actions: TableActions = [
    {
      name: "Delete",
      action: async (rowId) => {
        console.log("NOT IMPLEMENTED", rowId);
      },
      renderIcon: () => <DeleteIcon />,
    },
    {
      name: "Edit",
      action: async (rowId) => {
        console.log("NOT IMPLEMENTED", rowId);
      },
      renderIcon: () => <EditIcon />,
    },
  ];

  return (
    <>
      <Title>Reports for: {user}</Title>
      <Table columns={columns} data={data} actions={actions} />
    </>
  );
};

export const UserReportsManage = () => {
  return (
    <ProvideUser>
      {({ user }) => {
        return <ReportsManage user={user.name} />;
      }}
    </ProvideUser>
  );
};
