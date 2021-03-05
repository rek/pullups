import React from "react";
import {
  makeStyles,
  withStyles,
  createStyles,
  Theme,
} from "@material-ui/core/styles";
import MaterialTable from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell, { TableCellProps } from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import { useStyles } from "./theme";
import { MenuAction, IsolatedMenu } from "./IsolatedMenu";

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: "#555",
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  })
)(TableCell);

const useRowStyles = makeStyles({
  rowRoot: {
    "& > *": {
      borderBottom: "unset",
    },
    "&:hover": {
      backgroundColor: "#777",
    },
  },
});

interface RowProps {
  id?: string;
  data: string;
  align?: TableCellProps["align"];
}
interface Props {
  columns: { name: string; align?: string }[];
  data: RowProps[][];
  handleRowClick?: (row: number) => void;
  actions?: MenuAction[];
}
export const Table: React.FC<Props> = ({
  columns,
  data,
  handleRowClick,
  actions = [],
}) => {
  const classes = useStyles();
  const { rowRoot } = useRowStyles();

  const _handleRowClick = (row: number) => {
    if (handleRowClick) {
      return () => handleRowClick(row);
    }
  };

  return (
    <TableContainer component={Paper}>
      <MaterialTable className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            {columns.map(({ name, align }) => (
              <StyledTableCell
                key={`head-cell-${name}`}
                align={align as TableCellProps["align"]}
              >
                {name}
              </StyledTableCell>
            ))}
            {actions && <StyledTableCell align="right">Action</StyledTableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, rowIndex) => (
            <TableRow
              key={`row-${rowIndex}`}
              className={rowRoot}
              onClick={_handleRowClick(rowIndex)}
            >
              <>
                {row.map((cell, index) => {
                  if (index === 0) {
                    return (
                      <TableCell
                        key={`cell-${cell.id}-${index}`}
                        component="th"
                        scope="row"
                      >
                        {cell.data}
                      </TableCell>
                    );
                  }
                  return (
                    <TableCell key={`cell-${cell.id}-${index}`} align="right">
                      {cell.data}
                    </TableCell>
                  );
                })}
                <IsolatedMenu row={rowIndex} actions={actions} />
              </>
            </TableRow>
          ))}
        </TableBody>
      </MaterialTable>
    </TableContainer>
  );
};
