import type { Line } from "../types";
interface Options {
    bodyWeight: number;
    deviation?: number;
    minLength?: number;
    flatLineAllowedDeviation?: number;
}
export declare const flatThenSpike: (line: Line, { bodyWeight, deviation, minLength, flatLineAllowedDeviation }: Options) => Line[];
export {};
//# sourceMappingURL=flatThenSpike.d.ts.map