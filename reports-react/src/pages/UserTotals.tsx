import React from "react";
import { useParams } from "react-router-dom";

import Typography from "@material-ui/core/Typography";

import { useUser } from "../hooks/useUser";
import { useReports } from "../hooks/useReports";
import { LineMulti, LineMultiDataItem, LineOnGraph } from "../graphs/lineMulti";
import { Loading, Title, SubTitle } from "../common";
import type { Report } from "../types";

export const SingleReport: React.FC<{ user: string; type: string }> = ({
  user,
}) => {
  const { data: reportData, isLoading } = useReports(user);

  if (isLoading) {
    return <Loading />;
  }

  if (!reportData) {
    return <div>Missing data for this report</div>;
  }

  // console.log('data', reportData.data)
  const reportInfo = reportData as Report;
  const mappedData = reportInfo.data.map(({ date, value }) => {
    return { x: new Date(date.seconds * 1000), y: value };
  });
  // console.log('mappedData', mappedData)

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
      <SubTitle title={reportData.name} />
      <LineMulti config={[line1, line2]} labelX="Kgs" />
    </div>
  );
};
export const UserTotals = () => {
  const { id } = useParams<{ id: string }>();
  const { data: userData, isLoading } = useUser(Number(id));

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
      <SingleReport user={userData.name} type="scale" />
    </Typography>
  );
};
