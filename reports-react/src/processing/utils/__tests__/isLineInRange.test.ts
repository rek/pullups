import {isLineInRange} from '../isLineInRange'

const negativeCases = [[[1, 2, 3.1]], [[1, 2, 3]], [[0, 0, 3]], [[1, 1, 1, 4]], [[6, 5, 4, 4, 4]], [[-5, 5, 0]]];
const goodCases = [[[1, 1, 1]], [[2, 2, 2]], [[2.1, 1.9, 1.8]], [[21, 20, 20.5]], [[21, 20, 20.5]]];

describe('should fail range', () => {
  test.each(negativeCases)(
    "should detect non straight [%p]",
    (data) => {
      expect(isLineInRange(data)).toEqual(false);
    }
  );
});

describe('should pass range', () => {
  test.each(goodCases)(
    "should detect non straight [%p]",
    (data) => {
      expect(isLineInRange(data)).toEqual(true);
    }
  );
});
