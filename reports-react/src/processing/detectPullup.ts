import type { Line } from "./types";

import { detectFlatSections } from "./utils/detectFlatSections";
import { detectWeight } from "./detectWeight";

import { detectFirstAscendingFromPoint } from "./utils/detectFirstAscendingFromPoint";

/*
 * Algorithm
 *
 * - detect up after flat
 * - is it close to body weight (10%) <- this stops random fluctuations
 *
 */
export const detectPullup = (data: Line) => {
  const segments: Line[] = [];

  const bodyWeight = detectWeight(data);
  console.log("Body weight found:", bodyWeight);

  const flats = detectFlatSections(data, 5);
  console.log("Detected flats:", flats);

  flats.forEach((flat) => {
    const currentPotentialPullup = detectFirstAscendingFromPoint(
      data,
      flat.end
    );

    // console.log("currentPotentialPullup", currentPotentialPullup);
    if (currentPotentialPullup[0] > bodyWeight * 0.9) {
      segments.push(currentPotentialPullup);
    }
  });

  return segments;
};
