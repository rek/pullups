export type Line = number[];

export interface Pullup {
  ascending: {
    start: number;
    end: number;
  };
  descending?: {
    start: number;
    end: number;
  };
}
