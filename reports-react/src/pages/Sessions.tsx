import React from "react";
import dayjs from "dayjs";

import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell, { TableCellProps } from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
// import Typography from '@material-ui/core/Typography';
import Paper from "@material-ui/core/Paper";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
// import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import MoreVertIcon from "@material-ui/icons/MoreVert";
import DeleteIcon from "@material-ui/icons/Delete";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import { useData } from "../hooks/useData";
import { Loading } from "../common";
import { UserChart } from "./UserLineGraph";
import type { UserLog } from "../types";

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
    "&:hover": {
      backgroundColor: "#777",
    },
  },
});

interface RowProps extends UserLog {
  id: number;
  date: string;
  processed?: boolean;
}
function Row(props: { row: RowProps }) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    handleClose();
  };

  return (
    <React.Fragment>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleDelete}>
          <DeleteIcon />
          Delete
        </MenuItem>
      </Menu>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>

        <TableCell component="th" scope="row">
          {row.date}
        </TableCell>
        <TableCell align="right">{row.user}</TableCell>
        <TableCell align="right">{row.type}</TableCell>
        <TableCell align="right">{row.processed ? "yes" : "no"}</TableCell>
        <TableCell align="right">
          <Button
            aria-controls="user-session-menu"
            aria-haspopup="true"
            onClick={handleOpenMenu}
          >
            <MoreVertIcon />
          </Button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              {/*
              <Typography variant="h6" gutterBottom component="div">
                Chart
              </Typography>
              */}
              <UserChart user={row.user} data={row} />
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
    </React.Fragment>
  );
}

const columns = [
  { value: "Date", align: "left" },
  { value: "User", align: "right" },
  { value: "Type", align: "right" },
  { value: "Processed", align: "right" },
  { value: "", align: "right" },
];
export function Sessions() {
  const sessionData = useData({ user: "" }); // '' = all users

  if (!sessionData) {
    return <Loading />;
  }

  console.log("sessionData", sessionData);

  let rows: RowProps[] = [];
  // @ts-expect-error fix me
  rows = sessionData.reduce(
    // @ts-expect-error fix me
    (result, { user, data, created, type, ...rest }, index) => {
      if (!data || !created) {
        return result;
      }
      return [
        ...result,
        {
          id: index,
          date: created
            ? dayjs(created.seconds * 1000).format("D ddd MMM YYYY HH:mm:ss")
            : "unknown",
          user,
          type,
          data,
          processed: false,
          ...rest,
        },
      ];
    },
    rows
  );

  // console.log('rows', rows)

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
            <Row key={`session-data-${index}`} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
