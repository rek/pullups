"use strict";
// not so important i think now
exports.__esModule = true;
exports.detectType = void 0;
var detectType = function (log, pullups) {
    var type = "Unknown";
    if (pullups.algo1.count > 0 && pullups.algo2.count > 0) {
        type = "pullup";
    }
    if (type !== "pullup") {
        if (log.length > 20) {
            type = "weight";
        }
    }
    return type;
};
exports.detectType = detectType;
