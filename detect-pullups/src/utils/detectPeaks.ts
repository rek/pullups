// import slayer from "slayer";
import type { Line, XY } from "../types";

const slayer = (_props: any) => ({fromArray: (out:any) => out})

export const detectPeaks = async (line: Line): Promise<XY[]> => {
  const peaks = await slayer({
    minPeakDistance: 10,
  }).fromArray(line);

  // console.log("peaks", peaks);

  return peaks;
};
