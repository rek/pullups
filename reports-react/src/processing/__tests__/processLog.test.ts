import data from "./fixtures/detectWeight";

import { processLog } from "../processLog";

it("process simple case", () => {
  expect(processLog(data[0])).toEqual([{ force: 10, pressureChange: "16.30" }]);
});
