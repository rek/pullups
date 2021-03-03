import React from "react";

import Typography from "@material-ui/core/Typography";

import { GroupGraphUser } from "../graphs/groups";

const UserGraph = () => {
  const [data] = React.useState([]);

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
