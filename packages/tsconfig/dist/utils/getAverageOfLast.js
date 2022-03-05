"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.getAverageOfLast = void 0;
var takeRight_1 = __importDefault(require("lodash-es/takeRight"));
var sum_1 = __importDefault(require("lodash-es/sum"));
var getAverageOfLast = function (list, windowSize) {
    if (windowSize === void 0) { windowSize = 3; }
    var finalWindow = (0, takeRight_1["default"])(list, windowSize);
    return (0, sum_1["default"])(finalWindow) / windowSize;
};
exports.getAverageOfLast = getAverageOfLast;
