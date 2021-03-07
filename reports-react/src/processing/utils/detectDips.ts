import max from "lodash/max";
import slayer from "slayer";

import type { Line, XY } from "../types";

export const detectDips = async (line: Line): Promise<XY> => {
  const lineMax = max(line) || 0;

  // invert the graph and then transpose it back upto positive values
  const invertedLine = line.map((point) => point * -1 + lineMax);
  // console.log("invertedLine", invertedLine);

  const invertedPeaks: XY = await slayer({
    minPeakDistance: 10,
  }).fromArray(invertedLine);
  // console.log("inverted peaks", invertedPeaks);

  // convert the dip back to the real number
  const dipsOnLine = invertedPeaks.map((dip) => ({ x: dip.x, y: line[dip.x] }));
  // console.log("dipsOnLine", dipsOnLine);

  return dipsOnLine;
};
