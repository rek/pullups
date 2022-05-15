export interface User {
  active: boolean;
  id: number;
  name: string;
  displayName?: string;
  weight?: number;
  displayWeight?: number;
  weightLastUpdated?: number;
}
