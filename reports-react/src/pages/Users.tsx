import React from "react";

import Typography from '@material-ui/core/Typography';

import {useUsers} from '../hooks/useUsers'
import {Loading} from "../common";
import {Table} from "../common";

export const Users = () => {
  const {data: users} = useUsers()
  // console.log('Users:', users)

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

  const columns = [{name: 'Name', align: 'left'}, {name: 'Records', align: 'center'}]
  const data = users.map((name) => ([{data: name}, {data: 'N/A'}]))

  return (
    <Typography paragraph>
      <Table columns={columns} data={data} />
    </Typography>
  )
}
