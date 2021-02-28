import data from './fixtures/detectWeight'

import {detectWeight} from '../detectWeight'

it('get the first weight', () => {
  expect(detectWeight(data[0])).toEqual(91);
})
