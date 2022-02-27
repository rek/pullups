import '../common/_commonjsHelpers-8c19dec8.js';
import '../common/isObjectLike-ea0df800.js';
import { i as identity_1 } from '../common/identity-317ddea3.js';
import '../common/isSymbol-f458fa80.js';
import { _ as _baseExtremum, a as _baseGt } from '../common/_baseGt-106360cf.js';

/**
 * Computes the maximum value of `array`. If `array` is empty or falsey,
 * `undefined` is returned.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Math
 * @param {Array} array The array to iterate over.
 * @returns {*} Returns the maximum value.
 * @example
 *
 * _.max([4, 2, 8, 6]);
 * // => 8
 *
 * _.max([]);
 * // => undefined
 */
function max(array) {
  return (array && array.length)
    ? _baseExtremum(array, identity_1, _baseGt)
    : undefined;
}

var max_1 = max;

export default max_1;
