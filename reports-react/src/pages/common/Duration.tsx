import React from "react";

export const Duration: React.FC<{ value?: number; total: number }> = ({
  value,
  total,
}) => {
  if (!value) {
    return null;
  }

  const calculatedDuration = value / total;

  return (
    <>
      <div>Duration: {value / 1000} s</div>
      <div>Calculated interval: {calculatedDuration.toFixed(2)}</div>
    </>
  );
};
