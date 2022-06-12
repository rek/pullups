import { getAverageOfLast } from '../../utils/getAverageOfLast';

describe('getAverageOfLast', () => {
  test('good case', () => {
    expect(getAverageOfLast([1, 2, 3, 4, 5, 6])).toEqual(5);
  });
  test('custom window', () => {
    expect(getAverageOfLast([1, 1, 1, 2], 4)).toEqual(1.25);
  });
});
