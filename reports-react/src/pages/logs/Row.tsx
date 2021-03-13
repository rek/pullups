import React from "react";
import get from "lodash/get";

import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import Button from "@material-ui/core/Button";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
// import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import MoreVertIcon from "@material-ui/icons/MoreVert";
import DeleteIcon from "@material-ui/icons/Delete";
import AddCircleOutline from "@material-ui/icons/AddCircleOutline";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import { UserChart } from "../UserLineGraph";
// import type { Action } from "./List";
import type { XY, UserLog } from "../../types";
import type { TableActions } from "../../common";

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
function Row({ row, actions }: { row: RowProps; actions?: TableActions }) {
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  // console.log("Rendering row for:", row);

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
        x
        <TableCell component="th" scope="row">
          {row.created.date}
        </TableCell>
        <TableCell align="right">{row.user}</TableCell>
        <TableCell align="right">{row.id}</TableCell>
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
              <UserChart user={row.user} data={row} />
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export { Row };
