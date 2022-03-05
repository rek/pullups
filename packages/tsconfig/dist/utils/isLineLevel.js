"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.isLineLevel = void 0;
var mean_1 = __importDefault(require("lodash-es/mean"));
// algo: is any number +- the average?
var isLineLevel = function (line, allowedDeviation) {
    if (line === void 0) { line = []; }
    if (allowedDeviation === void 0) { allowedDeviation = 1; }
    var lineMean = (0, mean_1["default"])(line);
    var hasPointPastDeviation = line.some(function (point) {
        // find distance from average
        var distanceFromMean = lineMean - point;
        // make sure we handle points below and above the average the same
        var isAbove = distanceFromMean >= 0;
        var correctedDistance = distanceFromMean;
        if (!isAbove) {
            correctedDistance = distanceFromMean * -1;
        }
        // check if any point is outside the allowed deviation
        var isTooFarAway = correctedDistance > allowedDeviation;
        // console.log('{isAbove', {isAbove, correctedDistance, point, isTooFarAway})
        return isTooFarAway;
    });
    // console.log('hasPointPastDeviation', {line, hasPointPastDeviation})
    // if we don't have any points past the deviation,
    // then this line is good.
    return !hasPointPastDeviation;
};
exports.isLineLevel = isLineLevel;
