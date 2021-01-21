import * as React from "react";
import styled from 'styled-components'

const LoadingWrapper = styled.div`
`

export const Loading: React.FC = () => {
	return (
		<LoadingWrapper>
			Loading...
		</LoadingWrapper>
	)
}
