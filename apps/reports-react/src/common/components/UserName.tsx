import capitalize from "lodash/capitalize"
import React from "react"

import { Title } from "../index"

export const UserName: React.FC<{ name: string }> = ({ name }) => {
  return <Title title={`User: ${capitalize(name) || "unknown"}`} />
}
