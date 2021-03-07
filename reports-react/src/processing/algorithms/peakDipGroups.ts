import { detectDips, detectPeaks } from "../utils";

import type { Line, XY } from "../types";

interface Result {
  dips: XY[];
  peaks: XY[];
}
export const peakDipGroups = async (line: Line) => {
  // let results: Result[] = [];

  const peaks = await detectPeaks(line);

  /*
   * need to remove the first and last in a clean graph
   * because those are the weight on and weight off the bar dips
   *
   * we are pretty safe to say that there will always be a weight off
   * (because that is also how we end the recording)
   * but not always to sure about a weight on
   * (perhaps it started recording late)
   */
  const dips = await detectDips(line);
  const cleanDips = [];
  if (dips.length > 2) {
    // remove first and last
    dips.slice(1, dips.length - 1).forEach((dip) => cleanDips.push(dip));
  } else {
    // assume late start timing,
    // eg: this starts with weight already on bar
    //     so no initial weight 'ramp up' (eg: from dip)
    cleanDips.push(dips[0]);
  }

  // console.log("peaks", peaks);
  // console.log("dips", cleanDips);

  return { dips, peaks };
};
