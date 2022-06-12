// import detectWeightData from './fixtures/detectWeight';
import { data } from '../__fixtures/processLog';

import { processLog } from '../processLog';

describe('processLog', () => {
  const [zero, one, two, three, four] = data;

  describe('case zero', () => {
    test.each([zero])('should detect pullup count', async (data) => {
      const result = processLog(data);
      expect((await result).report.pullupCount).toEqual(0);
    });
  });

  describe('case one', () => {
    // test.each`
    //   a    | b    | expected
    //   ${1} | ${1} | ${2}
    //   ${1} | ${2} | ${3}
    //   ${2} | ${1} | ${3}
    // `("returns $expected when $a is added $b", ({ a, b, expected }) => {
    //   expect(a + b).toBe(expected);
    // });

    test.each([one])('should detect pullup count', async (data) => {
      const result = processLog(data);
      expect((await result).report.pullupCount).toEqual(1);
    });
  });

  describe('case two', () => {
    test.each([two])('should detect pullup count', async (data) => {
      const result = processLog(data);
      expect((await result).report.pullupCount).toEqual(2);
    });
  });

  describe('case three', () => {
    test.each([three])('should detect pullup count', async (data) => {
      const result = processLog(data);
      expect((await result).report.pullupCount).toEqual(3);
    });
  });

  describe('case four', () => {
    test.each([four])('should detect pullup count', async (data) => {
      const result = processLog(data);
      expect((await result).report.pullupCount).toEqual(4);
    });
  });

  // describe("case five", () => {
  //   test.each([five])("should detect pullup count", async (data) => {
  //     const result = processLog(data);
  //     expect((await result).report.pullupCount).toEqual(5);
  //   });
  // });
});

// it("process simple case", async () => {
//   const { report } = await processLog(detectWeightData[0]);
//   const { items } = report;

//   expect(items[0].confidence).toEqual(0);
//   expect(items[0].force).toEqual(-1);
//   expect(items[0].pressureChange).toEqual(16.3);
// });
