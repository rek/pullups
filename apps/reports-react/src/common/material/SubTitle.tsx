import Typography from "@material-ui/core/Typography";
import * as React from "react";

export const SubTitle: React.FC<{ title: string }> = ({ title }) => {
  return (
    <Typography variant="h6" component="h4" gutterBottom>
      {title}
    </Typography>
  );
};
