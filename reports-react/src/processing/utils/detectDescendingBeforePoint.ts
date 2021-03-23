import forEachRight from "lodash/forEachRight";
import take from "lodash/take";
import last from "lodash/last";

import type { Line } from "../types";
import { getAverageOfLast } from "./getAverageOfLast";

export const detectDescendingBeforePoint = (
  data: Line,
  position: number,
  { deviation = 0, returnValue = false } = {}
) => {
  const fromPoint = take(data, position);

  let finished = -1;
  const windowSize = 2;
  const processedList: Line = [];
  forEachRight(fromPoint, (point, index) => {
    if (finished !== -1) {
      return;
    }

    if (processedList.length > windowSize) {
      // make sliding average range to compare against
      const average = getAverageOfLast(processedList, windowSize);
      // console.log("debug:", { processedList, average, point, index });

      if (point > average) {
        finished = index; // record the index we find the last entry
      } else {
        processedList.push(point);
      }
    } else {
      processedList.push(point);
    }
  });

  if (returnValue) {
    // console.log("Final processedList:", processedList);
    return last(processedList);
  }

  return finished; // index of position found
};
