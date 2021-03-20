import compact from "lodash/compact";
import type { Marker } from "../../types";

export const getMarkersForIndex = (
  peakMarkers: Marker[],
  dipMarkers: Marker[],
  index: number
): Marker[] => {
  const indexMarkers = [
    peakMarkers[index],
    dipMarkers[index],
    peakMarkers[index * 2 + 1],
  ];

  const checkForMissingEntries = compact(indexMarkers);
  if (checkForMissingEntries.length === 3) {
    return checkForMissingEntries;
  }

  return [];
};
