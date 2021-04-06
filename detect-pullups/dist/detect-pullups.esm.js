import mean from 'lodash-es/mean';
import sortBy from 'lodash-es/sortBy';
import max from 'lodash-es/max';
import min from 'lodash-es/min';
import slayer from 'slayer';
import compact from 'lodash-es/compact';
import forEachRight from 'lodash-es/forEachRight';
import take from 'lodash-es/take';
import last from 'lodash-es/last';
import takeRight from 'lodash-es/takeRight';
import sum from 'lodash-es/sum';

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var runtime_1 = createCommonjsModule(function (module) {
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined$1; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined$1) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined$1;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined$1;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined$1;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined$1, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined$1;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined$1;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined$1;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined$1;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined$1;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
   module.exports 
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  Function("r", "regeneratorRuntime = r")(runtime);
}
});

var isLineInRange = function isLineInRange(line, allowedDeviation) {
  if (line === void 0) {
    line = [];
  }

  if (allowedDeviation === void 0) {
    allowedDeviation = 1;
  }

  if ((max(line) || 0) - (min(line) || 0) > allowedDeviation) {
    return false;
  }

  return true;
};

var isLineLevel = function isLineLevel(line, allowedDeviation) {
  if (line === void 0) {
    line = [];
  }

  if (allowedDeviation === void 0) {
    allowedDeviation = 1;
  }

  var lineMean = mean(line);
  var hasPointPastDeviation = line.some(function (point) {
    // find distance from average
    var distanceFromMean = lineMean - point; // make sure we handle points below and above the average the same

    var isAbove = distanceFromMean >= 0;
    var correctedDistance = distanceFromMean;

    if (!isAbove) {
      correctedDistance = distanceFromMean * -1;
    } // check if any point is outside the allowed deviation


    var isTooFarAway = correctedDistance > allowedDeviation; // console.log('{isAbove', {isAbove, correctedDistance, point, isTooFarAway})

    return isTooFarAway;
  }); // console.log('hasPointPastDeviation', {line, hasPointPastDeviation})
  // if we don't have any points past the deviation,
  // then this line is good.

  return !hasPointPastDeviation;
};

var detectFlatSections = function detectFlatSections(data, windowSize) {
  if (windowSize === void 0) {
    windowSize = 3;
  }

  var result = [];
  var currentSection = []; // const total = data.length;

  var slidingWindow = [];
  var recordingRange = false; // console.log("[Detect flat] Working on data:", data);

  data.forEach(function (item, index) {
    slidingWindow.push(item); // make sure window is full before starting

    if (slidingWindow.length < windowSize) {
      return;
    } // DEBUG:
    // console.log('Checking window:', slidingWindow, {level: isLineLevel(slidingWindow), range: isLineInRange(slidingWindow)})
    // check if window is level
    // and if all is still good,
    // do a check of the line range,
    // to make sure they are not drifting too far apart


    if (isLineLevel(slidingWindow) && isLineInRange(slidingWindow)) {
      // console.log('ok, adding item:', item)
      if (recordingRange) {
        // add last item in this window
        currentSection.push(slidingWindow[windowSize - 1]);
      } else {
        // add whole window when we first find one:
        currentSection = currentSection.concat(slidingWindow);
        recordingRange = true;
      }
    } else {
      // range has just finished
      if (recordingRange) {
        result.push({
          start: index - currentSection.length,
          end: index - 1,
          data: [].concat(currentSection)
        });
        recordingRange = false;
      }

      currentSection = [];
    } // remove the first element in the window, to keep it sliding


    slidingWindow.shift();
  });
  return result;
};

/*
 * Detect the weight of a person from a 'hanglog'
 */

var detectWeight = function detectWeight(data) {
  // console.log("Sending data:", data);
  var flats = detectFlatSections([].concat(data), 5);
  var totalLogAverage = mean(data); // console.log("[Detect weight]", { totalLogAverage, flats });

  if (flats.length > 0) {
    if (flats.length === 1) {
      var firstFlatSection = flats[0];
      var average = mean(firstFlatSection.data);
      return average;
    } else {
      var finalChosenWeight = 0; // sort by ones with the most points first:

      var sortArrayByLength = sortBy(flats, [function (item) {
        return -item.data.length;
      }]); // console.log("sortArrayByLength", sortArrayByLength);
      // 1. first test, take the highest ?
      // const averages = flats.map((item) => mean(item.data))
      // 2. start checking from the longest down
      // take the first that is close to the total average

      var detectedWeight2 = sortArrayByLength.find(function (item) {
        if (mean(item.data) > totalLogAverage * 0.9) {
          // console.log("Choosing:", item);
          return true;
        }

        return false;
      });

      if (detectedWeight2) {
        finalChosenWeight = mean(detectedWeight2.data);
      } // 3. take the most common?
      // const averages = flats.map((item) => mean(item.data))


      return finalChosenWeight;
    }
  } else {
    return 0;
  }
};

