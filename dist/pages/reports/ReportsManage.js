import React from "../../../_snowpack/pkg/react.js";
import {Table, Title, DeleteIcon, EditIcon} from "../../common/index.js";
import {useReports} from "../../hooks/index.js";
import {ProvideUser} from "../common/ProvideUser.js";
export const ReportsManage = ({user}) => {
  const {data: reports} = useReports(user);
  if (!reports || reports.length === 0) {
    return /* @__PURE__ */ React.createElement("div", null, "This user has no reports configured: ", user);
  }
  const columns = [
    {name: "Name", align: "left"},
    {name: "Type", align: "right"},
    {name: "Fields", align: "right"}
  ];
  const data = reports.map((report) => [
    {data: report.name},
    {data: report.type},
    {data: report.fields.join(",")}
  ]);
  const actions = [
    {
      name: "Delete",
      action: async (rowId) => {
        console.log("NOT IMPLEMENTED", rowId);
      },
      renderIcon: () => /* @__PURE__ */ React.createElement(DeleteIcon, null)
    },
    {
      name: "Edit",
      action: async (rowId) => {
        console.log("NOT IMPLEMENTED", rowId);
      },
      renderIcon: () => /* @__PURE__ */ React.createElement(EditIcon, null)
    }
  ];
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Title, null, "Reports for: ", user), /* @__PURE__ */ React.createElement(Table, {
    columns,
    data,
    actions
  }));
};
export const UserReportsManage = () => {
  return /* @__PURE__ */ React.createElement(ProvideUser, null, ({user}) => {
    return /* @__PURE__ */ React.createElement(ReportsManage, {
      user: user.name
    });
  });
};
