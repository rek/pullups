import React from "../../../_snowpack/pkg/react.js";
import {
  makeStyles,
  withStyles,
  createStyles
} from "../../../_snowpack/pkg/@material-ui/core/styles.js";
import Box from "../../../_snowpack/pkg/@material-ui/core/Box.js";
import Collapse from "../../../_snowpack/pkg/@material-ui/core/Collapse.js";
import MaterialTable from "../../../_snowpack/pkg/@material-ui/core/Table.js";
import TableBody from "../../../_snowpack/pkg/@material-ui/core/TableBody.js";
import TableCell from "../../../_snowpack/pkg/@material-ui/core/TableCell.js";
import TableContainer from "../../../_snowpack/pkg/@material-ui/core/TableContainer.js";
import TableHead from "../../../_snowpack/pkg/@material-ui/core/TableHead.js";
import TableRow from "../../../_snowpack/pkg/@material-ui/core/TableRow.js";
import Paper from "../../../_snowpack/pkg/@material-ui/core/Paper.js";
import IconButton from "../../../_snowpack/pkg/@material-ui/core/IconButton.js";
import {KeyboardArrowDownIcon, KeyboardArrowRightIcon} from "./icons.js";
import {useStyles} from "./theme.js";
import {IsolatedMenu} from "./IsolatedMenu.js";
const StyledTableCell = withStyles((theme) => createStyles({
  head: {
    backgroundColor: "#555",
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);
const useRowStyles = makeStyles({
  rowRoot: {
    "& > *": {
      borderBottom: "unset"
    },
    "&:hover": {
      backgroundColor: "#777"
    }
  }
});
export const Table = ({
  columns,
  data,
  handleRowClick,
  actions = [],
  options = {expandable: false}
}) => {
  const classes = useStyles();
  const {rowRoot} = useRowStyles();
  const [openRows, setOpenRows] = React.useState({});
  const _handleRowClick = (row) => {
    if (handleRowClick) {
      return () => handleRowClick(row);
    }
  };
  const toggleRow = (row) => {
    setOpenRows({
      ...openRows,
      [row]: openRows[row] === void 0 ? true : !openRows[row]
    });
  };
  return /* @__PURE__ */ React.createElement(TableContainer, {
    component: Paper
  }, /* @__PURE__ */ React.createElement(MaterialTable, {
    className: classes.table,
    "aria-label": "simple table"
  }, /* @__PURE__ */ React.createElement(TableHead, null, /* @__PURE__ */ React.createElement(TableRow, null, options.expandable && /* @__PURE__ */ React.createElement(StyledTableCell, {
    align: "right"
  }), columns.map(({name, align}) => /* @__PURE__ */ React.createElement(StyledTableCell, {
    key: `head-cell-${name}`,
    align
  }, name)), actions && /* @__PURE__ */ React.createElement(StyledTableCell, {
    align: "right"
  }, "Action"))), /* @__PURE__ */ React.createElement(TableBody, null, data.map((row, rowIndex) => /* @__PURE__ */ React.createElement(React.Fragment, {
    key: `row-${rowIndex}`
  }, /* @__PURE__ */ React.createElement(TableRow, {
    className: rowRoot,
    onClick: _handleRowClick(rowIndex)
  }, /* @__PURE__ */ React.createElement(React.Fragment, null, options.expandable && /* @__PURE__ */ React.createElement(TableCell, null, /* @__PURE__ */ React.createElement(IconButton, {
    "aria-label": "expand row",
    size: "small",
    onClick: () => toggleRow(rowIndex)
  }, openRows[rowIndex] ? /* @__PURE__ */ React.createElement(KeyboardArrowDownIcon, null) : /* @__PURE__ */ React.createElement(KeyboardArrowRightIcon, null))), row.map((cell, index) => {
    if (index === 0) {
      return /* @__PURE__ */ React.createElement(TableCell, {
        key: `cell-${cell.id || index}`,
        component: "th",
        scope: "row"
      }, cell.data);
    }
    return /* @__PURE__ */ React.createElement(TableCell, {
      key: `cell-${cell.id || index}`,
      align: "right"
    }, cell.data);
  }), /* @__PURE__ */ React.createElement(IsolatedMenu, {
    key: `actions-${rowIndex}`,
    row: rowIndex,
    actions
  }))), options.expandable && /* @__PURE__ */ React.createElement(TableRow, {
    key: `row-expand-${rowIndex}`
  }, /* @__PURE__ */ React.createElement(TableCell, {
    style: {paddingBottom: 0, paddingTop: 0},
    colSpan: 6
  }, /* @__PURE__ */ React.createElement(Collapse, {
    in: openRows[rowIndex],
    timeout: "auto",
    unmountOnExit: true
  }, /* @__PURE__ */ React.createElement(Box, {
    margin: 1
  }, options.expandableContent && options.expandableContent(row, rowIndex))))))))));
};
