import React from 'react';
import {makeStyles, withStyles, createStyles, Theme} from '@material-ui/core/styles';
import MaterialTable from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell, {TableCellProps} from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import {useStyles} from './theme'

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: '#555',
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }),
)(TableCell);

const useRowStyles = makeStyles({
  rowRoot: {
    '& > *': {
      borderBottom: 'unset',
    },
    '&:hover': {
      backgroundColor: '#777',
    },
  }
});

interface RowProps {data: string, align?: TableCellProps['align']}
interface Props {
  columns: {name: string, align?: string}[];
  data: RowProps[][];
  handleRowClick?: (row: number) => void
}
export const Table: React.FC<Props> = ({columns, data, handleRowClick}) => {
  const classes = useStyles();
  const {rowRoot} = useRowStyles();

  const _handleRowClick = (row: number) => {
    if (handleRowClick) {
      return () => handleRowClick(row)
    }
  }

  return (
    <TableContainer component={Paper}>
      <MaterialTable className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            {columns.map(({name, align}) => (
              <StyledTableCell align={align as TableCellProps['align']}>{name}</StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index} className={rowRoot} onClick={_handleRowClick(index)}>
              {row.map((cell, index) => {
                if (index === 0) {
                  return (
                    <TableCell component="th" scope="row">
                      {cell.data}
                    </TableCell>
                  )
                }

                return (
                  <TableCell align="right">{cell.data}</TableCell>
                )
              })}
            </TableRow>
          ))}
        </TableBody>
      </MaterialTable>
    </TableContainer>
  );
}
