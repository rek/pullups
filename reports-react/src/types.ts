export interface UserLog extends Log {
  user: string;
}
export interface Log {
  data: number[];
  start: string; // start time??
  type: string; // pullup, weight, scale
  weight: number; // the weight when you did this
  created: { seconds: number }; // date this data was created

  groups?: { x: number }[];
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
export interface Report {
  reportInfo: any;
  data: ReportData[];
  name: string;
}
export interface ReportData {
  date: { seconds: number };
  value: number;
}
