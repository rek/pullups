import type { Line } from "../types";
export declare type FlatSectionResult = {
    start: number;
    end: number;
    data: Line;
};
declare type FlatSectionResults = FlatSectionResult[];
export declare const detectFlatSections: (data: Line, windowSize?: number, allowedDeviation?: number | undefined) => FlatSectionResults;
export {};
//# sourceMappingURL=detectFlatSections.d.ts.map