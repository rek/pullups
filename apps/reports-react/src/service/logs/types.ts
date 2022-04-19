import { XY, DateObject } from "../../types";

export interface DBLog {
  logs: number[];
  processed: boolean;
  created: string;
  pollTime: number;
  duration: number;
  weight: number; // NOT SURE IF THIS IS ACTUALLY IN THE DATA!!
}

// export interface Logx {
//   data: number[]; // this is the raw log data
//   start: string; // start time??
//   type: string; // pullup, weight, scale
//   weight: number; // the weight when you did this
//   duration: number; // duration of the hang
//   created: DateObject; // date this data was created
//   isProcessed: boolean; // is processed flag

//   groups?: XY[]; // ?
// }

export interface Log {
  _id: string;
  user: string;
  start: string;
  type: string; // pullup, weight, scale
  weight?: number; // the weight when you did this
  duration: number; // duration of the hang
  data: number[]; // this is the raw log data
  isProcessed: boolean;
  created: DateObject; // date this data was created
}
