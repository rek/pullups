import React from "react";
import { useParams } from "react-router-dom";

import Typography from "@material-ui/core/Typography";

import { useProcessedLogsForUser, useUser } from "../hooks";
import { Bar, LineMulti, LineMultiDataItem, LineOnGraph } from "../graphs";
import { Loading, Title, SubTitle } from "../common";
// import type { Report } from "../types";
export interface Report {
  reportInfo: any;
  data: ReportData[];
  name: string;
}
export interface ReportData {
  date: {
    seconds: number;
    date: string;
  };
  value: number;
}

export const SingleReport: React.FC<{ user: string; type: string }> = ({
  user,
}) => {
  // const { data: reportData, isLoading } = useReports(user);
  const { data: reportData, isLoading } = useProcessedLogsForUser(user);

  if (isLoading) {
    return <Loading />;
  }

  if (!reportData) {
    return <div>Missing data for this report</div>;
  }

  console.log("data", reportData);
  const reportInfo = reportData;
  const reportName = "Weight"; // fix
  // const mappedData: LineOnGraph["data"] = [];
  const mappedData = reportInfo.map(({ created, weight }) => {
    return { x: created, y: weight };
    // return { x: new Date(created), y: weight };
  });
  console.log("mappedData", mappedData);

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
      <SubTitle title={reportName} />
      <Bar data={mappedData} />
      {/* <LineMulti config={[line1, line2]} labelX="Kgs" /> */}
    </div>
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
    <Typography paragraph>
      <Title title={`User: ${userData.name || "unknown"}`} />
      <SingleReport user={userData.name} type="weight" />
    </Typography>
  );
};
