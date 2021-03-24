// =====================
//
//   Logs - raw
//
// =====================

export type UserLog = Log & UserInfo;
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

// =====================
//
//   Processed Logs
//
// =====================
// export interface BaseProcessedObject {
//   logId: string;
//   created: string;
//   weight: number;
// }
export enum MarkerType {
  "start" = "start",
  "peak" = "peak",
  "dip" = "dip",
}
export interface Marker {
  type: MarkerType;
  x: number;
}
export interface PullupReport {
  quailty?: number;
  confidence: number;
  force?: number;
  pressureChange?: number;
  markers?: Marker[];
}
export interface LogReport {
  pullupCount: number;
  items: PullupReport[];
}

export interface ProcessedLogV1 {
  format: 1;
  logId: string;
  created: number;
  processed: number; // processed date
  weight: number;
  report: LogReport;
}
export type ProcessedLog = ProcessedLogV1;

// export interface ProcessedPulluptLog extends BaseProcessedObject {
//   count: number;
// }

// export interface ProcessedWeightLog extends BaseProcessedObject {
//   weight: number;
// }

// =====================
//
//   Users
//
// =====================
export interface UserInfo {
  _id: string;
  user: string;
}

export interface UserRecord {
  logs: Log[];
  active: boolean;
  pullups: number;
}
export interface User {
  active: boolean;
  id: number;
  name: string;
  displayName?: string;
  weight?: number;
  weightLastUpdated?: number;
}

// =====================
//
//   Reports
//
// =====================

// a custom report added by a user to their page
export interface UserReport {
  type: string; // eg: bar, BarWeight, chart
  name: string; // eg: Weight
  fields: string[];
}
export interface ReportData {
  date: DateObject;
  value: number;
}

export type XY = {
  x: number;
  y?: number;
};

// =====================
//
//   Misc
//
// =====================
interface DateObject {
  seconds: number;
  date: string;
}
