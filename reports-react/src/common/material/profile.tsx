import * as React from "react";

import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import PersonIcon from "@material-ui/icons/Person";

interface Props {
  handleClick: () => void;
}
export const Profile: React.FC<Props> = ({ handleClick }) => {
  return (
    <div onClick={handleClick}>
      <Tooltip title="Current user name" aria-label="add">
        <IconButton>
          <PersonIcon color="secondary" />
        </IconButton>
      </Tooltip>
    </div>
  );
};
