// =====================
//
//   Logs
//
// =====================

export type UserLog = Log & UserInfo;
export interface Log {
  data: number[]; // this is the raw log data
  start: string; // start time??
  type: string; // pullup, weight, scale
  weight: number; // the weight when you did this
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
export interface ProcessedLog {
  logId: string;
  created: number;
  processed: number; // processed date
  weight: number;
}

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
