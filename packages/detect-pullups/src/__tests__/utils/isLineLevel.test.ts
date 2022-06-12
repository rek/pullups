import { isLineLevel } from '../../utils/isLineLevel';
import { goodCases } from '../../__fixtures/flats';

const negativeCases = [
  [[1, 2, 3.1]],
  [[0, 0, 3]],
  [[0, 2, 0]],
  [[1, 0, 10]],
  [[1, 1, 1, 4]],
  [[6, 5, 4, 4, 4]],
  [[-5, 5, 0]],
];

describe('should fail straight detection', () => {
  test.each(negativeCases)('should detect non straight [%p]', (data) => {
    expect(isLineLevel(data)).toEqual(false);
  });
});

describe('should pass straight detection', () => {
  test.each(goodCases)('should detect non straight [%p]', (data) => {
    expect(isLineLevel(data)).toEqual(true);
  });
});
