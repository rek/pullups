"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.detectDescendingBeforePoint = void 0;
var forEachRight_1 = __importDefault(require("lodash-es/forEachRight"));
var take_1 = __importDefault(require("lodash-es/take"));
var last_1 = __importDefault(require("lodash-es/last"));
var getAverageOfLast_1 = require("./getAverageOfLast");
/*
 * This function detects the left side of a peak
 *
 * The end point (start of per) of it is fancy though:
 *
 * It detects down to a flat line
 *
 * Eg:
 *           -2-
 *          /  \
 *    /\--1/    \
 * ---           -----
 *
 * It will dectect the line (1-2)
 *
 */
var detectDescendingBeforePoint = function (data, position, // the middle of the peak (eg: point 2 from above picture)
_a) {
    var // the middle of the peak (eg: point 2 from above picture)
    _b = _a === void 0 ? {} : _a, _c = _b.deviation, deviation = _c === void 0 ? 0 : _c, // fluctuation before 1 is detected
    _d = _b.returnValue, // fluctuation before 1 is detected
    returnValue = _d === void 0 ? false : _d;
    var fromPoint = (0, take_1["default"])(data, position);
    var finished = -1;
    var windowSize = 2;
    var processedList = [];
    (0, forEachRight_1["default"])(fromPoint, function (point, index) {
        if (finished !== -1) {
            return;
        }
        if (processedList.length > windowSize) {
            // make sliding average range to compare against
            var average = (0, getAverageOfLast_1.getAverageOfLast)(processedList, windowSize);
            // console.log("debug:", { processedList, average, point, index });
            if (point > average + deviation) {
                finished = index; // record the index we find the last entry
            }
            else {
                processedList.push(point);
            }
        }
        else {
            processedList.push(point);
        }
    });
    if (returnValue) {
        // console.log("Final processedList:", processedList);
        return (0, last_1["default"])(processedList);
    }
    return finished; // index of position found
};
exports.detectDescendingBeforePoint = detectDescendingBeforePoint;
