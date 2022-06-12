import dayjs from "dayjs"
import * as React from "react"

import type { XY } from "../../types"
import { Bar } from "../bar"

interface Props {
  data: XY[];
}
export const BarWeight: React.FC<Props> = ({ data }) => {
  return (
    <Bar
      data={data}
      yLabel="Weight (kg)"
      tooltip={(datum) => {
        const tip = [`Date: ${dayjs(datum.x).format("ddd D/MM/YY ha")}`]
        if (datum.y) {
          tip.unshift(`Weight: ${datum.y.toFixed(1)} kgs`)
        }
        return tip
      }}
    />
  )
}
