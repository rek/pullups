import data from "./fixtures/detectWeight";

import { detectWeight } from "../detectWeight";

it("get the right weight", () => {
  expect(detectWeight(data[0]).toFixed(2)).toEqual("94.83");
  expect(detectWeight(data[1]).toFixed(2)).toEqual("66.01");
  expect(detectWeight(data[2]).toFixed(2)).toEqual("95.45");
});

it("should fail gracefully", () => {
  expect(detectWeight([])).toEqual(-1);
  expect(detectWeight(data[3])).toEqual(-1);
});
