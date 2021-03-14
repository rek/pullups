import data from "./fixtures/detectWeight";

import { processLog } from "../processLog";

it("process simple case", async () => {
  const { results } = await processLog(data[0]);
  expect(results).toEqual([
    { confidence: 0.5, force: -1, pressureChange: "16.30" },
  ]);
});
