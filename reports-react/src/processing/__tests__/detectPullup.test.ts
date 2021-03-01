import data from "./fixtures/detectWeight";

import { detectPullup } from "../detectPullup";

it("detect single pullup in good case", () => {
  expect(detectPullup(data[0])).toEqual([
    [94.87, 96.05, 96.42, 102.67, 111.17],
  ]);
});

it("detect even small ones!", () => {
  expect(detectPullup(data[1])).toEqual([[66.98], [66.12, 66.64]]);
});
