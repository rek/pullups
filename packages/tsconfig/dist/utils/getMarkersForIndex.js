"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.getMarkersForIndex = void 0;
var compact_1 = __importDefault(require("lodash-es/compact"));
// first round takes 3 points
// second and all next rounds use the previous peak marker as the first one
var getMarkersForIndex = function (peakMarkers, dipMarkers, index) {
    var indexMarkers = [
        peakMarkers[index],
        dipMarkers[index],
        peakMarkers[index + 1],
    ];
    var checkForMissingEntries = (0, compact_1["default"])(indexMarkers);
    if (checkForMissingEntries.length === 3) {
        return checkForMissingEntries;
    }
    return [];
};
exports.getMarkersForIndex = getMarkersForIndex;
