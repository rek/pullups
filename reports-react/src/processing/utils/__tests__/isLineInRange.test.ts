import { isLineInRange } from "../isLineInRange";
import { goodCases } from "./fixtures/flats";

const negativeCases = [
  [[1, 2, 3.1]],
  [[1, 2, 3]],
  [[0, 0, 3]],
  [[1, 1, 1, 4]],
  [[6, 5, 4, 4, 4]],
  [[-5, 5, 0]],
];

describe("should fail range", () => {
  test.each(negativeCases)("should detect non straight [%p]", (data) => {
    expect(isLineInRange(data)).toEqual(false);
  });
});

describe("should pass range", () => {
  test.each(goodCases)("should detect non straight [%p]", (data) => {
    expect(isLineInRange(data)).toEqual(true);
  });
});
