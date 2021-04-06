import type { Line, XY } from "../types";
export interface Result {
    dips: XY[];
    peaks: XY[];
}
interface Options {
    bodyWeight: number;
    devation?: number;
}
export declare const peakDipGroups: (line: Line, { bodyWeight, devation }: Options) => Promise<Result>;
export {};
