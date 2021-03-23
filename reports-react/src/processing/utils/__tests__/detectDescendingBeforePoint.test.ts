import { detectDescendingBeforePoint } from "../detectDescendingBeforePoint";

import { line1 } from "./fixtures/dips";

describe("detectDescendingBeforePoint", () => {
  test("good case - 1", () => {
    const line1 = [2, 2, 2, 3, 4, 5, 6, 5, 4, 3];
    const result = detectDescendingBeforePoint(line1, 6, { returnValue: true });
    expect(result).toEqual(2);
  });

  test("good case - 2", () => {
    const line1 = [10, 12, 13, 12, 13, 14, 15, 16, 15, 14, 13];
    const result = detectDescendingBeforePoint(line1, 7, { returnValue: true });
    expect(result).toEqual(12);
  });

  test("good case - 3", () => {
    const line1 = [
      1.173733,
      1.452787,
      1.718159,
      2.169764,
      3.883277,
      8.005828,
      15.106757,
      26.430912,
      40.332012,
      54.82703,
      66.382942,
      71.381927,
      72.610893,
      72.005409,
      71.601181,
      72.185219,
      72.149323,
      70.893753,
      70.60997,
      73.094429,
      85.366898,
      95.019516,
    ];
    const result = detectDescendingBeforePoint(line1, 21, {
      returnValue: true,
    });
    expect(result).toEqual(70.893753);
  });
});
