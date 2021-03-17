import data from "./fixtures/detectWeight";

import { processLog } from "../processLog";

it("process simple case", async () => {
  const { report } = await processLog(data[0]);
  const { items } = report;
  expect(items[0]).toEqual([
    { confidence: 0.5, force: -1, pressureChange: "16.30" },
  ]);
});
