import type { Line } from "./types";
import { detectPullup } from "./detectPullup";

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

export const processLog = (log: Line) => {
  let type = "Unknown";
  console.log("Starting to process log:", log);

  const pullups = detectPullup(log);
  console.log("Detected pullups:", pullups);

  const results = pullups.map((pullup) => {
    console.log("Starting to process:", pullup);
    const polltime = 100; // ms
    const dataPoints = pullup.length;

    const pressureChange = pullup[pullup.length - 1] - pullup[0];

    console.log("pressureChange", pressureChange);

    return {
      force: -1,
      pressureChange: pressureChange.toFixed(2),
    };
  });

  if (results.length > 0) {
    type = "Pullup";
  }

  return {
    results,
    type,
  };
};
