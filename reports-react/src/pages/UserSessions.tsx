import React from "react";

import type {Log} from "../types";
import {Line} from "../graphs/line";
import {useData} from "../hooks/useData";

import styled from 'styled-components'
import {Loading} from "../common/loading";

const Title = styled.div`
  font-weight: 800;
  padding: 10px 0;
`
const SessionItem = styled.div`
  padding: 20px;
  border: 1px solid;
  width: calc(1vw);
  :hover {
	background-color: grey;
  }
`
const SessionWrapper = styled.div`
  padding: 20px;
  margin: 20px;
`

export const UserSessions: React.FC = () => {
	const data = useData()

	console.log(data)

	if (!data) {
		return <Loading />
	}

	return (
		<SessionWrapper>
			<Title>Sessions</Title>
			{data.map((session, index) => {
				return (
					<SessionItem>
						{index}
					</SessionItem>
				)
			})}
		</SessionWrapper>
	)
}
