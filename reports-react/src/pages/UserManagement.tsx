import React from "react";

import Typography from '@material-ui/core/Typography';

import {useUsers} from '../hooks/useUsers'
import {Loading} from "../common/loading";

export const UserManagement = () => {
  const {data: users} = useUsers()
  console.log('Users:', users)
  const currentUser = ''

  if (!users) {
    return <Loading />
  }

  return (
    <Typography paragraph>
      Current user: {currentUser}

      <Typography paragraph>
        {users.length === 0 ?
          'No users yet.' : 'All users:'
        }
      </Typography>

      {users.length > 0 && users.map((user: string) => {
        return <div>{user}</div>
      })}

    </Typography>
  )
}
