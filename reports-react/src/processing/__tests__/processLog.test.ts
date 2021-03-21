import data from "./fixtures/detectWeight";

import { processLog } from "../processLog";

it("process simple case", async () => {
  const { report } = await processLog(data[0]);
  const { items } = report;

  expect(items[0].confidence).toEqual(0.5)
  expect(items[0].force).toEqual(-1)
  expect(items[0].pressureChange).toEqual(16.3)
});
