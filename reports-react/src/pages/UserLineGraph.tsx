import React from "react";
import {useRecoilValue} from "recoil";


import type {Log} from "../types";
import {Line} from "../graphs/line";
import {useData} from "../hooks/useData";
import {sessionState} from "../modules/session";
import {Loading} from "../common";

export const UserChartForActiveUser = () => {
	const activeSession = useRecoilValue(sessionState);
	return <UserChart sessionId={activeSession} user='adam' />
}

interface Props {
	sessionId: number,
	user: string,
}
export const UserChart: React.FC<Props> = ({sessionId, user}) => {
	const data = useData({user})
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
			// console.log('loading new data', count)
			convertDataIntoLine(data[sessionId])
		}
	}, [data, sessionId])

	if (!data) {
		return <Loading />
	}

	return (
		<Line data={formattedData} />
	)
}