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

export const processLog = (log: Line) => {
  const pullups = detectPullup(log);

  console.log("pullups", pullups);

  return pullups.map((pullup) => {
    const polltime = 100; // ms
    const dataPoints = pullup.length;

    const pressureChange = pullup[pullup.length - 1] - pullup[0];

    console.log("pressureChange", pressureChange);

    return {
      force: -1,
      pressureChange: pressureChange.toFixed(2),
    };
  });
};
