import * as React from "react";

import { Loading, Title } from "../common";
import { SingleReport } from "./reports/SingleReport";
import { ProvideUser } from "./common/ProvideUser";
import { useReportQuery } from "database";

export const UserReports: React.FC<{ user: string }> = ({ user }) => {
  const { data: reports, isLoading } = useReportQuery(user);

  if (isLoading) {
    return <Loading />;
  }

  if (!reports) {
    return <div>This user has no reports configured: {user}</div>;
  }

  // console.log("reports", reports);

  return (
    <>
      {reports.map((report) => (
        <SingleReport key={report.name} user={user} report={report} />
      ))}
    </>
  );
};

export const UserTotals = () => {
  /**
   * Inside a user:
   *
   * reports: [{
   *   category: 'pullups',
   *   name: 'Max strength',
   *   data: [{value, date}],
   * }, {
   *   category: 'scale',
   *   name: 'Weight history',
   *   data: [{value, date}],
   * }, {
   *   ... etc
   * }]
   *
   *
   */

  return (
    <ProvideUser>
      {({ user }) => {
        return (
          <>
            <Title title={`User: ${user.name || "unknown"}`} />
            <UserReports user={user.name} />
          </>
        );
      }}
    </ProvideUser>
  );
};
