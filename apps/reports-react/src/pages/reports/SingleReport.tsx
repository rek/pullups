import React from "react";
import get from "lodash/get";

import { useProcessedLogsForUser } from "../../hooks";
import { BarWeight, LineOnGraph, Pullups } from "../../graphs";
import { Loading, SubTitle } from "../../common";
import type { UserReport } from "../../types";

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

  console.log("data", reportData);
  const reportInfo = reportData;

  // const mappedData: LineOnGraph["data"] = [];
  const mappedData = reportInfo
    .map(({ created, processed, ...rest }) => {
      // just one field for now!
      const yData = get(rest, report.fields[0]);
      // console.log("yData", yData);
      return { x: processed, y: yData };
    })
    .filter((item) => item.y);
  // console.log("mappedData", mappedData);

  // const line1: LineOnGraph = {
  //   data: mappedData,
  //   name: "Weight",
  // };

  // const line2: LineOnGraph = {
  //   data: [],
  //   name: "Weight",
  //   color: "blue",
  // };

  return (
    <div>
      <SubTitle title={report.name} />
      {report.type === "BarWeight" && <BarWeight data={mappedData} />}
      {report.type === "Pullups" && <Pullups data={mappedData} />}
      {/* <LineMulti config={[line1, line2]} labelX="Kgs" /> */}
    </div>
  );
};
