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
  const weight = detectWeight(log);
  console.log("Starting to process log:", log);

  const pullups = await detectPullup(log, weight);
  console.log("Detected pullups:", pullups);

  const results = { pullups };

  // const results = pullups.map((pullup) => {
  //   console.log("Starting to process:", pullup);
  //   const polltime = 100; // ms
  //   const dataPoints = pullup.length;

  //   const pressureChange = pullup[pullup.length - 1] - pullup[0];

  //   console.log("pressureChange", pressureChange);

  //   return {
  //     force: -1,
  //     pressureChange: pressureChange.toFixed(2),
  //   };
  // });

  // if (results.length > 0) {
  //   type = "Pullup";
  // }

  return {
    results,
    weight,
    type,
  };
};
