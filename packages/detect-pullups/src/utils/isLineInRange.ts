import max from 'lodash-es/max';
import min from 'lodash-es/min';

import type { Line } from '../types';

export const isLineInRange = (line: Line = [], allowedDeviation = 1) => {
  if ((max(line) || 0) - (min(line) || 0) > allowedDeviation) {
    return false;
  }

  return true;
};
