import React from "react";

import Typography from '@material-ui/core/Typography';

import {GroupGraphDemo} from '../graphs/groups'

export const Dashboard = () => {
  return (
    <>
      <Typography paragraph>
        Here will be dashboards of totals etc.
      </Typography>

      <div>
        <GroupGraphDemo />
      </div>
    </>

  )
}