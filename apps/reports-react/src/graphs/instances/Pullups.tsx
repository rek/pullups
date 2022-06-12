import dayjs from "dayjs";
import * as React from "react";

import type { XY } from "../../types";
import { Bar } from "../bar";

interface Props {
  data: XY[];
}
export const Pullups: React.FC<Props> = ({ data }) => {
  return (
    <Bar
      data={data}
      yLabel="Amount"
      tooltip={(datum) => {
        const tip = [`Date: ${dayjs(datum.x).format("ddd D/MM/YY ha")}`];
        if (datum.y) {
          tip.unshift(`Count: ${datum.y}`);
        }
        return tip;
      }}
    />
  );
};
