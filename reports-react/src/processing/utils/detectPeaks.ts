import slayer from "slayer";
import type { XY } from "../../types";

import type { Line } from "../types";

export const detectPeaks = async (line: Line): Promise<XY[]> => {
  const peaks = await slayer({
    minPeakDistance: 10,
  }).fromArray(line);

  // console.log("peaks", peaks);

  return peaks;
};
