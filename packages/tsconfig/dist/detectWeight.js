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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.detectWeight = void 0;
var mean_1 = __importDefault(require("lodash-es/mean"));
var sortBy_1 = __importDefault(require("lodash-es/sortBy"));
var detectFlatSections_1 = require("./utils/detectFlatSections");
/*
 * Detect the weight of a person from a 'hanglog'
 */
var detectWeight = function (data) {
    // console.log("Sending data:", data);
    var flats = (0, detectFlatSections_1.detectFlatSections)(__spreadArray([], data, true), 5);
    var totalLogAverage = (0, mean_1["default"])(data);
    // console.log("[Detect weight]", { totalLogAverage, flats });
    if (flats.length > 0) {
        if (flats.length === 1) {
            var firstFlatSection = flats[0];
            var average = (0, mean_1["default"])(firstFlatSection.data);
            return average;
        }
        else {
            var finalChosenWeight = 0;
            // sort by ones with the most points first:
            var sortArrayByLength = (0, sortBy_1["default"])(flats, [function (item) { return -item.data.length; }]);
            // console.log("sortArrayByLength", sortArrayByLength);
            // 1. first test, take the highest ?
            // const averages = flats.map((item) => mean(item.data))
            // 2. start checking from the longest down
            // take the first that is close to the total average
            var detectedWeight2 = sortArrayByLength.find(function (item) {
                if ((0, mean_1["default"])(item.data) > totalLogAverage * 0.9) {
                    // console.log("Choosing:", item);
                    return true;
                }
                return false;
            });
            if (detectedWeight2) {
                finalChosenWeight = (0, mean_1["default"])(detectedWeight2.data);
            }
            // 3. take the most common?
            // const averages = flats.map((item) => mean(item.data))
            return finalChosenWeight;
        }
    }
    else {
        return 0;
    }
};
exports.detectWeight = detectWeight;
