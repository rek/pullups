import { detectFirstAscendingFromPoint } from '../../src/utils/detectFirstAscendingFromPoint';

describe('detectFirstAscendingFromPoint', () => {
  test('should detect good cases', () => {
    expect(
      detectFirstAscendingFromPoint([1, 1, 1, 1, 2, 3, 4, 5, 4, 3, 2, 1], 4)
    ).toEqual([2, 3, 4, 5]);
    expect(detectFirstAscendingFromPoint([1, 2, 3, 4, 5, 6, 7], 2)).toEqual([
      3,
      4,
      5,
      6,
      7,
    ]);
  });

  test('should handle bad cases', () => {
    expect(detectFirstAscendingFromPoint([3, 2, 1, 4, 5], 0)).toEqual([]);
    expect(detectFirstAscendingFromPoint([3, 2, 1, 4, 5], 1)).toEqual([]);
    expect(detectFirstAscendingFromPoint([3, 2, 1, 4, 5], 10)).toEqual([]);
    expect(detectFirstAscendingFromPoint([], -1)).toEqual([]);
  });
});
