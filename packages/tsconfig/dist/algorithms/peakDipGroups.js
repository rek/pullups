"use strict";
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
exports.peakDipGroups = void 0;
var utils_1 = require("../utils");
var isValidBodyWeight_1 = require("../utils/isValidBodyWeight");
var isAmountWithinDeviation_1 = require("../utils/isAmountWithinDeviation");
var peakDipGroups = function (line, _a) {
    var bodyWeight = _a.bodyWeight, devation = _a.devation;
    return __awaiter(void 0, void 0, void 0, function () {
        var peaks, dips, cleanDips;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, (0, utils_1.detectPeaks)(line)];
                case 1:
                    peaks = _b.sent();
                    return [4 /*yield*/, (0, utils_1.detectDips)(line)];
                case 2:
                    dips = _b.sent();
                    cleanDips = __spreadArray([], dips, true);
                    // do we need to handle this case:
                    // assume late start timing,
                    // eg: this starts with weight already on bar
                    //     so no initial weight 'ramp up' (eg: from dip)
                    // if the first item starts at 0
                    // remove it, since it is the 'getting on the bar' entry
                    if (cleanDips[0].x === 0) {
                        // console.log("Removing first");
                        cleanDips.shift();
                    }
                    // if the last item in the dips is also the last data point
                    // remove it, since it is the 'letting go of the bar' entry
                    if (cleanDips[cleanDips.length - 1].x === line.length - 1) {
                        // console.log("Removing last");
                        cleanDips.pop();
                    }
                    // remove any other dips that are within deviation of bodyweight
                    // since we only really want the noticaable ones
                    if ((0, isValidBodyWeight_1.isValidBodyWeight)(bodyWeight)) {
                        cleanDips = cleanDips.filter(function (dip) {
                            var dipIsTooCloseToBodyWeight = (0, isAmountWithinDeviation_1.isAmountWithinDeviation)(bodyWeight, dip.y || 0, devation);
                            if (dipIsTooCloseToBodyWeight) {
                                return false;
                                console.log("Removing bad dip:", dip);
                            }
                            return true;
                        });
                    }
                    // console.log("Final peaks", peaks);
                    // console.log("Final dips", cleanDips);
                    return [2 /*return*/, { dips: cleanDips, peaks: peaks }];
            }
        });
    });
};
exports.peakDipGroups = peakDipGroups;
