import { isValidBodyWeight } from "../isValidBodyWeight";

describe("isValidBodyWeight", () => {
  test("valid case", () => {
    expect(isValidBodyWeight(50)).toBeTruthy();
  });
  test("invalid case", () => {
    // @ts-expect-error test bad case
    expect(isValidBodyWeight()).toBeFalsy();

    expect(isValidBodyWeight(0)).toBeFalsy();
    expect(isValidBodyWeight(-1)).toBeFalsy();
  });
});
