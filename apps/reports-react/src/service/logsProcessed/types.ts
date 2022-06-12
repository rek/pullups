import type { LogReport } from "detect-pullups"

export interface ProcessedLogV1 {
  format: 1;
  logId: string;
  created: number;
  processed: number; // processed date
  weight: number;
  report: LogReport;
}
export type ProcessedLog = ProcessedLogV1;
