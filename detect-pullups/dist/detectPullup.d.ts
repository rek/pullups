import type { Line } from "./types";
export declare const detectPullup: (line: Line, weight?: number | undefined) => Promise<{
    algo1: {
        count: number;
        data: Line[];
    };
    algo2: {
        count: number;
        data: import("./algorithms").Result;
    };
}>;
