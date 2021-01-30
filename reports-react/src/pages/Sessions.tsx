import React from 'react';
import dayjs from 'dayjs'

import {makeStyles} from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell, {TableCellProps} from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';

import {useData} from "../hooks/useData";
import {Loading} from "../common";
import {UserChart} from './UserCharts'

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
    '&:hover': {
      backgroundColor: '#777',
    },
  }
});

interface RowProps {
  id: number,
  date: string,
  user: string,
  type: string,
  processed?: boolean,
  data: any[],
}
function Row(props: {row: RowProps}) {
  const {row} = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>

        <TableCell component="th" scope="row">
          {row.date}
        </TableCell>
        <TableCell align="right">{row.user}</TableCell>
        <TableCell align="right">{row.type}</TableCell>
        <TableCell align="right">{row.processed}</TableCell>
        <TableCell align="right"><PlayCircleFilledIcon /></TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              {/*
              <Typography variant="h6" gutterBottom component="div">
                Chart
              </Typography>
              */}
              <UserChart user={row.user} sessionId={row.id} />
              {/*
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    {columns.map(({name, align}) => {
                      return (
                        <TableCell key={name} align={align as TableCellProps['align']}>{name}</TableCell>
                      )
                    })}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.data.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.customerId}</TableCell>
                      <TableCell align="right">{historyRow.amount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              */}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment >
  );
}

const columns = [{value: 'Date', align: 'left'}, {value: 'User', align: 'right'}, {value: 'Type', align: 'right'}, {value: 'Processed', align: 'right'}, {value: 'Actions', align: 'right'}]
export function Sessions() {
  const user = 'adam'
  const sessionData = useData({user})

  if (!sessionData) {
    return <Loading />
  }

  const rows = sessionData.map(({data, created, type}, index) => {
    return {
      id: index,
      date: dayjs(created.seconds * 1000).format('D ddd MMM YYYY HH:mm:ss'),
      user,
      type,
      data,
      processed: false
    }
  })

  // console.log('rows', rows)

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            {columns.map((column, index) => (
              <TableCell key={`columns-header-${index}`} align={column.align as TableCellProps['align']}>{column.value}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <Row key={`session-data-${index}`} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
