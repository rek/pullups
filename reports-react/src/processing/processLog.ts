import type { Line } from "./types";
import { detectPullup } from "./detectPullup";
import { detectWeight } from "./detectWeight";
import { colours } from "../styles/colours";
import { LogReport, Marker, MarkerType, PullupReport } from "../types";
import { getMarkersForIndex } from "./utils/getMarkersForIndex";

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
  console.log("Detected pullups:", pullups);

  const dipMarkers = pullups.algo2.data.dips.map((data) => {
    return { ...data, stroke: colours.green, type: MarkerType.dip };
  });
  const peakMarkers = pullups.algo2.data.peaks.map((data) => {
    return { ...data, stroke: colours.red, type: MarkerType.peak };
  });

  // const markers = [...peakMarkers, ...dipMarkers];

  // ONLY WORKS IF THERE IS A FLAT:
  const items: PullupReport[] = pullups.algo1.data.map((pullup, index) => {
    console.log("Starting to process:", pullup);
    const polltime = 100; // ms
    const dataPoints = pullup.length;

    const pressureChange = pullup[pullup.length - 1] - pullup[0];

    console.log("pressureChange", pressureChange);

    return {
      confidence: 0.5, // is pullup
      force: -1,
      pressureChange: Number(pressureChange.toFixed(2)),

      markers: getMarkersForIndex(peakMarkers, dipMarkers, index),
    };
  });

  // if no flat found, then work off the marks alone.

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
