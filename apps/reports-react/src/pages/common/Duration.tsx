import * as React from "react";

interface Props {
  value?: number;
  total: number;
}
export const Duration = ({ value, total }: Props) => {
  if (!value) {
    return null;
  }

  const calculatedDuration = value / total;

  return (
    <>
      <div>Duration: {value / 1000}s</div>
      <div>Calculated interval: {calculatedDuration.toFixed(2)}ms</div>
    </>
  );
};
