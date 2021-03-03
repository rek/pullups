import mean from "lodash/mean";

import type { Line } from "./types";
import {
  detectFlatSections,
  FlatSectionResult,
} from "./utils/detectFlatSections";

/*
 * Detect the weight of a person from a 'hanglog'
 */
export const detectWeight = (data: Line) => {
  const flats = detectFlatSections(data, 5);

  if (flats.length > 0) {
    if (flats.length === 1) {
      const firstFlatSection = flats[0];

      const average = mean(firstFlatSection.data);

      return average;
    } else {
      // if there are multiple.... then... ???
      // console.log(flats)

      // 1. first test, take the highest ?
      // const averages = flats.map((item) => mean(item.data))

      // 2. take the longest?
      const longest = flats.reduce(
        (longest, item) => {
          if (item.data.length > longest.data.length) {
            return item;
          }

          return longest;
        },
        <FlatSectionResult>{ data: [], start: 0, end: 0 }
      );

      return mean(longest.data);

      // 3. take the most common?
      // const averages = flats.map((item) => mean(item.data))
    }
  } else {
    return -1;
  }
};
