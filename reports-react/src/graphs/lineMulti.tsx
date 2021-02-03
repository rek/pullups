import React from "react";
import {VictoryChart, VictoryContainer, VictoryLine, VictoryTheme} from 'victory';
import {Loading} from "../common";

export interface LineMultiDataItem {
	x: number,
	y: number
}
export interface Props {
	config: {
		data: LineMultiDataItem[],
		name: string;
	}[]
}
export const LineMulti: React.FC<Props> = ({config}) => {
	if (!config) {
		return <Loading />
	}

	const theme = {
		...VictoryTheme.grayscale,
	}

	return (
		<div style={{padding: '20px', backgroundColor: '#777'}}>
			<VictoryChart
				theme={theme}
				height={200}
				width={1000}
				padding={{top: 5, bottom: 0, left: 100, right: 40}}
				containerComponent={
					<VictoryContainer
						responsive={false}
					/>
				}
			>
				{config.map(({data}) => {
					return (
						<VictoryLine
							style={{data: {stroke: "red"}}}
							data={data}
							samples={100}
							interpolation="natural"
						/>
					)
				})}
			</VictoryChart>
		</div>

	)
}