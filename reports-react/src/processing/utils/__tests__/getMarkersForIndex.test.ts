import { Marker, MarkerType } from "../../../types";

import { getMarkersForIndex } from "../getMarkersForIndex";

describe("getMarkersForIndex", () => {
  test("empty case", async () => {
    const peaks: Marker[] = [];
    const dips: Marker[] = [];
    const index = 0;
    const result = getMarkersForIndex(peaks, dips, index);
    expect(result).toEqual([]);
  });

  test("good case", async () => {
    const peaks: Marker[] = [
      { type: MarkerType.peak, x: 1 },
      { type: MarkerType.peak, x: 4 },
    ];
    const dips: Marker[] = [
      { type: MarkerType.dip, x: 3 },
      { type: MarkerType.dip, x: 6 },
    ];
    const index = 0;
    const result = getMarkersForIndex(peaks, dips, index);
    expect(result).toEqual([
      {
        type: "peak",
        x: 1,
      },
      {
        type: "dip",
        x: 3,
      },
      {
        type: "peak",
        x: 4,
      },
    ]);
  });

  test("good case - double", async () => {
    const peaks: Marker[] = [
      { type: MarkerType.peak, x: 1 },
      { type: MarkerType.peak, x: 4 },
      { type: MarkerType.peak, x: 9 },
    ];
    const dips: Marker[] = [
      { type: MarkerType.dip, x: 3 },
      { type: MarkerType.dip, x: 6 },
    ];

    expect(getMarkersForIndex(peaks, dips, 0)).toEqual([
      {
        type: "peak",
        x: 1,
      },
      {
        type: "dip",
        x: 3,
      },
      {
        type: "peak",
        x: 4,
      },
    ]);

    expect(getMarkersForIndex(peaks, dips, 1)).toEqual([
      {
        type: "peak",
        x: 4,
      },
      {
        type: "dip",
        x: 6,
      },
      {
        type: "peak",
        x: 9,
      },
    ]);
  });

  test("bad case", async () => {
    const peaks: Marker[] = [{ type: MarkerType.peak, x: 1 }];
    const dips: Marker[] = [
      { type: MarkerType.dip, x: 3 },
      { type: MarkerType.dip, x: 6 },
    ];
    const index = 0;
    const result = getMarkersForIndex(peaks, dips, index);
    expect(result).toEqual([]);
  });
});
