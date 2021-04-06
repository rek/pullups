import { isAmountWithinDeviation } from '../../src/utils/isAmountWithinDeviation';

describe('isAmountWithinDeviation', () => {
  test('valid case above', () => {
    expect(isAmountWithinDeviation(100, 115, 0.9)).toBeTruthy();
    expect(isAmountWithinDeviation(100, 105, 0.9)).toBeTruthy();
  });
  test('valid case below', () => {
    expect(isAmountWithinDeviation(100, 100, 0.9)).toBeTruthy();
    expect(isAmountWithinDeviation(100, 96, 0.9)).toBeTruthy();
    expect(isAmountWithinDeviation(100, 91, 0.9)).toBeTruthy();
  });
  test('invalid case above', () => {
    // ? should we ?
  });
  test('invalid case below', () => {
    expect(isAmountWithinDeviation(100, 90, 0.9)).toBeFalsy();
    expect(isAmountWithinDeviation(100, 50, 0.9)).toBeFalsy();
    expect(isAmountWithinDeviation(100, 0, 0.9)).toBeFalsy();
  });
});
