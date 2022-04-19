import * as React from "react";

import { PersonIcon, Tooltip } from "../../common";
import IconButton from "@material-ui/core/IconButton";
import { useSettings } from "../../service/settings";

interface Props {
  handleClick: () => void;
}
export const Profile: React.FC<Props> = ({ handleClick }) => {
  const { data: settings } = useSettings();

  if (!settings) {
    return null;
  }

  return (
    <div onClick={handleClick}>
      <Tooltip title={settings.active} label="add">
        <IconButton>
          <PersonIcon color="secondary" />
        </IconButton>
      </Tooltip>
    </div>
  );
};
