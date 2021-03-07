export type Line = number[];

export type XY = {
  x: number;
  y: number;
}[];

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
