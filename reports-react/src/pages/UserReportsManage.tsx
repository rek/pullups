import React from "react";
import { Table, Title } from "../common";
import { useReports } from "../hooks";
import { ProvideUser } from "./common/ProvideUser";

export const UserReportsList: React.FC<any> = ({ user }) => {
  const { data: reports } = useReports(user);

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

  return (
    <>
      <Title>Reports for: {user}</Title>
      <Table columns={columns} data={data} />
    </>
  );
};

export const UserReportsManage = () => {
  return (
    <ProvideUser>
      {({ user }) => {
        return <UserReportsList user={user.name} />;
      }}
    </ProvideUser>
  );
};
