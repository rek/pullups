"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.detectFlatSections = void 0;
var isLineInRange_1 = require("./isLineInRange");
var isLineLevel_1 = require("./isLineLevel");
var detectFlatSections = function (data, windowSize, allowedDeviation) {
    if (windowSize === void 0) { windowSize = 3; }
    var result = [];
    var currentSection = [];
    // const total = data.length;
    var slidingWindow = [];
    var recordingRange = false;
    // console.log("[Detect flat] Working on data:", data);
    data.forEach(function (item, index) {
        slidingWindow.push(item);
        // make sure window is full before starting
        if (slidingWindow.length < windowSize) {
            return;
        }
        // DEBUG:
        // console.log('Checking window:', slidingWindow, {level: isLineLevel(slidingWindow), range: isLineInRange(slidingWindow)})
        // check if window is level
        // and if all is still good,
        // do a check of the line range,
        // to make sure they are not drifting too far apart
        if ((0, isLineLevel_1.isLineLevel)(slidingWindow, allowedDeviation) && (0, isLineInRange_1.isLineInRange)(slidingWindow)) {
            // console.log('ok, adding item:', item)
            if (recordingRange) {
                // add last item in this window
                currentSection.push(slidingWindow[windowSize - 1]);
            }
            else {
                // add whole window when we first find one:
                currentSection = currentSection.concat(slidingWindow);
                recordingRange = true;
            }
        }
        else {
            // range has just finished
            if (recordingRange) {
                result.push({
                    start: index - currentSection.length,
                    end: index - 1,
                    data: __spreadArray([], currentSection, true)
                });
                recordingRange = false;
            }
            currentSection = [];
        }
        // remove the first element in the window, to keep it sliding
        slidingWindow.shift();
    });
    return result;
};
exports.detectFlatSections = detectFlatSections;
