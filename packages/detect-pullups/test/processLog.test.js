var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// import detectWeightData from './fixtures/detectWeight';
import { data } from './fixtures/processLog';
import { processLog } from '../src/processLog';
describe('processLog', () => {
    const [zero, one, two, three, four] = data;
    describe('case zero', () => {
        test.each([zero])('should detect pullup count', (data) => __awaiter(void 0, void 0, void 0, function* () {
            const result = processLog(data);
            expect((yield result).report.pullupCount).toEqual(0);
        }));
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
        test.each([one])('should detect pullup count', (data) => __awaiter(void 0, void 0, void 0, function* () {
            const result = processLog(data);
            expect((yield result).report.pullupCount).toEqual(1);
        }));
    });
    describe('case two', () => {
        test.each([two])('should detect pullup count', (data) => __awaiter(void 0, void 0, void 0, function* () {
            const result = processLog(data);
            expect((yield result).report.pullupCount).toEqual(2);
        }));
    });
    describe('case three', () => {
        test.each([three])('should detect pullup count', (data) => __awaiter(void 0, void 0, void 0, function* () {
            const result = processLog(data);
            expect((yield result).report.pullupCount).toEqual(3);
        }));
    });
    describe('case four', () => {
        test.each([four])('should detect pullup count', (data) => __awaiter(void 0, void 0, void 0, function* () {
            const result = processLog(data);
            expect((yield result).report.pullupCount).toEqual(4);
        }));
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
