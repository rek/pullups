import type { Line } from "../types";
interface Options {
    bodyWeight: number;
    deviation?: number;
    minLength?: number;
}
export declare const flatThenSpike: (line: Line, { bodyWeight, deviation, minLength }: Options) => Line[];
export {};
