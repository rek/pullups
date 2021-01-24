import React from "react";
import {useRecoilValue} from "recoil";

import type {Log} from "../types";
import {Line} from "../graphs/line";
import {useData} from "../hooks/useData";
import {sessionState} from "../modules/session";

export const UserCharts = () => {
	const data = useData()
	const [formattedData, setFormattedData] = React.useState<{x: number, y: number}[]>([])

	const activeSession = useRecoilValue(sessionState);
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
			// console.log('loading new data', count)
			convertDataIntoLine(data[activeSession])
		}
	}, [data, activeSession])

	if (!data) {
		return null
	}

	return (
		<Line data={formattedData} />
	)
}