var detectPeaks = /*#__PURE__*/function () {
  var _ref = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(line) {
    var peaks;
    return runtime_1.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return slayer({
              minPeakDistance: 10
            }).fromArray(line);

          case 2:
            peaks = _context.sent;
            return _context.abrupt("return", peaks);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function detectPeaks(_x) {
    return _ref.apply(this, arguments);
  };
}();

var invertLine = function invertLine(line) {
  var lineMax = max(line) || 0; // invert the graph and then transpose it back upto positive values

  var invertedLine = line.map(function (point) {
    return point * -1 + lineMax;
  });
  return invertedLine;
};

var detectDips = /*#__PURE__*/function () {
  var _ref = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(line) {
    var invertedLine, invertedPeaks, dipsOnLine;
    return runtime_1.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            invertedLine = invertLine(line); // console.log("invertedLine", invertedLine);

            _context.next = 3;
            return slayer({
              minPeakDistance: 10
            }).fromArray(invertedLine);

          case 3:
            invertedPeaks = _context.sent;
            // console.log("inverted peaks", invertedPeaks);
            // convert the dip back to the real number
            dipsOnLine = invertedPeaks.map(function (dip) {
              return {
                x: dip.x,
                y: line[dip.x]
              };
            }); // console.log("dipsOnLine", dipsOnLine);

            return _context.abrupt("return", dipsOnLine);

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function detectDips(_x) {
    return _ref.apply(this, arguments);
  };
}();

var detectFirstAscendingFromPoint = function detectFirstAscendingFromPoint(data, position, deviation) {
  if (deviation === void 0) {
    deviation = 0;
  }

  var ascendingSequence = [];
  data.slice(position).some(function (point, index) {
    var upperBound = point + deviation > data[position + index - 1];

    if (upperBound) {
      ascendingSequence.push(point);
      return false;
    }

    return true;
  });
  return ascendingSequence;
};

var isValidBodyWeight = function isValidBodyWeight(weight) {
  var result = true;

  if (!weight) {
    result = false;
  }

  if (weight === -1) {
    result = false;
  }

  return result;
};

var isAmountWithinDeviation = function isAmountWithinDeviation(value, compare, deviation) {
  if (deviation === void 0) {
    deviation = 0.9;
  }

  return compare > value * deviation;
};

var peakDipGroups = /*#__PURE__*/function () {
  var _ref2 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(line, _ref) {
    var bodyWeight, devation, peaks, dips, cleanDips;
    return runtime_1.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            bodyWeight = _ref.bodyWeight, devation = _ref.devation;
            _context.next = 3;
            return detectPeaks(line);

          case 3:
            peaks = _context.sent;
            _context.next = 6;
            return detectDips(line);

          case 6:
            dips = _context.sent;
            // console.log("Raw peaks", peaks);
            // console.log("Raw dips", dips);
            cleanDips = [].concat(dips); // do we need to handle this case:
            // assume late start timing,
            // eg: this starts with weight already on bar
            //     so no initial weight 'ramp up' (eg: from dip)
            // if the first item starts at 0
            // remove it, since it is the 'getting on the bar' entry

            if (cleanDips[0].x === 0) {
              // console.log("Removing first");
              cleanDips.shift();
            } // if the last item in the dips is also the last data point
            // remove it, since it is the 'letting go of the bar' entry


            if (cleanDips[cleanDips.length - 1].x === line.length - 1) {
              // console.log("Removing last");
              cleanDips.pop();
            } // remove any other dips that are within deviation of bodyweight
            // since we only really want the noticaable ones


            if (isValidBodyWeight(bodyWeight)) {
              cleanDips = cleanDips.filter(function (dip) {
                var dipIsTooCloseToBodyWeight = isAmountWithinDeviation(bodyWeight, dip.y || 0, devation);

                if (dipIsTooCloseToBodyWeight) {
                  return false;
                }

                return true;
              });
            } // console.log("Final peaks", peaks);
            // console.log("Final dips", cleanDips);


            return _context.abrupt("return", {
              dips: cleanDips,
              peaks: peaks
            });

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function peakDipGroups(_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}();

var flatThenSpike = function flatThenSpike(line, _ref) {
  var bodyWeight = _ref.bodyWeight,
      _ref$deviation = _ref.deviation,
      deviation = _ref$deviation === void 0 ? 0.9 : _ref$deviation,
      _ref$minLength = _ref.minLength,
      minLength = _ref$minLength === void 0 ? 3 : _ref$minLength;
  var segments = [];
  var flats = detectFlatSections(line, 5);
  flats.filter(function (flat) {
    return flat.data.length > minLength;
  }).forEach(function (flat) {
    var currentPotentialPullup = detectFirstAscendingFromPoint(line, flat.end); // console.log("currentPotentialPullup", currentPotentialPullup);

    if (currentPotentialPullup[0] > bodyWeight * deviation) {
      segments.push(currentPotentialPullup);
    }
  });
  return segments;
};

/*
 * Algorithm
 *
 * - detect up after flat
 * - is it close to body weight (10%) <- this stops random fluctuations
 *
 */

var detectPullup = /*#__PURE__*/function () {
  var _ref = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(line, weight) {
    var bodyWeight, flatThenSpikeData, algo1, peakDipGroupsData, algo2;
    return runtime_1.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            bodyWeight = weight || detectWeight(line);
            console.log("Body weight found:", bodyWeight);
            flatThenSpikeData = flatThenSpike(line, {
              bodyWeight: bodyWeight,
              minLength: 4
            });
            algo1 = {
              count: flatThenSpikeData.length,
              data: flatThenSpikeData
            }; // logDebug("algo1", algo1);

            _context.next = 6;
            return peakDipGroups(line, {
              bodyWeight: bodyWeight,
              devation: 0.8
            });

          case 6:
            peakDipGroupsData = _context.sent;
            algo2 = {
              count: peakDipGroupsData.dips.length,
              data: peakDipGroupsData
            }; // logDebug("algo2", algo2);

            return _context.abrupt("return", {
              algo1: algo1,
              algo2: algo2
            });

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function detectPullup(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

// not so important i think now
var detectType = function detectType(log, pullups) {
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

// export interface Pullup {
//   ascending: {
//     start: number;
//     end: number;
//   };
//   descending?: {
//     start: number;
//     end: number;
//   };
// }
var MarkerType;

(function (MarkerType) {
  MarkerType["start"] = "start";
  MarkerType["peak"] = "peak";
  MarkerType["dip"] = "dip";
})(MarkerType || (MarkerType = {}));

// second and all next rounds use the previous peak marker as the first one

var getMarkersForIndex = function getMarkersForIndex(peakMarkers, dipMarkers, index) {
  var indexMarkers = [peakMarkers[index], dipMarkers[index], peakMarkers[index + 1]];
  var checkForMissingEntries = compact(indexMarkers);

  if (checkForMissingEntries.length === 3) {
    return checkForMissingEntries;
  }

  return [];
};

var getAverageOfLast = function getAverageOfLast(list, windowSize) {
  if (windowSize === void 0) {
    windowSize = 3;
  }

  var finalWindow = takeRight(list, windowSize);
  return sum(finalWindow) / windowSize;
};

var detectDescendingBeforePoint = function detectDescendingBeforePoint(data, position, _temp) {
  var _ref = _temp === void 0 ? {} : _temp,
      _ref$deviation = _ref.deviation,
      deviation = _ref$deviation === void 0 ? 0 : _ref$deviation,
      _ref$returnValue = _ref.returnValue,
      returnValue = _ref$returnValue === void 0 ? false : _ref$returnValue;

  var fromPoint = take(data, position);
  var finished = -1;
  var windowSize = 2;
  var processedList = [];
  forEachRight(fromPoint, function (point, index) {
    if (finished !== -1) {
      return;
    }

    if (processedList.length > windowSize) {
      // make sliding average range to compare against
      var average = getAverageOfLast(processedList, windowSize); // console.log("debug:", { processedList, average, point, index });

      if (point > average + deviation) {
        finished = index; // record the index we find the last entry
      } else {
        processedList.push(point);
      }
    } else {
      processedList.push(point);
    }
  });

  if (returnValue) {
    // console.log("Final processedList:", processedList);
    return last(processedList);
  }

  return finished; // index of position found
};

var colours = {
  green: '#37ba2f',
  red: '#ba372f'
};
var processLog = /*#__PURE__*/function () {
  var _ref = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(log, fallbackWeight) {
    var weight, pullups, dipMarkers, peakMarkers, moreMarkers, markerGroup, groups, group, items;
    return runtime_1.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            // console.log("fallbackWeight", fallbackWeight);
            weight = detectWeight([].concat(log)); // console.log("Starting to process log:", { weight }, log);

            _context.next = 3;
            return detectPullup(log, weight || fallbackWeight);

          case 3:
            pullups = _context.sent;
            // console.log("Detected pullups:", pullups);
            dipMarkers = pullups.algo2.data.dips.map(function (data) {
              return _extends({}, data, {
                stroke: colours.green,
                type: MarkerType.dip
              });
            });
            peakMarkers = pullups.algo2.data.peaks.map(function (data) {
              return _extends({}, data, {
                stroke: colours.red,
                type: MarkerType.peak
              });
            }).filter(function (peak) {
              // clean off any bad peak markers
              // get, small things we found on a flat line,
              // or before full weight was on the bar
              // console.log("Checking peak is ok", { weight, y: peak.y });
              if (weight > 0) {
                var isBelow = (peak.y || 0) < weight;
                var peakIsCloseToBodyWeight = isAmountWithinDeviation(peak.y || 0, weight);
                var peakIsTooCloseToBodyWeightToBeLegit = !peakIsCloseToBodyWeight && !isBelow;
                return peakIsTooCloseToBodyWeightToBeLegit;
              } else {
                return true;
              }
            }); // const markers = [...peakMarkers, ...dipMarkers];
            // detect flat, if found add next pullup?
            // detect marker groups, get pullup postion from that.

            moreMarkers = true;
            markerGroup = 0;
            groups = [];

            do {
              group = getMarkersForIndex(peakMarkers, dipMarkers, markerGroup);

              if (group.length > 0) {
                groups.push(group);
                markerGroup += 1;
              } else {
                moreMarkers = false;
              }
            } while (moreMarkers);

            console.log('All marker groups:', groups); // ONLY WORKS IF THERE IS A FLAT:
            // let algo1: PullupReport[] = pullups.algo1.data.map((pullup, index) => {
            //   // console.log("Starting to process:", pullup);
            //   const polltime = 100; // ms
            //   const dataPoints = pullup.length;
            //   const pressureChange = pullup[pullup.length - 1] - pullup[0];
            //   // console.log("pressureChange", pressureChange);
            //   return {
            //     confidence: 0.5, // is pullup
            //     force: -1,
            //     pressureChange: Number(pressureChange.toFixed(2)),
            //     markers: groups[index],
            //   };
            // });

            items = groups.map(function (markerGroup) {
              return {
                confidence: 0,
                markers: markerGroup
              };
            }) // remove any groups that do not have markers
            .filter(function (item) {
              return item.markers && item.markers.length > 0;
            }) // process marker stats
            .map(function (item, index) {
              // we can only really analize the first peak, the others are harder to find
              if (index > 1) {
                return item;
              }

              var pressureChange = -1;
              var firstPeak = item.markers.find(function (marker) {
                return marker.type === 'peak';
              });

              if (firstPeak) {
                var startOfPulup = detectDescendingBeforePoint(log, firstPeak.x);

                if (startOfPulup) {
                  var pullSegment = log.slice(startOfPulup + 1, firstPeak.x + 1); // console.log("pullSegment", pullSegment);

                  pressureChange = pullSegment[pullSegment.length - 1] - pullSegment[0];
                }
              }

              return _extends({}, item, {
                pressureChange: pressureChange
              });
            }); // if no flat found, then work off the marks alone.

            console.log('[Process Log] results:', items); // map markers into places to start and end pullup

            return _context.abrupt("return", {
              // pullupCount is a bit useless, but making an object here to extend later on
              report: {
                items: items,
                pullupCount: items.length
              },
              weight: weight
            });

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function processLog(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

export { detectPullup, detectType, detectWeight, processLog };
//# sourceMappingURL=detect-pullups.esm.js.map
