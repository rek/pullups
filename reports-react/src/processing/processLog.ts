import type { Line } from "./types";
import { detectPullup } from "./detectPullup";
import { detectWeight } from "./detectWeight";

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

export const processLog = async (log: Line) => {
  let type = "Unknown";
  const weight = detectWeight([...log]);
  // console.log("Starting to process log:", log);

  const pullups = await detectPullup(log, weight);
  console.log("Detected pullups:", pullups);

  if (pullups.algo1.count > 0 && pullups.algo2.count > 0) {
    type = "pullup";
  }

  if (type !== "pullup") {
    if (log.length > 20) {
      type = "weight";
    }
  }

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

  // if (results.length > 0) {
  //   type = "Pullup";
  // }

  return {
    // results,
    weight,
    type,
  };
};
