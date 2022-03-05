export declare type Line = number[];
export declare enum MarkerType {
    'start' = "start",
    'peak' = "peak",
    'dip' = "dip"
}
export interface Marker {
    type: MarkerType;
    x: number;
}
export interface PullupReport {
    quailty?: number;
    confidence: number;
    force?: number;
    pressureChange?: number;
    markers?: Marker[];
}
export interface LogReport {
    pullupCount: number;
    items: PullupReport[];
}
export declare type ProcessedLog = {
    report: LogReport;
    weight: number;
};
export declare type XY = {
    x: number;
    y?: number;
};
//# sourceMappingURL=types.d.ts.map