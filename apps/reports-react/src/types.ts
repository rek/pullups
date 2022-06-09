import type { LogReport } from "detect-pullups";
import { Log } from "database/src/service/logs/types";

// =====================
//
//   Logs - raw
//
// =====================

export type UserLog = Log & UserInfo;

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

// deprecated
export interface ProcessedLogV1 {
  format: 1;
  logId: string;
  created: number;
  processed: number; // processed date
  weight: number;
  report: LogReport;
}
export type ProcessedLog = ProcessedLogV1; // deprecated

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
export interface DateObject {
  seconds: number;
  date: string;
}
