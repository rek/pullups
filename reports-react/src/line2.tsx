import React from "react";
import {VictoryChart, VictoryLine} from 'victory';
import type {Log} from "./types";

import {useData} from "./useData";

export const Chart = () => {
  const data = useData()
  const [formattedData, setFormattedData] = React.useState<{x: number, y: number}[]>([])

  console.log(data, 'data')

  const convertDataIntoLine = (log: Log) => {
    let index = 1

    const result = log.data.map((value, index) => {
      return {x: index, y: value}
    })

    // [
    //   {x: 1, y: 2},
    //   {x: 2, y: 3},
    //   {x: 3, y: 5},
    //   {x: 4, y: 4},
    //   {x: 5, y: 6}
    // ]

    setFormattedData(result)
  }

  React.useEffect(() => {
    if (data) {
      convertDataIntoLine(data[0])
    }
  }, [data])

  console.log('formattedData', formattedData)

  if (!data) {
    return null
  }

  return (
    <VictoryChart>
      <VictoryLine
        data={formattedData}
      />
    </VictoryChart>
  )
}