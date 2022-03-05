"use strict";
exports.__esModule = true;
exports.isValidBodyWeight = void 0;
var isValidBodyWeight = function (weight) {
    var result = true;
    if (!weight) {
        result = false;
    }
    if (weight === -1) {
        result = false;
    }
    return result;
};
exports.isValidBodyWeight = isValidBodyWeight;
