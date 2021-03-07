import type { Line } from "./types";

import { detectWeight } from "./detectWeight";
import { flatThenSpike } from "./algorithms";

/*
 * Algorithm
 *
 * - detect up after flat
 * - is it close to body weight (10%) <- this stops random fluctuations
 *
 */
export const detectPullup = (line: Line, weight?: number) => {
  const bodyWeight = weight || detectWeight(line);
  console.log("Body weight found:", bodyWeight);

  const algo1 = flatThenSpike(line, { bodyWeight });
  console.log("algo1", algo1);

  return algo1;
};
