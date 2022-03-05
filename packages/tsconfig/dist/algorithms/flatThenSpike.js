"use strict";
exports.__esModule = true;
exports.flatThenSpike = void 0;
var log_1 = require("../utils/log");
var utils_1 = require("../utils");
/*
*
*/
var flatThenSpike = function (line, _a) {
    var bodyWeight = _a.bodyWeight, _b = _a.deviation, deviation = _b === void 0 ? 0.9 : _b, _c = _a.minLength, minLength = _c === void 0 ? 3 : _c, flatLineAllowedDeviation = _a.flatLineAllowedDeviation;
    var segments = [];
    var flats = (0, utils_1.detectFlatSections)(line, 5, flatLineAllowedDeviation);
    (0, log_1.logDebug)("Detected flats:", flats, { minLength: minLength });
    flats
        .filter(function (flat) { return flat.data.length > minLength; })
        .forEach(function (flat) {
        var currentPotentialPullup = (0, utils_1.detectFirstAscendingFromPoint)(line, flat.end);
        // console.log("currentPotentialPullup", currentPotentialPullup);
        if (currentPotentialPullup[0] > bodyWeight * deviation) {
            segments.push(currentPotentialPullup);
        }
    });
    return segments;
};
exports.flatThenSpike = flatThenSpike;
