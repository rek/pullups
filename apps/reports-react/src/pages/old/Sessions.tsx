import dayjs from "dayjs"
import React from "react"

import { Loading } from "../../common"
import { useData } from "../../hooks/useData"
import { ListLogs } from "../logs"

// DEPRECATED, changed to user/logs now
export function Sessions() {
  const sessionData = useData({ user: "" }) // '' = all users

  if (!sessionData) {
    return <Loading />
  }

  console.log("sessionData", sessionData)

  let rows: any[] = []
  rows = sessionData.reduce(
    (result, { user, data, created, type, ...rest }, index) => {
      if (!data || !created) {
        return result
      }
      return [
        ...result,
        {
          id: index,
          date: created
            ? dayjs(created.seconds * 1000).format("D ddd MMM YYYY HH:mm:ss")
            : "unknown",
          user,
          type,
          data,
          processed: false,
          ...rest,
        },
      ]
    },
    rows
  )

  console.log("rows", rows)

  return <ListLogs />
  // return <List rows={rows} />;
}
