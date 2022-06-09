import * as React from "react";
import MaterialButton, { ButtonProps } from "@material-ui/core/Button";

export const Button: React.FC<
  React.PropsWithChildren<Partial<ButtonProps>>
> = ({ children, ...props }) => (
  <MaterialButton variant="contained" {...props}>
    {children}
  </MaterialButton>
);
