import { detectPeaks } from '../../src/utils/detectPeaks';
import { line1 } from './fixtures/peaks';

describe('should detect peaks', () => {
  test('good case', async () => {
    const result = await detectPeaks(line1);
    expect(result).toEqual([
      { x: 20, y: 113.216728 },
      { x: 38, y: 119.22213 },
    ]);
  });
});
