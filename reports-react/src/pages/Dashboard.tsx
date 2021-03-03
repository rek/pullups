import React from "react";

import Typography from "@material-ui/core/Typography";

import { GroupGraphUser } from "../graphs/groups";
import { useReport, mutateReportPullups } from "../hooks/useReports";

const UserGraph = () => {
  const [data] = React.useState([]);
  const mutatePullups = mutateReportPullups("adam");

  // const { data: reportData } = useReport("adam");
  // console.log("reportData", reportData);

  React.useEffect(() => {
    mutatePullups.mutate(0);
  }, []);

  return <GroupGraphUser data={data} />;
};

export const Dashboard = () => {
  return (
    <>
      <Typography paragraph>Overview</Typography>

      <div>
        <UserGraph />
      </div>
    </>
  );
};
