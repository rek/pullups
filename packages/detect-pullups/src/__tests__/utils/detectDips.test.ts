import { detectDips } from '../../utils/detectDips';

import { line1 } from '../../__fixtures/dips';

describe('should detectDips', () => {
  test('good case', async () => {
    const result = await detectDips(line1);
    expect(result).toEqual([
      { x: 0, y: 1 },
      { x: 24, y: 3 },
    ]);
  });
});
