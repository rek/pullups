import type { LogReport } from "detect-pullups";

export interface ProcessedLogs {
  processed: number;
  created: number;
  weight: number;
}
// format: 1
// logId: "lXY6oYQbEeTsgFtVbuum"
// processed: 1649308364830
// report: {items: Array(3), pullupCount: 3}
// weight: 94.212746

export interface ProcessedLogV1 {
  format: 1;
  logId: string;
  created: number;
  processed: number; // processed date
  weight: number;
  report: LogReport;
}
export type ProcessedLog = ProcessedLogV1; // deprecated
