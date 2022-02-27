import React from "../../_snowpack/pkg/react.js";
import {RecoilRoot} from "../../_snowpack/pkg/recoil.js";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "../../_snowpack/pkg/react-router-dom.js";
import {QueryClient, QueryClientProvider} from "../../_snowpack/pkg/react-query.js";
import {ReactQueryDevtools} from "../../_snowpack/pkg/react-query/devtools.js";
import "../../_snowpack/pkg/react-grid-layout/css/styles.css.proxy.js";
import "../../_snowpack/pkg/react-resizable/css/styles.css.proxy.js";
import {Wrapper, Loading} from "../common/index.js";
import {Sidebar} from "./nav/index.js";
import {
  Dashboard,
  Settings,
  Users,
  UserTotals,
  ListLogs,
  UserReportsManage
} from "./index.js";
import {firebaseDoingAuth} from "../db.js";
const queryClient = new QueryClient();
export const App = () => {
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    firebaseDoingAuth.then(() => {
      setLoading(false);
    }).catch((error) => {
      console.log("Firebase error:", error);
    });
  }, []);
  if (loading) {
    return /* @__PURE__ */ React.createElement(Loading, null);
  }
  return /* @__PURE__ */ React.createElement(RecoilRoot, null, /* @__PURE__ */ React.createElement(QueryClientProvider, {
    client: queryClient
  }, /* @__PURE__ */ React.createElement(Router, null, /* @__PURE__ */ React.createElement(Wrapper, null, /* @__PURE__ */ React.createElement(Sidebar, null, /* @__PURE__ */ React.createElement(Switch, null, /* @__PURE__ */ React.createElement(Route, {
    path: "/users"
  }, /* @__PURE__ */ React.createElement(Users, null)), /* @__PURE__ */ React.createElement(Route, {
    path: "/user/:id/totals"
  }, /* @__PURE__ */ React.createElement(UserTotals, null)), /* @__PURE__ */ React.createElement(Route, {
    path: "/user/:id/logs"
  }, /* @__PURE__ */ React.createElement(ListLogs, null)), /* @__PURE__ */ React.createElement(Route, {
    path: "/user/:id/reports"
  }, /* @__PURE__ */ React.createElement(UserReportsManage, null)), /* @__PURE__ */ React.createElement(Route, {
    path: "/settings"
  }, /* @__PURE__ */ React.createElement(Settings, null)), /* @__PURE__ */ React.createElement(Route, {
    path: "/home"
  }, /* @__PURE__ */ React.createElement(Dashboard, null)), /* @__PURE__ */ React.createElement(Redirect, {
    path: "/",
    to: "/home"
  }))))), /* @__PURE__ */ React.createElement(ReactQueryDevtools, {
    initialIsOpen: false
  })));
};
