import TextField, { TextFieldProps } from "@material-ui/core/TextField";
import * as React from "react";

export const Input: React.FC<
  React.PropsWithChildren<Partial<TextFieldProps>>
> = ({ children, ...props }) => {
  return <TextField variant="standard" {...props} />;
};
