import React from "react";

import { Text } from "../common";
import { GroupGraphUser } from "../graphs/groups";
import { useReport } from "../hooks/useReports";

const UserGraph = () => {
  const [data] = React.useState([]);
  // const mutatePullups = mutateReportPullups("adam");

  const { data: reportData } = useReport("adam", "weight");
  console.log("reportData", reportData);

  React.useEffect(() => {
    // mutatePullups.mutate({
    //   count: 0,
    // });
  }, []);

  return <GroupGraphUser data={data} />;
};

export const Dashboard = () => {
  return (
    <>
      <Text>Overview</Text>

      <div>
        <UserGraph />
      </div>
    </>
  );
};
