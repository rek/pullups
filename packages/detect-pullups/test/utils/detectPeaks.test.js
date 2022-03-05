var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { detectPeaks } from '../../src/utils/detectPeaks';
import { line1 } from './fixtures/peaks';
describe('should detect peaks', () => {
    test('good case', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield detectPeaks(line1);
        expect(result).toEqual([
            { x: 20, y: 113.216728 },
            { x: 38, y: 119.22213 },
        ]);
    }));
});
