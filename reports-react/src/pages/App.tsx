import React from "react";
import { RecoilRoot } from "recoil";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
// import GridLayout from "react-grid-layout";
// import styled from "styled-components";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

import { Wrapper, Loading } from "../common";
import { Sidebar } from "./nav";
import {
  Dashboard,
  Settings,
  Users,
  // Sessions,
  UserTotals,
  UserLogs,
} from "../pages";

import { firebaseDoingAuth } from "../db";

/* background-color: grey; */
// const Item = styled.div`
// `
// const Title = styled.div`
// font-weight: 20px;
// `
const queryClient = new QueryClient();

export const App = () => {
  const [loading, setLoading] = React.useState(false);

  // const height = 150
  // const layout = [
  //   {i: 'a', x: 0, y: 0, w: 10, h: 5},
  //   {i: 'b', x: 0, y: 0, w: 5, h: 5},
  //   {i: 'c', x: 0, y: 0, w: 5, h: 5}
  // ];

  React.useEffect(() => {
    firebaseDoingAuth.then(() => {
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Wrapper>
            <Sidebar>
              {/**
              <GridLayout className="layout" layout={layout} cols={12} rowHeight={height} width={1200}>
              <Item key="a">
              <UserCharts />
                </Item>
                </GridLayout>
              */}

              <Switch>
                <Route path="/users">
                  <Users />
                </Route>
                <Route path="/user/:id/totals">
                  <UserTotals />
                </Route>
                <Route path="/user/:id/logs">
                  <UserLogs />
                </Route>
                {/* <Route path="/sessions">
                  <Sessions />
                </Route> */}
                <Route path="/settings">
                  <Settings />
                </Route>
                <Route path="/home">
                  <Dashboard />
                </Route>
                <Redirect path="/" to="/home" />
              </Switch>
            </Sidebar>
          </Wrapper>
        </Router>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </RecoilRoot>
  );
};
