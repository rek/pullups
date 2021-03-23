import { ZScore } from "../zScore";

import { data } from "../../../../../reports-predict/src/training";

import { invertLine } from "../invertLine";

describe("zScore", () => {
  const [zero, one, two, three] = data;

  let lag: number = 7;
  let threshold: number = 4;
  let influence: number = 0;

  describe("case zero", () => {
    test("test - 1", async () => {
      const result = ZScore.calc(
        invertLine(zero[0]),
        lag,
        threshold,
        influence
      );
      expect(result.peakCount).toEqual(0);
    });
    test("test - 2", async () => {
      const result = ZScore.calc(
        invertLine(zero[1]),
        lag,
        threshold,
        influence
      );
      expect(result.peakCount).toEqual(0);
    });
    test("test - 3", async () => {
      const result = ZScore.calc(
        invertLine(zero[2]),
        lag,
        threshold,
        influence
      );
      expect(result.peakCount).toEqual(0);
    });
  });

  describe("case one", () => {
    test("test - 1", async () => {
      const result = ZScore.calc(invertLine(one[0]), lag, threshold, influence);
      expect(result.peakCount).toEqual(1);
    });
    test("test - 2", async () => {
      const result = ZScore.calc(invertLine(one[1]), lag, threshold, influence);
      expect(result.peakCount).toEqual(1);
    });
    test("test - 3", async () => {
      const result = ZScore.calc(invertLine(one[2]), lag, threshold, influence);
      expect(result.peakCount).toEqual(1);
    });
    test("test - 4", async () => {
      const result = ZScore.calc(invertLine(one[3]), lag, threshold, influence);
      expect(result.peakCount).toEqual(1);
    });
  });

  describe("case two", () => {
    test("test: 1", async () => {
      const result = ZScore.calc(invertLine(two[0]), lag, threshold, influence);
      expect(result.peakCount).toEqual(2);
      // expect(result).toEqual([]);
    });
  });

  describe("case three", () => {
    test("test: 1", async () => {
      const result = ZScore.calc(
        invertLine(three[0]),
        lag,
        threshold,
        influence
      );
      expect(result.peakCount).toEqual(3);
    });
    test("test: 2", async () => {
      const result = ZScore.calc(
        invertLine(three[1]),
        lag,
        threshold,
        influence
      );
      expect(result.peakCount).toEqual(3);
    });
  });
});
