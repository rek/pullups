import MaterialTooltip from "@material-ui/core/Tooltip";
import * as React from "react";

interface Props {
  label: string;
  title: string;
}
export const Tooltip: React.FC<Props> = ({ children, title, label }) => {
  if (!children) {
    return null;
  }

  return (
    <MaterialTooltip title={title} aria-label={label}>
      {/* @ts-expect-error bad children type */}
      {children}
    </MaterialTooltip>
  );
};
