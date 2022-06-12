import data from '../__fixtures/detectWeight';

import { detectPullup } from '../detectPullup';

describe('algo1', () => {
  it('detect single pullup in good case', async () => {
    const result = await detectPullup(data[0]);
    expect(result.algo1.data).toEqual([[94.87, 96.05, 96.42, 102.67, 111.17]]);
  });

  it('detect even small ones!', async () => {
    const result = await detectPullup(data[1]);
    expect(result.algo1.data).toEqual([[66.98], [66.12, 66.64]]);
  });
});
