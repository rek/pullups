import React from "../../_snowpack/pkg/react.js";
import {useHistory} from "../../_snowpack/pkg/react-router-dom.js";
import {useSettings, useUsers, mutateSettings} from "../hooks/index.js";
import {
  Text,
  Table,
  LeftRightContainer,
  Title,
  Loading,
  ReportIcon,
  LogsIcon,
  AddIcon
} from "../common/index.js";
import {getShortDate} from "../utils.js";
export const Users = () => {
  const {data: users} = useUsers();
  const {data: settings} = useSettings();
  const updateSettings = mutateSettings();
  const history = useHistory();
  if (!users || !settings) {
    return /* @__PURE__ */ React.createElement(Loading, null);
  }
  if (users.length === 0) {
    return /* @__PURE__ */ React.createElement(Text, null, "No users yet.");
  }
  const columns = [
    {name: "Name", align: "left"},
    {name: "Weight", align: "right"},
    {name: "Weight updated", align: "right"}
  ];
  const data = users.map((user) => [
    {data: user.displayName ? user.displayName : user.name},
    {data: user.weight ? user.weight.toFixed(2) : ""},
    {data: getShortDate(user.weightLastUpdated)}
  ]);
  const handleRowClick = (row) => {
    history.push(`user/${users[row].name}/totals`);
  };
  const actions = [
    {
      name: "View Logs",
      action: (row) => {
        history.push(`user/${users[row].name}/logs`);
      },
      renderIcon: () => /* @__PURE__ */ React.createElement(LogsIcon, null)
    },
    {
      name: "Manage reports",
      action: (row) => {
        history.push(`user/${users[row].name}/reports`);
      },
      renderIcon: () => /* @__PURE__ */ React.createElement(ReportIcon, null)
    },
    {
      name: "Set active",
      action: (row) => {
        console.log(users[row].name);
        updateSettings.mutate({active: users[row].name});
      },
      renderIcon: () => /* @__PURE__ */ React.createElement(AddIcon, null)
    }
  ];
  const activeUser = settings ? settings.active : "";
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(LeftRightContainer, null, /* @__PURE__ */ React.createElement(Title, {
    title: "All users"
  }), /* @__PURE__ */ React.createElement(Text, null, "Active user: ", activeUser)), /* @__PURE__ */ React.createElement(Table, {
    actions,
    columns,
    data,
    handleRowClick
  }));
};
