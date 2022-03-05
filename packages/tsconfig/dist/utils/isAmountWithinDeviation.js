"use strict";
exports.__esModule = true;
exports.isAmountWithinDeviation = void 0;
var isAmountWithinDeviation = function (value, compare, deviation) {
    if (deviation === void 0) { deviation = 0.9; }
    return compare > value * deviation;
};
exports.isAmountWithinDeviation = isAmountWithinDeviation;
