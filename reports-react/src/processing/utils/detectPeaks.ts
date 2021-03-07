import slayer from "slayer";

import type { Line } from "../types";

export const detectPeaks = async (line: Line) => {
  const peaks = await slayer({
    minPeakDistance: 10,
  }).fromArray(line);

  // console.log("peaks", peaks);

  return peaks;
};
