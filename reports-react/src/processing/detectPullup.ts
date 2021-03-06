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

  const flatThenSpikeData = flatThenSpike(line, { bodyWeight, minLength: 4 });
  const algo1 = { count: flatThenSpikeData.length, data: flatThenSpikeData };
  console.log("algo1", algo1);

  const peakDipGroupsData = await peakDipGroups(line, { bodyWeight });
  const algo2 = {
    count: peakDipGroupsData.dips.length,
    data: peakDipGroupsData,
  };
  console.log("algo2", algo2);

  return { algo1, algo2 };
};
