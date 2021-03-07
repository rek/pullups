import { detectDips } from "../detectDips";

import { line1 } from "./fixtures/dips";

describe("should detectDips", () => {
  test("good case", async () => {
    const result = await detectDips(line1);
    expect(result).toEqual([
      { x: 0, y: 1 },
      { x: 24, y: 3 },
    ]);
  });
});
