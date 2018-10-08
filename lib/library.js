(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("lodash"));
	else if(typeof define === 'function' && define.amd)
		define("library", ["_"], factory);
	else if(typeof exports === 'object')
		exports["library"] = factory(require("lodash"));
	else
		root["library"] = factory(root["_"]);
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE_0__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.feeComponents = exports.depreciation = exports.amortisation = undefined;

var _amortisation = __webpack_require__(2);

var _amortisation2 = _interopRequireDefault(_amortisation);

var _depreciation = __webpack_require__(3);

var _depreciation2 = _interopRequireDefault(_depreciation);

var _feeComponents = __webpack_require__(4);

var _feeComponents2 = _interopRequireDefault(_feeComponents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.amortisation = _amortisation2.default;
exports.depreciation = _depreciation2.default;
exports.feeComponents = _feeComponents2.default;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (from, to, startingMonth, term, costOfFunds) {
  var distributionBase = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

  var PVOfValueAtTerm = to / Math.pow(1 + costOfFunds / 12, term);
  var PVDifference = from - PVOfValueAtTerm;

  var longDistribution = _lodash2.default.flatten(Array(Math.ceil(term / 12) + 1).fill(distributionBase));
  var distributionCoefficientsAreValid = distributionBase.every(_lodash2.default.isNumber) && _lodash2.default.max(distributionBase) === 1 && _lodash2.default.min(distributionBase) >= 0;

  if (!distributionCoefficientsAreValid) {
    throw new Error('\n      The distribution array provided has invalid entries\n    ');
  }

  var distributionBaseIsValid = Array.from({ length: 12 }, function (v, i) {
    return i;
  }).every(function (i) {
    return _lodash2.default.sum(longDistribution.slice(i, i + 6)) >= 3 && _lodash2.default.sum(longDistribution.slice(i, i + 12)) >= 9;
  });

  if (!distributionBaseIsValid) {
    throw new Error('\n      You have too many months with reduced payments, or they are too bunched\n      together. Please edit your payment schedule.\n    ');
  }

  var exactDistribution = longDistribution.slice(startingMonth, startingMonth + term);

  exactDistribution[0] = 1; // must pay the full payment on the originating month
  var ratePlusOne = 1 + costOfFunds / 12;
  var basePayment = PVDifference / _lodash2.default.sum(exactDistribution.map(function (k, i) {
    return k / Math.pow(ratePlusOne, i);
  }));
  var payments = exactDistribution.map(function (k) {
    return k * basePayment;
  });
  var amortisation = payments.reduce(function (amort, pmt, i) {
    if (i === 0) {
      amort.push(from - pmt);
    } else {
      amort.push(_lodash2.default.last(amort) * ratePlusOne - pmt);
    }
    return amort;
  }, []);
  var balances = amortisation.map(function (a, i) {
    return a + payments[i];
  });

  return {
    balances: balances,
    payments: payments
  };
};

var _lodash = __webpack_require__(0);

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = exports['default'];

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (rrp, rv, depreciationPower, operatingLife, writeOffMonths) {
  var age = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;

  var depnInWriteOffPeriod = rv / writeOffMonths;

  // linear
  // const k = 2 * ((rrp - rv) - (rv / writeOffMonths * (operatingLife - age))) / (operatingLife - age)**2;
  // parabolic
  // const k = 3 * ((rrp - rv) - (rv / writeOffMonths * (operatingLife - age))) / (operatingLife - age)**3;
  // n-ic
  var k = depreciationPower * (rrp - rv - depnInWriteOffPeriod * operatingLife) / Math.pow(operatingLife, depreciationPower);

  var byMonth = Array.from({
    length: operatingLife + writeOffMonths + 1
  }, function (v, i) {
    if (i === 0) return rrp;
    if (i <= operatingLife) {
      // linear
      // const y = k/2 * ((operatingLife - age)**2 - (i - (operatingLife - age))**2) + depnInWriteOffPeriod * i;
      // parabolic
      // const y = k/3 * ((operatingLife - age)**3 + (i - (operatingLife - age))**3) + depnInWriteOffPeriod * i;
      // n-ic
      var y = k / depreciationPower * (Math.pow(operatingLife, depreciationPower) - Math.pow(i - operatingLife, depreciationPower)) + depnInWriteOffPeriod * i;

      return rrp - y;
    }
    return rv - depnInWriteOffPeriod * (i - operatingLife);
  });

  return byMonth.slice(age);
};

module.exports = exports["default"];

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = __webpack_require__(0);

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function capitalisedOriginationFee(fee, term, rate) {
  return rate / 12 * fee / (1 - Math.pow(1 + rate / 12, -term)) * (1 / (1 + rate / 12));
}

function capitalisedFutureDisposalFee(fee, term, rate) {
  return fee * rate / 12 * (1 / (Math.pow(1 + rate / 12, term) - 1)) * (1 / (1 + rate / 12));
}

exports.default = {
  disposalSchedule: function disposalSchedule(fee, term, rate) {
    var ratePlusOne = 1 + rate / 12;
    var payment = capitalisedFutureDisposalFee(fee, term, rate);
    var accumulation = Array.from({ length: term }, function () {
      return payment;
    }).reduce(function (amort, pmt, i) {
      if (i === 0) {
        amort.push(pmt);
      } else {
        amort.push(_lodash2.default.last(amort) * ratePlusOne + pmt);
      }
      return amort;
    }, []);
    var balances = accumulation.map(function (a, i) {
      return a - payment;
    });

    return {
      balances: [].concat(_toConsumableArray(balances), [fee]),
      payment: payment
    };
  },
  originationSchedule: function originationSchedule(fee, term, rate) {
    var ratePlusOne = 1 + rate / 12;
    var payment = capitalisedOriginationFee(fee, term, rate);
    var amortisation = Array.from({ length: term }, function () {
      return payment;
    }).reduce(function (amort, pmt, i) {
      if (i === 0) {
        amort.push(fee - pmt);
      } else {
        amort.push(_lodash2.default.last(amort) * ratePlusOne - pmt);
      }
      return amort;
    }, []);
    var balances = amortisation.map(function (a, i) {
      return a + payment;
    });

    return {
      balances: [].concat(_toConsumableArray(balances), [0]),
      payment: payment
    };
  }
};
module.exports = exports['default'];

/***/ })
/******/ ]);
});
//# sourceMappingURL=library.js.map