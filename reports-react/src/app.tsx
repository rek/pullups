import React from 'react'
import {
  RecoilRoot,
} from 'recoil';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import GridLayout from 'react-grid-layout';
import styled from 'styled-components'
import {QueryClient, QueryClientProvider} from 'react-query'

import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

import {Wrapper, NavBar} from './common'

import {Dashboard, Settings, UserCharts, UserManagement, UserSessions} from './pages'

/* background-color: grey; */
const Item = styled.div`
`

const Title = styled.div`
font-weight: 20px;
`
const queryClient = new QueryClient()

export const App = () => {
  // const height = 150
  // const layout = [
  //   {i: 'a', x: 0, y: 0, w: 10, h: 5},
  //   {i: 'b', x: 0, y: 0, w: 5, h: 5},
  //   {i: 'c', x: 0, y: 0, w: 5, h: 5}
  // ];

  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Wrapper>
            <NavBar>

              {/* <Title>User: adam</Title> */}

              {/**
              <GridLayout className="layout" layout={layout} cols={12} rowHeight={height} width={1200}>
              <Item key="a">
              <UserCharts />
                </Item>
                </GridLayout>
              */}

              <Switch>
                <Route path="/Users">
                  <UserSessions />
                </Route>
                <Route path="/UserManagement">
                  <UserManagement />
                </Route>
                <Route path="/Charts">
                  <UserCharts />
                </Route>
                <Route path="/Settings">
                  <Settings />
                </Route>
                <Route path="/Dashboard">
                  <Dashboard />
                </Route>
                <Redirect path="/" to='/Dashboard' />
              </Switch>
            </NavBar>

          </Wrapper>
        </Router>
      </QueryClientProvider>
    </RecoilRoot >
  )
}
