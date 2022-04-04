import { XY, DateObject } from "../../types";

export interface Log {
  data: number[]; // this is the raw log data
  start: string; // start time??
  type: string; // pullup, weight, scale
  weight: number; // the weight when you did this
  duration: number; // duration of the hang
  created: DateObject; // date this data was created
  isProcessed: boolean; // is processed flag

  groups?: XY[]; // ?
}
