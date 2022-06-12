import * as React from "react";
// import GridLayout from "react-grid-layout";
// import styled from "styled-components";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { RecoilRoot } from "recoil";

// import "react-grid-layout/css/styles.css";
// import "react-resizable/css/styles.css";
import { Wrapper } from "../common";
import {
  Dashboard,
  ListLogs,
  Settings,
  UserReportsManage,
  Users,
  // Sessions,
  UserTotals,
} from ".";
import { Sidebar } from "./nav";

/* background-color: grey; */
// const Item = styled.div`
// `
// const Title = styled.div`
// font-weight: 20px;
// `
const queryClient = new QueryClient();

export const Authenticated = ({ logout }: { logout: () => void }) => {
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
            <Sidebar logout={logout}>
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
                  <ListLogs />
                </Route>
                <Route path="/user/:id/reports">
                  <UserReportsManage />
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
