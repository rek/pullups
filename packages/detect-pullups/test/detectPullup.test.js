var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import data from './fixtures/detectWeight';
import { detectPullup } from '../src/detectPullup';
describe('algo1', () => {
    it('detect single pullup in good case', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield detectPullup(data[0]);
        expect(result.algo1.data).toEqual([[94.87, 96.05, 96.42, 102.67, 111.17]]);
    }));
    it('detect even small ones!', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield detectPullup(data[1]);
        expect(result.algo1.data).toEqual([[66.98], [66.12, 66.64]]);
    }));
});
