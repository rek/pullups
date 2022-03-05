"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.invertLine = void 0;
var max_1 = __importDefault(require("lodash-es/max"));
var invertLine = function (line) {
    var lineMax = (0, max_1["default"])(line) || 0;
    // invert the graph and then transpose it back upto positive values
    var invertedLine = line.map(function (point) { return point * -1 + lineMax; });
    return invertedLine;
};
exports.invertLine = invertLine;
