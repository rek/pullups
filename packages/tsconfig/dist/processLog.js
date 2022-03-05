"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
exports.processLog = void 0;
var detectPullup_1 = require("./detectPullup");
var detectWeight_1 = require("./detectWeight");
var types_1 = require("./types");
var getMarkersForIndex_1 = require("./utils/getMarkersForIndex");
var isAmountWithinDeviation_1 = require("./utils/isAmountWithinDeviation");
var detectDescendingBeforePoint_1 = require("./utils/detectDescendingBeforePoint");
// need to remove this colour stuff
var colours = {
    green: '#37ba2f',
    red: '#ba372f'
};
var processLog = function (log, fallbackWeight) { return __awaiter(void 0, void 0, void 0, function () {
    var weight, pullups, dipMarkers, peakMarkers, moreMarkers, markerGroup, groups, group, items;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                weight = (0, detectWeight_1.detectWeight)(__spreadArray([], log, true));
                return [4 /*yield*/, (0, detectPullup_1.detectPullup)(log, weight || fallbackWeight)];
            case 1:
                pullups = _a.sent();
                dipMarkers = pullups.algo2.data.dips.map(function (data) {
                    return __assign(__assign({}, data), { stroke: colours.green, type: types_1.MarkerType.dip });
                });
                peakMarkers = pullups.algo2.data.peaks
                    .map(function (data) {
                    return __assign(__assign({}, data), { stroke: colours.red, type: types_1.MarkerType.peak });
                })
                    .filter(function (peak) {
                    // clean off any bad peak markers
                    // get, small things we found on a flat line,
                    // or before full weight was on the bar
                    // console.log("Checking peak is ok", { weight, y: peak.y });
                    if (weight > 0) {
                        var isBelow = (peak.y || 0) < weight;
                        var peakIsCloseToBodyWeight = (0, isAmountWithinDeviation_1.isAmountWithinDeviation)(peak.y || 0, weight);
                        var peakIsTooCloseToBodyWeightToBeLegit = !peakIsCloseToBodyWeight && !isBelow;
                        return peakIsTooCloseToBodyWeightToBeLegit;
                    }
                    else {
                        return true;
                    }
                });
                moreMarkers = true;
                markerGroup = 0;
                groups = [];
                do {
                    group = (0, getMarkersForIndex_1.getMarkersForIndex)(peakMarkers, dipMarkers, markerGroup);
                    if (group.length > 0) {
                        groups.push(group);
                        markerGroup += 1;
                    }
                    else {
                        moreMarkers = false;
                    }
                } while (moreMarkers);
                console.log('All marker groups:', groups);
                items = groups
                    .map(function (markerGroup) {
                    return {
                        confidence: 0,
                        markers: markerGroup
                    };
                })
                    // remove any groups that do not have markers
                    .filter(function (item) { return item.markers && item.markers.length > 0; })
                    // process marker stats
                    .map(function (item, index) {
                    // we can only really analize the first peak, the others are harder to find
                    if (index > 1) {
                        return item;
                    }
                    var pressureChange = -1;
                    var firstPeak = item.markers.find(function (marker) { return marker.type === 'peak'; });
                    if (firstPeak) {
                        var startOfPulup = (0, detectDescendingBeforePoint_1.detectDescendingBeforePoint)(log, firstPeak.x);
                        if (startOfPulup) {
                            var pullSegment = log.slice(startOfPulup + 1, firstPeak.x + 1);
                            // console.log("pullSegment", pullSegment);
                            pressureChange = pullSegment[pullSegment.length - 1] - pullSegment[0];
                        }
                    }
                    return __assign(__assign({}, item), { pressureChange: pressureChange });
                });
                // if no flat found, then work off the marks alone.
                console.log('[Process Log] results:', items);
                // map markers into places to start and end pullup
                return [2 /*return*/, {
                        // pullupCount is a bit useless, but making an object here to extend later on
                        report: {
                            items: items,
                            pullupCount: items.length
                        },
                        weight: weight
                    }];
        }
    });
}); };
exports.processLog = processLog;
