"use strict";
exports.__esModule = true;
exports.logDebug = exports.logWarn = exports.logInfo = void 0;
var logLevel = process ? process.env.LOG || 2 : 2;
var logInfo = function () {
    var rest = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        rest[_i] = arguments[_i];
    }
    console.info.apply(console, rest);
};
exports.logInfo = logInfo;
var logWarn = function () {
    var rest = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        rest[_i] = arguments[_i];
    }
    console.warn.apply(console, rest);
};
exports.logWarn = logWarn;
var logDebug = function () {
    var rest = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        rest[_i] = arguments[_i];
    }
    if (logLevel > 2) {
        console.log.apply(console, rest);
    }
};
exports.logDebug = logDebug;
