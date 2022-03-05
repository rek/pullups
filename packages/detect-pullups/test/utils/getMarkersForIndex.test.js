var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { MarkerType } from '../../src/types';
import { getMarkersForIndex } from '../../src/utils/getMarkersForIndex';
describe('getMarkersForIndex', () => {
    test('empty case', () => __awaiter(void 0, void 0, void 0, function* () {
        const peaks = [];
        const dips = [];
        const index = 0;
        const result = getMarkersForIndex(peaks, dips, index);
        expect(result).toEqual([]);
    }));
    test('good case', () => __awaiter(void 0, void 0, void 0, function* () {
        const peaks = [
            { type: MarkerType.peak, x: 1 },
            { type: MarkerType.peak, x: 4 },
        ];
        const dips = [
            { type: MarkerType.dip, x: 3 },
            { type: MarkerType.dip, x: 6 },
        ];
        const index = 0;
        const result = getMarkersForIndex(peaks, dips, index);
        expect(result).toEqual([
            {
                type: 'peak',
                x: 1,
            },
            {
                type: 'dip',
                x: 3,
            },
            {
                type: 'peak',
                x: 4,
            },
        ]);
    }));
    test('good case - double', () => __awaiter(void 0, void 0, void 0, function* () {
        const peaks = [
            { type: MarkerType.peak, x: 1 },
            { type: MarkerType.peak, x: 4 },
            { type: MarkerType.peak, x: 9 },
        ];
        const dips = [
            { type: MarkerType.dip, x: 3 },
            { type: MarkerType.dip, x: 6 },
        ];
        expect(getMarkersForIndex(peaks, dips, 0)).toEqual([
            {
                type: 'peak',
                x: 1,
            },
            {
                type: 'dip',
                x: 3,
            },
            {
                type: 'peak',
                x: 4,
            },
        ]);
        expect(getMarkersForIndex(peaks, dips, 1)).toEqual([
            {
                type: 'peak',
                x: 4,
            },
            {
                type: 'dip',
                x: 6,
            },
            {
                type: 'peak',
                x: 9,
            },
        ]);
    }));
    test('bad case', () => __awaiter(void 0, void 0, void 0, function* () {
        const peaks = [{ type: MarkerType.peak, x: 1 }];
        const dips = [
            { type: MarkerType.dip, x: 3 },
            { type: MarkerType.dip, x: 6 },
        ];
        const index = 0;
        const result = getMarkersForIndex(peaks, dips, index);
        expect(result).toEqual([]);
    }));
});
