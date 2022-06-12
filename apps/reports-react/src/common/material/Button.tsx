import MaterialButton, { ButtonProps } from "@material-ui/core/Button";
import * as React from "react";

export const Button: React.FC<
  React.PropsWithChildren<Partial<ButtonProps>>
> = ({ children, ...props }) => (
  <MaterialButton variant="contained" {...props}>
    {children}
  </MaterialButton>
);
