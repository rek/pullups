import Typography from "@material-ui/core/Typography";
import * as React from "react";

export const Text: React.FC = ({ children }) => {
  return <Typography paragraph>{children}</Typography>;
};
