import React from "react";

import Typography from '@material-ui/core/Typography';

import {useUsers} from '../hooks/useUsers'
import {Loading} from "../common/loading";
import {Table} from "../common";

export const UserManagement = () => {
  const {data: users} = useUsers()
  console.log('Users:', users)

  if (!users) {
    return <Loading />
  }

  if (users.length === 0) {
    return (
      <Typography paragraph>
        No users yet.
      </Typography>
    )
  }

  const columns = [{name: 'Name', align: 'left'}, {name: 'Records', align: undefined}]
  const data = users.map((name) => ([{data: name}]))

  return (
    <Typography paragraph>
      <Table columns={columns} data={data} />
    </Typography>
  )
}
