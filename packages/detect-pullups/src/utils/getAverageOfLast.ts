import takeRight from 'lodash-es/takeRight';
import sum from 'lodash-es/sum';

import type { Line } from '../types';

export const getAverageOfLast = (list: Line, windowSize = 3) => {
  const finalWindow = takeRight(list, windowSize);

  return sum(finalWindow) / windowSize;
};
