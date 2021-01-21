import React from "react";

import type {Log} from "../types";
import {Line} from "../graphs/line";
import {useData} from "../hooks/useData";

export const UserCharts = () => {
	const data = useData()
	const [formattedData, setFormattedData] = React.useState<{x: number, y: number}[]>([])
	// console.log(data, 'data')

	const convertDataIntoLine = (log: Log) => {
		const result = log.data.map((value, index) => {
			return {x: index, y: value}
		})
		// console.log(result, 'result')

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
		<Line data={formattedData} />
	)
}