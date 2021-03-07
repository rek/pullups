export interface UserLog extends Log {
  _id: string;
  user: string;
}
interface DateObject {
  seconds: number;
  date: string;
}
export interface Log {
  data: number[];
  start: string; // start time??
  type: string; // pullup, weight, scale
  weight: number; // the weight when you did this
  created: DateObject; // date this data was created

  groups?: XY[];
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
  date: DateObject;
  value: number;
}

export type XY = {
  x: number;
  y?: number;
};
