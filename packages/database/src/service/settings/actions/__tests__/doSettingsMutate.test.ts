import { doSettingsMutate } from "../doSettingsMutate";
import {
  assertFails,
  assertSucceeds,
  initializeTestEnvironment,
  RulesTestEnvironment,
} from "@firebase/rules-unit-testing";

describe("doSettingsMutate", () => {
  let testEnv: RulesTestEnvironment;

  beforeAll(async () => {
    testEnv = await initializeTestEnvironment({
      projectId: "test",
      firestore: {
        rules: "",
        // rules: fs.readFileSync("firestore.rules", "utf8"),
        host: "localhost",
        port: 4001,
      },
    });
  });

  afterEach(() => {
    testEnv.clearFirestore(); // removes all test data
  });

  afterAll(() => {
    testEnv.cleanup(); // this causes the process to finish
  });

  it("doSettingsMutate", async () => {
    const aliceContext = testEnv.authenticatedContext("alice", {});

    const firestore = aliceContext.firestore();

    const mutate = doSettingsMutate(firestore, {
      active: "test",
    });

    await assertSucceeds(mutate);
  });
});
