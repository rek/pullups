import React from "react"

import { Title } from "../../common"
import type { UserLog } from "../../types"
import { Duration } from "./Duration"

export const RawStats: React.FC<{ log: UserLog }> = ({ log }) => {
  // console.log('log', log)

  const hasStats = log.duration !== undefined

  if (!hasStats) {
    return null
  }

  return (
    <>
      <Title>Raw stats:</Title>
      <Duration value={log.duration} total={log.data.length} />
    </>
  )
}
