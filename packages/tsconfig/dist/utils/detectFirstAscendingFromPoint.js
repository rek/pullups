"use strict";
exports.__esModule = true;
exports.detectFirstAscendingFromPoint = void 0;
var detectFirstAscendingFromPoint = function (data, position, deviation) {
    if (deviation === void 0) { deviation = 0; }
    var ascendingSequence = [];
    data.slice(position).some(function (point, index) {
        var upperBound = point + deviation > data[position + index - 1];
        if (upperBound) {
            ascendingSequence.push(point);
            return false;
        }
        return true;
    });
    return ascendingSequence;
};
exports.detectFirstAscendingFromPoint = detectFirstAscendingFromPoint;
