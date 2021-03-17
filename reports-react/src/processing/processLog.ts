import type { Line } from "./types";
import { detectPullup } from "./detectPullup";
import { detectWeight } from "./detectWeight";
import { colours } from "../styles/colours";
import { LogReport, MarkerType } from "../types";

export const processLogFromFirebase = (user: string, id: string) => {};

export const processLog = async (
  log: Line,
  fallbackWeight?: number
): Promise<{ report: LogReport; weight: number }> => {
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

  const markers = [...peakMarkers, ...dipMarkers];

  const items = pullups.algo1.data.map((pullup) => {
    console.log("Starting to process:", pullup);
    const polltime = 100; // ms
    const dataPoints = pullup.length;

    const pressureChange = pullup[pullup.length - 1] - pullup[0];

    console.log("pressureChange", pressureChange);

    return {
      confidence: 0.5, // is pullup
      force: -1,
      pressureChange: Number(pressureChange.toFixed(2)),

      markers: markers,
    };
  });
  console.log("results algo1:", items);

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
