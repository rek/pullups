import type { Line } from "../types";

import { detectFirstAscendingFromPoint, detectFlatSections } from "../utils";

interface Options {
  bodyWeight: number;
  deviation?: number;
  minLength?: number;
}
export const flatThenSpike = (
  line: Line,
  { bodyWeight, deviation = 0.9, minLength = 3 }: Options
) => {
  const segments: Line[] = [];
  const flats = detectFlatSections(line, 5);
  console.log("Detected flats:", flats, { minLength });

  flats
    .filter((flat) => flat.data.length > minLength)
    .forEach((flat) => {
      const currentPotentialPullup = detectFirstAscendingFromPoint(
        line,
        flat.end
      );

      // console.log("currentPotentialPullup", currentPotentialPullup);
      if (currentPotentialPullup[0] > bodyWeight * deviation) {
        segments.push(currentPotentialPullup);
      }
    });

  return segments;
};
