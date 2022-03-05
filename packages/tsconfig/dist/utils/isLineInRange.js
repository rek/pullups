"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.isLineInRange = void 0;
var max_1 = __importDefault(require("lodash-es/max"));
var min_1 = __importDefault(require("lodash-es/min"));
var isLineInRange = function (line, allowedDeviation) {
    if (line === void 0) { line = []; }
    if (allowedDeviation === void 0) { allowedDeviation = 1; }
    if (((0, max_1["default"])(line) || 0) - ((0, min_1["default"])(line) || 0) > allowedDeviation) {
        return false;
    }
    return true;
};
exports.isLineInRange = isLineInRange;
