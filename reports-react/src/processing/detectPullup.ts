import type { Line } from "./types";

import { detectWeight } from "./detectWeight";
import { flatThenSpike, peakDipGroups } from "./algorithms";

/*
 * Algorithm
 *
 * - detect up after flat
 * - is it close to body weight (10%) <- this stops random fluctuations
 *
 */
export const detectPullup = async (line: Line, weight?: number) => {
  const bodyWeight = weight || detectWeight(line);
  console.log("Body weight found:", bodyWeight);

  const algo1 = flatThenSpike(line, { bodyWeight });
  console.log("algo1", algo1);

  const algo2 = await peakDipGroups(line);
  console.log("algo2", algo2);

  return { algo1, algo2 };
};
