import type { Line } from "./types";
import { detectPullup } from "./detectPullup";
import { detectWeight } from "./detectWeight";
import { colours } from "../styles/colours";
import { LogReport, Marker, MarkerType, PullupReport } from "../types";
import { getMarkersForIndex } from "./utils/getMarkersForIndex";
import { isAmountWithinDeviation } from "./utils/isAmountWithinDeviation";

export const processLogFromFirebase = (user: string, id: string) => {};

type ProcessedLog = { report: LogReport; weight: number };
export const processLog = async (
  log: Line,
  fallbackWeight?: number
): Promise<ProcessedLog> => {
  // console.log("fallbackWeight", fallbackWeight);
  const weight = detectWeight([...log]);
  // console.log("Starting to process log:", { weight }, log);

  const pullups = await detectPullup(log, weight || fallbackWeight);
  // console.log("Detected pullups:", pullups);

  const dipMarkers = pullups.algo2.data.dips.map((data) => {
    return { ...data, stroke: colours.green, type: MarkerType.dip };
  });
  const peakMarkers = pullups.algo2.data.peaks
    .map((data) => {
      return { ...data, stroke: colours.red, type: MarkerType.peak };
    })
    .filter((peak) => {
      // clean off any bad peak markers
      // get, small things we found on a flat line,
      // or before full weight was on the bar
      // console.log("Checking peak is ok", { weight, y: peak.y });
      if (weight > 0) {
        const isBelow = (peak.y || 0) < weight;
        const peakIsCloseToBodyWeight = isAmountWithinDeviation(
          peak.y || 0,
          weight
        );
        const peakIsTooCloseToBodyWeightToBeLegit =
          !peakIsCloseToBodyWeight && !isBelow;

        return peakIsTooCloseToBodyWeightToBeLegit;
      } else {
        return true;
      }
    });

  // const markers = [...peakMarkers, ...dipMarkers];

  // detect flat, if found add next pullup?

  // detect marker groups, get pullup postion from that.
  let moreMarkers = true;
  let markerGroup = 0;
  const groups: Marker[][] = [];
  do {
    const group = getMarkersForIndex(peakMarkers, dipMarkers, markerGroup);
    if (group.length > 0) {
      groups.push(group);
      markerGroup += 1;
    } else {
      moreMarkers = false;
    }
  } while (moreMarkers);

  console.log("All marker groups:", groups);

  // ONLY WORKS IF THERE IS A FLAT:
  let algo1: PullupReport[] = pullups.algo1.data.map((pullup, index) => {
    // console.log("Starting to process:", pullup);
    const polltime = 100; // ms
    const dataPoints = pullup.length;

    const pressureChange = pullup[pullup.length - 1] - pullup[0];

    // console.log("pressureChange", pressureChange);

    return {
      confidence: 0.5, // is pullup
      force: -1,
      pressureChange: Number(pressureChange.toFixed(2)),

      markers: groups[index],
    };
  });

  let items = groups.map((markerGroup) => {
    return {
      confidence: 0,
      markers: markerGroup,
    };
  });

  // if no flat found, then work off the marks alone.

  // remove any groups that do not have markers
  items = items.filter((item) => item.markers && item.markers.length > 0);

  console.log("[Process Log] results:", items);

  // map markers into places to start and end pullup

  return {
    // pullupCount is a bit useless, but making an object here to extend later on
    report: {
      items,
      pullupCount: items.length,
    },
    weight,
  };
};
