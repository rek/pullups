import React from "react";

import Typography from '@material-ui/core/Typography';

import {LineMulti, LineMultiDataItem} from '../graphs/lineMulti'

export const UserTotals = () => {
	const data: LineMultiDataItem[] = [{x: 1, y: 5}, {x: 1, y: 5}]

	return (
		<Typography paragraph>
			<LineMulti config={[{data, name: 'test'}]} />
		</Typography>
	)
}
