import React from "react";
import get from "lodash/get";

import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
// import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import MoreVertIcon from "@material-ui/icons/MoreVert";
import DeleteIcon from "@material-ui/icons/Delete";
import AddCircleOutline from "@material-ui/icons/AddCircleOutline";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import { UserChart } from "../UserLineGraph";
import type { Action } from "./List";
import type { XY, UserLog } from "../../types";

const useRowStyles = makeStyles({
  menu: {
    ".MuiSvgIcon-root": {
      // not working
      paddingRight: "6px",
    },
  },
  root: {
    "& > *": {
      borderBottom: "unset",
    },
    "&:hover": {
      backgroundColor: "#777",
    },
  },
});

export interface RowProps extends UserLog {
  id: number;
  markers: XY[];
  processed?: boolean;
}
function Row({ row, actions }: { row: RowProps; actions?: Action[] }) {
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
    if (actions) {
      const selectedAction = actions.find((action) => {
        return action.name === "delete";
      });
      if (selectedAction) {
        selectedAction.action(row.id);
      }
    }
    handleClose();
  };

  const handleProcess = () => {
    if (actions) {
      const selectedAction = actions.find((action) => {
        return action.name === "process";
      });
      if (selectedAction) {
        selectedAction.action(row.id);
      }
    }
    handleClose();
  };

  return (
    <React.Fragment>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        className={classes.menu}
      >
        {!row.processed && (
          <MenuItem onClick={handleProcess}>
            <AddCircleOutline />
            Process
          </MenuItem>
        )}
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
          {row.created.date}
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

export { Row };
