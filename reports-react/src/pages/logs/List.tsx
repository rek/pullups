import React from "react";
import dayjs from "dayjs";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell, { TableCellProps } from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
// import Typography from '@material-ui/core/Typography';
import Paper from "@material-ui/core/Paper";

import { Row, RowProps } from "./Row";

const columns = [
  { value: "Date", align: "left" },
  { value: "User", align: "right" },
  { value: "Type", align: "right" },
  { value: "Processed", align: "right" },
  { value: "", align: "right" },
];
export interface Action {
  name: string;
  action: (id: number) => void;
}
export function List({
  rows,
  actions,
  extra,
}: {
  rows: RowProps[];
  actions?: Action[];
  extra?: any;
}) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            {columns.map((column, index) => (
              <TableCell
                key={`columns-header-${index}`}
                align={column.align as TableCellProps["align"]}
              >
                {column.value}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <Row actions={actions} key={`session-data-${index}`} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
