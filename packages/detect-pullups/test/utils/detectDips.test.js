var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { detectDips } from '../../src/utils/detectDips';
import { line1 } from './fixtures/dips';
describe('should detectDips', () => {
    test('good case', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield detectDips(line1);
        expect(result).toEqual([
            { x: 0, y: 1 },
            { x: 24, y: 3 },
        ]);
    }));
});
