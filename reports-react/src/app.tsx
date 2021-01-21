import React from 'react'

import GridLayout from 'react-grid-layout';
import styled from 'styled-components'

import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

import {UserCharts} from './pages/UserCharts'

const Item = styled.div`
  /* background-color: grey; */
`

export const App = () => {
  const layout = [
    {i: 'a', x: 0, y: 0, w: 10, h: 5},
    {i: 'b', x: 0, y: 0, w: 5, h: 5},
    {i: 'c', x: 0, y: 0, w: 5, h: 5}
  ];

  const height = 150

  return (
    <div>
      <GridLayout className="layout" layout={layout} cols={12} rowHeight={height} width={1200}>
        <Item key="a">

          <UserCharts />
        </Item>
        {/* <Item key="b">b</Item> */}
        {/* <Item key="c">c</Item> */}
      </GridLayout>

    </div>
  )
}
