import * as React from "react";
import TextField, { TextFieldProps } from "@material-ui/core/TextField";

export const Input: React.FC<
  React.PropsWithChildren<Partial<TextFieldProps>>
> = ({ children, ...props }) => {
  return <TextField label="Input" variant="filled" {...props} />;
};
