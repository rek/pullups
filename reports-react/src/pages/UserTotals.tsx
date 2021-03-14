import React from "react";
import get from "lodash/get";
import { useParams } from "react-router-dom";

import Typography from "@material-ui/core/Typography";

import { useProcessedLogsForUser, useReports, useUser } from "../hooks";
import {
  BarWeight,
  LineMulti,
  LineMultiDataItem,
  LineOnGraph,
} from "../graphs";
import { Loading, Title, SubTitle } from "../common";
import type { UserReport } from "../types";
interface SingleReportProps {
  user: string;
  report: UserReport;
}
export const SingleReport: React.FC<SingleReportProps> = ({ user, report }) => {
  const { data: reportData, isLoading } = useProcessedLogsForUser(user);

  if (isLoading) {
    return <Loading />;
  }

  if (!reportData || reportData.length === 0) {
    return <div>Missing data for this report</div>;
  }

  // console.log("data", reportData);
  const reportInfo = reportData;

  // const mappedData: LineOnGraph["data"] = [];
  const mappedData = reportInfo.map(({ created, ...rest }) => {
    // just one field for now!
    const yData = get(rest, report.fields[0]);
    // console.log("yData", yData);
    return { x: created, y: yData };
  });
  // console.log("mappedData", mappedData);

  const line1: LineOnGraph = {
    data: mappedData,
    name: "Weight",
  };

  const line2: LineOnGraph = {
    data: [],
    name: "Weight",
    color: "blue",
  };

  return (
    <div>
      <SubTitle title={report.name} />
      {report.type === "BarWeight" && <BarWeight data={mappedData} />}
      {/* <LineMulti config={[line1, line2]} labelX="Kgs" /> */}
    </div>
  );
};

export const UserReports: React.FC<{ user: string }> = ({ user }) => {
  const { data: reports } = useReports(user);

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
  const { id } = useParams<{ id: string }>();
  const { data: userData, isLoading } = useUser(id);

  // console.log('userData', userData)

  if (isLoading) {
    return <Loading />;
  }

  if (!userData) {
    return <div>This users data is missing: {id}</div>;
  }

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
    <>
      <Title title={`User: ${userData.name || "unknown"}`} />
      <UserReports user={userData.name} />
    </>
  );
};
