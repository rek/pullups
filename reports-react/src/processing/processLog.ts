import type { Line } from "./types";
import { detectPullup } from "./detectPullup";
import { detectWeight } from "./detectWeight";
import { colours } from "../styles/colours";

interface PullupReport {
  // quailty: number;
  force: number;
  pressureChange: number;
}
interface Report {
  pullupCount: number;
  items: PullupReport[];
}

export const processLogFromFirebase = (user: string, id: string) => {};

export const processLog = async (log: Line, fallbackWeight?: number) => {
  const weight = detectWeight([...log]) || fallbackWeight;
  // console.log("Starting to process log:", log);

  const pullups = await detectPullup(log, weight);
  console.log("Detected pullups:", pullups);

  const results = pullups.algo1.data.map((pullup) => {
    console.log("Starting to process:", pullup);
    const polltime = 100; // ms
    const dataPoints = pullup.length;

    const pressureChange = pullup[pullup.length - 1] - pullup[0];

    console.log("pressureChange", pressureChange);

    return {
      confidence: 0.5, // is pullup
      force: -1,
      pressureChange: pressureChange.toFixed(2),
    };
  });
  console.log("results algo1:", results);

  const dipMarkers = pullups.algo2.data.dips.map((data) => {
    return { ...data, stroke: colours.green };
  });
  const peakMarkers = pullups.algo2.data.peaks.map((data) => {
    return { ...data, stroke: colours.red };
  });

  const markers = [...peakMarkers, ...dipMarkers];

  return {
    results,
    markers,
    weight,
  };
};
