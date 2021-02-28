import mean from 'lodash/mean'
import max from 'lodash/max'
import min from 'lodash/min'

type Line = number[];

type FlatSections = Line[];

export const isLineInRange = (line: Line = [], allowedDeviation = 1) => {
  if ((max(line) || 0) - (min(line) || 0) > allowedDeviation) {
    return false;
  }
}

// algo: is any number +- the average?
export const isLineLevelIsh = (line: Line = [], allowedDeviation = 1) => {
  const lineMean = mean(line);

  const hasPointPastDeviation = line.some((point) => {
    // find distance from average
    const distanceFromMean = lineMean - point;

    // make sure we handle points below and above the average the same
    const isAbove = distanceFromMean >= 0
    let correctedDistance = distanceFromMean;
    if (!isAbove) {
      correctedDistance = distanceFromMean * - 1
    }

    // check if any point is outside the allowed deviation
    const isTooFarAway = correctedDistance > allowedDeviation;

    // console.log('{isAbove', {isAbove, correctedDistance, point, isTooFarAway})

    return isTooFarAway;
  })

  console.log('hasPointPastDeviation', {line, hasPointPastDeviation})

  // if all is still good, do a check of first and last,
  // to make sure they are not drifting too far apart
  if (!hasPointPastDeviation) {

  }

  return !hasPointPastDeviation;
}

export const detectFlats = (data: Line) => {
  const result: FlatSections[] = []

  const total = data.length;

  const windowSize = 3
  const slidingWindow = new Array(windowSize);

  data.forEach((item, index) => {
    slidingWindow.push(item);

    if (slidingWindow.length < windowSize) {
      return;
    }

    // remove the first element in the window, to keep it sliding
    slidingWindow.shift();

    // check if window is level
    const isLevel = isLineLevelIsh(slidingWindow)
  })

  total


  return result;
}

/*
* Detect the weight of a person from a 'hanglog'
*/
export const detectWeight = (data: Line) => {
  const flats = detectFlats(data)

  return flats[0] || -1;
}


