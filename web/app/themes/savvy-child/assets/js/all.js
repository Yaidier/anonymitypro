/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/components/theme.js":
/*!************************************!*\
  !*** ./src/js/components/theme.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
 * Handles the app shared all accross the pages in the site
 *
 * 
 * @package Savvychild
 * */
/**
 * 
 * The main Theme Script
 */
var ScTheme = /*#__PURE__*/function () {
  function ScTheme() {
    var _this = this;
    _classCallCheck(this, ScTheme);
    if (document.readyState != "loading") {
      this.init();
    } else {
      document.addEventListener("DOMContentLoaded", function () {
        _this.init();
      });
    }
  }
  _createClass(ScTheme, [{
    key: "init",
    value: function init() {
      console.log('Streamingwebsites App');
    }
  }]);
  return ScTheme;
}();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ScTheme);

/***/ }),

/***/ "./src/js/sc-app.js":
/*!**************************!*\
  !*** ./src/js/sc-app.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _savvy_src_js_savvy_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../savvy/src/js/savvy-app */ "../savvy/src/js/savvy-app.js");
/* harmony import */ var _components_theme__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/theme */ "./src/js/components/theme.js");
/**
 * Main app file
 *
 * @package Streamingwebsites
 * */



new _components_theme__WEBPACK_IMPORTED_MODULE_1__["default"]();

/***/ }),

/***/ "../savvy/src/js/admin/ajax-handler.js":
/*!*********************************************!*\
  !*** ../savvy/src/js/admin/ajax-handler.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0) { ; } } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
 * Handles the Ajax Hanlder for the admin scripts of the Theme
 *
 * @package Privacysavvy
 * */
var AjaxHandler = /*#__PURE__*/function () {
  function AjaxHandler() {
    _classCallCheck(this, AjaxHandler);
  }
  _createClass(AjaxHandler, null, [{
    key: "call",
    value:
    /**
     * Utility Ajax Hanlder Function
     */
    function () {
      var _call = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var data,
          nonce,
          request,
          url,
          _args = arguments;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                data = _args.length > 0 && _args[0] !== undefined ? _args[0] : false;
                nonce = _args.length > 1 && _args[1] !== undefined ? _args[1] : '';
                if (!(typeof ajax_var == 'undefined' || !data)) {
                  _context.next = 4;
                  break;
                }
                return _context.abrupt("return");
              case 4:
                request = new XMLHttpRequest(), url = new URL(ajax_var.url);
                Object.entries(data).forEach(function (_ref) {
                  var _ref2 = _slicedToArray(_ref, 2),
                    key = _ref2[0],
                    value = _ref2[1];
                  url.searchParams.append(key, value);
                });
                _context.next = 8;
                return new Promise(function (resolve, reject) {
                  request.open('GET', url.href, true);
                  request.onload = function () {
                    if (this.status >= 200 && this.status < 400) {
                      resolve(JSON.parse(this.response));
                    } else {
                      reject(this);
                    }
                  };
                  request.onerror = function () {
                    reject(this);
                  };
                  request.send();
                });
              case 8:
                return _context.abrupt("return", _context.sent);
              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));
      function call() {
        return _call.apply(this, arguments);
      }
      return call;
    }()
  }]);
  return AjaxHandler;
}();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AjaxHandler);

/***/ }),

/***/ "../savvy/src/js/components/article-score.js":
/*!***************************************************!*\
  !*** ../savvy/src/js/components/article-score.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _admin_ajax_handler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../admin/ajax-handler */ "../savvy/src/js/admin/ajax-handler.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
 * Handles the Article Score App of articles
 *
 * @package Privacysavvy
 * */


var SavvyArticleScore = /*#__PURE__*/function () {
  function SavvyArticleScore() {
    var _this = this;
    _classCallCheck(this, SavvyArticleScore);
    if (document.readyState != "loading") {
      this.init();
    } else {
      document.addEventListener("DOMContentLoaded", function () {
        _this.init();
      });
    }
  }
  _createClass(SavvyArticleScore, [{
    key: "init",
    value: function init() {
      console.log('ARTICLE SCORE APP');
      this.as = document.querySelector('.ps-article_score');
      if (!this.as) {
        return;
      }
      this.current_rate = null;
      this.disable_events = false;
      this.is_mobile = screen.width < 1110 ? false : true;
      this.stars_type = {
        full: 'star_full',
        half: 'star_half_empty',
        empty: 'star_radial'
      };
      this.rating_values = Object.assign({}, this.as.dataset.labels.split(','));
      this.content_wrap = document.querySelector('.ps-post_content');
      this.toc_wrap = document.querySelector('.ps-table_of_contents');
      this.stars_wrap = this.as.querySelector('.ps-article_score_stars');
      this.stars = this.stars_wrap.querySelectorAll('i');
      this.info = this.as.querySelector('.ps-article_score_info');
      this.subinfo = this.as.querySelector('.ps-article_score_subinfo');
      this.thanks = this.as.querySelector('.ps-article_score_subinfo_thanks');
      this.star_full_model = this.as.querySelector('.ps-article_score_stars_models .savvy-icon_star_full');
      this.star_empty_model = this.as.querySelector('.ps-article_score_stars_models .savvy-icon_star_radial');
      this.star_half_model = this.as.querySelector('.ps-article_score_stars_models .savvy-icon_star_half_empty');
      this.info_value = this.info.innerHTML;
      this.get_inital_stars_configuration();
      this.stars_wrap_events();
      this.stars_events();
      this.move_element();
      this.on_mobile_event();
    }
  }, {
    key: "get_inital_stars_configuration",
    value: function get_inital_stars_configuration() {
      var _this2 = this;
      this.initial_stars_config = [];
      Array.prototype.forEach.call(this.stars, function (star) {
        _this2.initial_stars_config.push(star.getAttribute('class'));
      });
    }
  }, {
    key: "move_after_content",
    value: function move_after_content() {
      this.content_wrap.parentNode.insertBefore(this.as, this.content_wrap.nextSibling);
    }
  }, {
    key: "move_to_sidebar",
    value: function move_to_sidebar() {
      this.toc_wrap.parentNode.insertBefore(this.as, this.toc_wrap.nextSibling);
    }
  }, {
    key: "move_element",
    value: function move_element() {
      if (!this.toc_wrap) {
        return;
      }
      if (screen.width < 1110) {
        if (this.is_mobile == false) {
          this.move_after_content();
          this.is_mobile = true;
        }
      } else {
        if (this.is_mobile == true) {
          this.move_to_sidebar();
          this.is_mobile = false;
        }
      }
    }
  }, {
    key: "on_mobile_event",
    value: function on_mobile_event() {
      var self = this;
      window.addEventListener('resize', function () {
        self.move_element();
      }, true);
    }
  }, {
    key: "show_rating_value",
    value: function show_rating_value(i) {
      this.current_rate = i;
      this.info.innerHTML = this.rating_values[i - 1];
    }
  }, {
    key: "stars_wrap_events",
    value: function stars_wrap_events() {
      var _this3 = this;
      this.stars_wrap.addEventListener('mouseleave', function () {
        var i = 0;
        if (_this3.disable_events) {
          return;
        }
        Array.prototype.forEach.call(_this3.stars, function (star) {
          var star_class = _this3.initial_stars_config[i],
            star_type = '';
          for (var _i = 0, _Object$keys = Object.keys(_this3.stars_type); _i < _Object$keys.length; _i++) {
            var key = _Object$keys[_i];
            if (star_class == _this3.stars_type[key]) {
              star_type = key;
            }
          }
          star.setAttribute('class', _this3.stars_type[star_type]);
          if (star_type == 'empty') {
            star.innerHTML = _this3.star_empty_model.innerHTML;
          }
          if (star_type == 'half') {
            star.innerHTML = _this3.star_half_model.innerHTML;
          }
          if (star_type == 'full') {
            star.innerHTML = _this3.star_full_model.innerHTML;
          }
          i++;
        });
        _this3.info.innerHTML = _this3.info_value;
      });
    }
  }, {
    key: "already_voted",
    value: function already_voted() {
      this.disable_events = true;
      this.subinfo.classList.add('hidden');
      this.thanks.classList.remove('hidden');
    }
  }, {
    key: "send_vote_to_server",
    value: function send_vote_to_server(vote) {
      if (!ps_single_post_id) {
        console.log('Error sending vote to server, \'post_id\' is missing');
        return;
      }
      if (!vote) {
        console.log('Error sending vote to server, \'vote value\' is missing');
        return;
      }
      var args = {
        action: 'article_score_handler',
        post_id: ps_single_post_id,
        vote: vote
      };
      _admin_ajax_handler__WEBPACK_IMPORTED_MODULE_0__["default"].call(args).then(function (data) {
        console.log(data);
      })["catch"](function (error) {
        console.log(error);
      });
    }
  }, {
    key: "stars_events",
    value: function stars_events() {
      var _this4 = this;
      var current_stars_conf = {};
      var i = 0;
      Array.prototype.forEach.call(this.stars, function (star) {
        if (!_this4.currrent_stars_conf) {
          for (var _i2 = 0, _Object$keys2 = Object.keys(_this4.stars_type); _i2 < _Object$keys2.length; _i2++) {
            var key = _Object$keys2[_i2];
            if (star.classList.contains(_this4.stars_type[key])) {
              current_stars_conf[i] = _this4.stars_type[key];
              i++;
            }
          }
        }
        _this4.register_star_mouse_over_event(star);
        _this4.register_star_mouse_leave_event(star);
        _this4.register_star_click_event(star);
        if (!_this4.currrent_stars_conf) {
          _this4.currrent_stars_conf = current_stars_conf;
        }
      });
    }
  }, {
    key: "register_star_mouse_over_event",
    value: function register_star_mouse_over_event(star) {
      var _this5 = this;
      star.addEventListener('mouseover', function () {
        if (_this5.disable_events) {
          return;
        }
        if (_this5.current_hover_star == star) {
          return;
        }
        _this5.current_hover_star = star;
        _this5.fill_up_to_this_star(star);
      });
    }
  }, {
    key: "register_star_mouse_leave_event",
    value: function register_star_mouse_leave_event(star) {
      var _this6 = this;
      star.addEventListener('mouseleave', function () {
        if (_this6.disable_events) {
          return;
        }
        _this6.current_hover_star = null;
      });
    }
  }, {
    key: "register_star_click_event",
    value: function register_star_click_event(star) {
      var _this7 = this;
      star.addEventListener('click', function () {
        if (_this7.disable_events) {
          return;
        }
        _this7.already_voted();

        /**
         * Read cookie if exist 
         */
        _this7.setCookie('ps-article-score-voted', false, 0);
        if (!_this7.getCookie('ps-article-score-voted')) {
          _this7.setCookie('ps-article-score-voted', true, 7);
          _this7.send_vote_to_server(_this7.current_rate);
        }
      });
    }
  }, {
    key: "setCookie",
    value: function setCookie(cname, cvalue, days) {
      var d = new Date();
      d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
      var expires = "expires=" + d.toUTCString();
      document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }
  }, {
    key: "getCookie",
    value: function getCookie(cname) {
      var name = cname + "=";
      var decodedCookie = decodeURIComponent(document.cookie);
      var ca = decodedCookie.split(';');
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    }
  }, {
    key: "fill_up_to_this_star",
    value: function fill_up_to_this_star(hovered_star) {
      var _this8 = this;
      var equal_reached = false;
      var i = 1;
      Array.prototype.forEach.call(this.stars, function (star) {
        for (var _i3 = 0, _Object$keys3 = Object.keys(_this8.stars_type); _i3 < _Object$keys3.length; _i3++) {
          var key = _Object$keys3[_i3];
          star.classList.remove(_this8.stars_type[key]);
        }
        if (!equal_reached) {
          star.innerHTML = _this8.star_full_model.innerHTML;
          star.classList.add(_this8.stars_type['full']);
        } else {
          star.innerHTML = _this8.star_empty_model.innerHTML;
          star.classList.add(_this8.stars_type['empty']);
        }
        if (hovered_star == star) {
          equal_reached = true;
          _this8.show_rating_value(i);
        }
        i++;
      });
    }
  }]);
  return SavvyArticleScore;
}();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SavvyArticleScore);

/***/ }),

/***/ "../savvy/src/js/components/glider.js":
/*!********************************************!*\
  !*** ../savvy/src/js/components/glider.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
 * Handles the Glider
 *
 * @package Privacysavvy
 * 
 * */
var Glider = /*#__PURE__*/function () {
  function Glider(carousel) {
    _classCallCheck(this, Glider);
    /**
     * Get Carousel Wrapper.
     */
    this.carousel = carousel.querySelector('.wn-carousel_wrapper');

    /**
     * If Carousel Wrapper do not exist, then we proably are with a new version of the carousel,
     * so lets set up the elements.
     */
    if (!this.carousel) {
      /**
       * Setup carousel elements.
       */
      this.setup_carousel_elements(carousel);

      /**
       * Try to get the carousel wrapper again.
       */
      this.carousel = carousel.querySelector('.wn-carousel_wrapper');
    }

    /**
     * Get the other elements of the carousel.
     */
    this.carousel_slider = this.carousel.querySelector('.wn-carousel_slider');
    this.carousel_items = this.get_carousel_items();

    //We need at least two items to be able of slide
    if (this.carousel_items.length > 1) {
      this.init_carousel(carousel);
    }
  }
  _createClass(Glider, [{
    key: "setup_carousel_elements",
    value: function setup_carousel_elements(carousel) {
      /**
       * Create the carousel wrapper.
       */
      var carousel_wrapper = document.createElement('div');
      carousel_wrapper.classList.add('wn-carousel_wrapper');
      carousel_wrapper.style.overflow = 'hidden';

      /**
       * Create the carousel slider.
       */
      var carousel_slider = document.createElement('div');
      carousel_slider.classList.add('wn-carousel_slider');
      carousel_slider.style.display = 'flex';

      /**
       * Append all carousel items to the slider.
       */
      carousel.querySelectorAll('.wn-carousel_item').forEach(function (item) {
        carousel_slider.append(item);
      });

      /**
       * Append the carousel slider to the carousel wrapper.
       */
      carousel_wrapper.append(carousel_slider);

      /**
       * Append the wrapper to the carousel element.
       */
      carousel.append(carousel_wrapper);

      /**
       * Remove flex style from the carousel.
       */
      carousel.style.display = 'block';
    }
  }, {
    key: "init_carousel",
    value: function init_carousel(carousel) {
      var _carousel$dataset$des, _this$carousel$datase, _carousel$dataset$tab, _this$carousel$datase2, _carousel$dataset$mob, _this$carousel$datase3, _carousel$dataset$aut, _carousel$dataset$dur, _carousel$dataset$tra, _carousel$dataset$aut2, _carousel$dataset$aut3;
      console.log('Timeout');
      console.log(carousel.dataset.autoplaydelay);
      this.carousel.slides_to_show_desktop = (_carousel$dataset$des = carousel.dataset.desktop) !== null && _carousel$dataset$des !== void 0 ? _carousel$dataset$des : (_this$carousel$datase = this.carousel.dataset.desktop) !== null && _this$carousel$datase !== void 0 ? _this$carousel$datase : 3;
      this.carousel.slides_to_show_tablet = (_carousel$dataset$tab = carousel.dataset.tablet) !== null && _carousel$dataset$tab !== void 0 ? _carousel$dataset$tab : (_this$carousel$datase2 = this.carousel.dataset.tablet) !== null && _this$carousel$datase2 !== void 0 ? _this$carousel$datase2 : 2;
      this.carousel.slides_to_show_mobile = (_carousel$dataset$mob = carousel.dataset.mobile) !== null && _carousel$dataset$mob !== void 0 ? _carousel$dataset$mob : (_this$carousel$datase3 = this.carousel.dataset.mobile) !== null && _this$carousel$datase3 !== void 0 ? _this$carousel$datase3 : 1;
      this.carousel.is_autoplay = (_carousel$dataset$aut = carousel.dataset.autoplay) !== null && _carousel$dataset$aut !== void 0 ? _carousel$dataset$aut : 'false';
      this.carousel.transition_duration = parseInt((_carousel$dataset$dur = carousel.dataset.duration) !== null && _carousel$dataset$dur !== void 0 ? _carousel$dataset$dur : 400);
      this.carousel.transitiontype = (_carousel$dataset$tra = carousel.dataset.transitiontype) !== null && _carousel$dataset$tra !== void 0 ? _carousel$dataset$tra : 'ease';
      this.carousel.autoplay_direction = (_carousel$dataset$aut2 = carousel.dataset.autoplaydirection) !== null && _carousel$dataset$aut2 !== void 0 ? _carousel$dataset$aut2 : 'right';
      this.carousel.autoplay_delay = parseInt((_carousel$dataset$aut3 = carousel.dataset.autoplaydelay) !== null && _carousel$dataset$aut3 !== void 0 ? _carousel$dataset$aut3 : 0);
      this.carousel.is_nav_buttons_active = true;
      this.carousel.items_lateral_margin_sum = this.get_element_lateral_margin_sum();
      this.carousel.wrapper_lateral_padding = this.get_wrapper_lateral_padding_sum();
      this.set_slides_to_show();
      this.set_items_width();
      this.clone_last_item();
      this.move_slider_next(false);
      this.register_nav_btns_events();
      this.register_resize_event();
      this.register_swiper();
      this.set_autoplay();
    }
  }, {
    key: "set_autoplay",
    value: function set_autoplay() {
      var self = this;
      if ('false' === this.carousel.is_autoplay) {
        return;
      }
      if ('right' === this.carousel.autoplay_direction) {
        this.move_next();
      } else {
        this.move_prev();
      }
      if (this.carousel.autoplay_event_already_set) {
        return;
      }
      this.carousel_slider.addEventListener('transitionend', function () {
        setTimeout(function () {
          if ('right' === self.carousel.autoplay_direction) {
            self.move_next();
          } else {
            self.move_prev();
          }
        }, self.carousel.autoplay_delay);
      });
      this.carousel.autoplay_event_already_set = true;
    }
  }, {
    key: "set_carousel_wrapper_height",
    value: function set_carousel_wrapper_height() {
      var carousel_swiper_height = this.get_compouted_style(this.carousel_slider, 'height'),
        carousel_vertical_padding_sum = this.get_compouted_style(this.carousel, 'paddingBottom'),
        height_to_set = carousel_swiper_height + carousel_vertical_padding_sum;
      this.set_dimmension('height', this.carousel, height_to_set);
    }
  }, {
    key: "get_translate_values",
    value: function get_translate_values(element) {
      var style = window.getComputedStyle(element);
      var matrix = style['transform'] || style.webkitTransform || style.mozTransform;
      if (matrix === 'none' || typeof matrix === 'undefined') {
        return {
          x: '0',
          y: '0',
          z: '0'
        };
      }
      var matrixType = matrix.includes('3d') ? '3d' : '2d';
      var matrixValues = matrix.match(/matrix.*\((.+)\)/)[1].split(', ');
      if (matrixType === '2d') {
        return {
          x: matrixValues[4],
          y: matrixValues[5],
          z: 0
        };
      }
      if (matrixType === '3d') {
        return {
          x: matrixValues[12],
          y: matrixValues[13],
          z: matrixValues[14]
        };
      }
    }
  }, {
    key: "register_swiper",
    value: function register_swiper() {
      var self = this,
        xDown = null,
        yDown = null;
      this.carousel.addEventListener('touchstart', handle_touch_start, {
        passive: true
      });
      this.carousel.addEventListener('touchmove', handle_touch_move, {
        passive: true
      });
      function get_touches(evt) {
        return evt.touches || evt.originalEvent.touches;
      }
      function handle_touch_start(evt) {
        var firstTouch = get_touches(evt)[0];
        xDown = firstTouch.clientX;
        yDown = firstTouch.clientY;
      }
      ;
      function handle_touch_move(evt) {
        if (!xDown || !yDown) {
          return;
        }
        var xUp = evt.touches[0].clientX,
          yUp = evt.touches[0].clientY,
          xDiff = xDown - xUp,
          yDiff = yDown - yUp;
        if (Math.abs(xDiff) > Math.abs(yDiff)) {
          if (xDiff > 0) {
            /* right swipe */
            self.move_next();
          } else {
            self.move_prev();
          }
        }
        xDown = null;
        yDown = null;
      }
      ;
    }
  }, {
    key: "get_wrapper_lateral_padding_sum",
    value: function get_wrapper_lateral_padding_sum() {
      var padding_left = this.get_compouted_style(this.carousel, 'paddingLeft'),
        padding_right = this.get_compouted_style(this.carousel, 'paddingRight');
      return padding_left + padding_right;
    }
  }, {
    key: "get_wrapper_vertical_padding_sum",
    value: function get_wrapper_vertical_padding_sum() {
      var padding_top = this.get_compouted_style(this.carousel, 'paddingTop'),
        padding_bottom = this.get_compouted_style(this.carousel, 'paddingBottom');
      return padding_top + padding_bottom;
    }
  }, {
    key: "set_slides_to_show",
    value: function set_slides_to_show() {
      var items_count = this.carousel_items.length;
      if (window.innerWidth < 1024 && window.innerWidth >= 767) {
        this.carousel.slides_to_show = this.carousel.slides_to_show_tablet;
      } else if (window.innerWidth < 767) {
        this.carousel.slides_to_show = this.carousel.slides_to_show_mobile;
      } else {
        this.carousel.slides_to_show = this.carousel.slides_to_show_desktop;
      }
      if (items_count <= this.carousel.slides_to_show) {
        this.carousel.slides_to_show = items_count - 1;
      }
    }
  }, {
    key: "register_resize_event",
    value: function register_resize_event() {
      var _this = this;
      var doit;
      window.addEventListener('resize', function () {
        var move = _this.get_initial_left();
        _this.set_slides_to_show();
        _this.move_without_transition(move);
        _this.set_items_width();
        clearTimeout(doit);
        doit = setTimeout(function () {
          _this.set_autoplay();
        }, 500);
      }, true);
    }
  }, {
    key: "get_initial_left",
    value: function get_initial_left() {
      return '-' + parseFloat(this.carousel.single_item_width + this.carousel.items_lateral_margin_sum);
    }
  }, {
    key: "clone_last_item",
    value: function clone_last_item() {
      var item = this.get_carousel_items()[this.get_carousel_items().length - 1],
        cloned_item = item.cloneNode(true);
      item.parentNode.insertBefore(cloned_item, item.parentNode.firstChild);
      setTimeout(function () {
        if (!item.parentNode) {
          return;
        }
        item.parentNode.removeChild(item);
      }, this.carousel.transition_duration);
    }
  }, {
    key: "clone_first_item",
    value: function clone_first_item() {
      var item = this.get_carousel_items()[0],
        cloned_item = item.cloneNode(true);
      item.parentNode.appendChild(cloned_item);
      item.parentNode.removeChild(item);
    }
  }, {
    key: "move_slider_next",
    value: function move_slider_next() {
      var is_transtion = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var current_translate = this.get_translate_values(this.carousel_slider).x.replace('px', '') || 0,
        move = parseFloat(current_translate) - parseFloat(this.carousel.single_item_width + this.carousel.items_lateral_margin_sum);
      if (!is_transtion) {
        this.move_without_transition(move);
      } else {
        this.move_with_transition(move);
      }
    }
  }, {
    key: "move_slider_prev",
    value: function move_slider_prev() {
      var is_transtion = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var current_translate = this.get_translate_values(this.carousel_slider).x.replace('px', '') || 0,
        move = parseFloat(current_translate) + parseFloat(this.carousel.single_item_width + this.carousel.items_lateral_margin_sum);
      if (!is_transtion) {
        this.move_without_transition(move);
      } else {
        this.move_with_transition(move);
      }
    }
  }, {
    key: "move_with_transition",
    value: function move_with_transition(move) {
      this.carousel_slider.style.transform = 'translate3d( ' + move + 'px, 0px, 0px )';
    }
  }, {
    key: "move_without_transition",
    value: function move_without_transition(move) {
      this.carousel_slider.style.transition = 'none';
      this.carousel_slider.style.transform = 'translate3d( ' + move + 'px, 0px, 0px )';
      this.carousel_slider.offsetHeight;
      this.carousel_slider.style.transition = 'transform ' + this.carousel.transition_duration / 1000 + 's ' + this.carousel.transitiontype;
    }
  }, {
    key: "register_nav_btns_events",
    value: function register_nav_btns_events() {
      var _this2 = this;
      var next_btn = this.carousel.parentNode.querySelector('.wn-carousel_btn_next'),
        prev_btn = this.carousel.parentNode.querySelector('.wn-carousel_btn_prev');
      if (!next_btn && !prev_btn) {
        return;
      }
      next_btn.addEventListener('click', function () {
        _this2.move_next();
      });
      prev_btn.addEventListener('click', function () {
        _this2.move_prev();
      });
    }
  }, {
    key: "nav_buttons_status",
    value: function nav_buttons_status() {
      var _this3 = this;
      if (!this.carousel.is_nav_buttons_active) {
        return false;
      } else {
        this.carousel.is_nav_buttons_active = false;
        setTimeout(function () {
          _this3.carousel.is_nav_buttons_active = true;
        }, this.carousel.transition_duration);
        return true;
      }
    }
  }, {
    key: "move_next",
    value: function move_next() {
      if (!this.nav_buttons_status() && !this.carousel.is_autoplay) {
        return;
      }
      this.clone_first_item();
      this.move_slider_prev(false);
      this.move_slider_next();
    }
  }, {
    key: "move_prev",
    value: function move_prev() {
      if (!this.nav_buttons_status() && !this.carousel.is_autoplay) {
        return;
      }
      this.clone_last_item();
      this.move_slider_next(false);
      this.move_slider_prev();
    }
  }, {
    key: "get_carousel_items",
    value: function get_carousel_items() {
      return this.carousel.querySelectorAll('.wn-carousel_item');
    }
  }, {
    key: "set_items_width",
    value: function set_items_width() {
      var _this4 = this;
      var carousel_width = this.get_compouted_style(this.carousel, 'width'),
        item_width = carousel_width / this.carousel.slides_to_show - this.carousel.items_lateral_margin_sum;
      Array.prototype.forEach.call(this.get_carousel_items(), function (item) {
        _this4.carousel.single_item_width = item_width;
        _this4.set_dimmension('width', item, item_width);
      });
    }
  }, {
    key: "get_element_lateral_margin_sum",
    value: function get_element_lateral_margin_sum() {
      //Assuming all the items has the same margin...
      var one_item = this.carousel.querySelector('.wn-carousel_item');
      if (one_item) {
        var margin_left = this.get_compouted_style(one_item, 'marginLeft'),
          margin_right = this.get_compouted_style(one_item, 'marginRight');
        return margin_left + margin_right;
      }
      return 0;
    }
  }, {
    key: "get_compouted_style",
    value: function get_compouted_style(element, style) {
      return parseFloat(getComputedStyle(element, null)[style].replace("px", ""));
    }
  }, {
    key: "set_dimmension",
    value: function set_dimmension(dimmension, el, val) {
      if (typeof val === "function") val = val();
      if (typeof val === "string") el.style.height = val;else el.style[dimmension] = val + "px";
    }
  }]);
  return Glider;
}();
var SavvyGlider = /*#__PURE__*/function () {
  function SavvyGlider() {
    var _this5 = this;
    _classCallCheck(this, SavvyGlider);
    if (document.readyState != "loading") {
      this.init();
    } else {
      document.addEventListener("DOMContentLoaded", function () {
        _this5.init();
      });
    }
  }
  _createClass(SavvyGlider, [{
    key: "init",
    value: function init() {
      var carousels = document.querySelectorAll('.wn-carousel');
      Array.prototype.forEach.call(carousels, function (carousel) {
        new Glider(carousel);
      });

      /**
       * Export Glider for external usage
       */
      window.wnglider = Glider;
    }
  }]);
  return SavvyGlider;
}();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SavvyGlider);

/***/ }),

/***/ "../savvy/src/js/components/nav-menu.js":
/*!**********************************************!*\
  !*** ../savvy/src/js/components/nav-menu.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
 * Handles the Nav Menu of the Theme
 *
 * @package Savvy
 * */
var SavvyNavMenu = /*#__PURE__*/function () {
  function SavvyNavMenu() {
    var _this = this;
    _classCallCheck(this, SavvyNavMenu);
    if (document.readyState != "loading") {
      this.init();
    } else {
      document.addEventListener("DOMContentLoaded", function () {
        _this.init();
      });
    }
  }
  _createClass(SavvyNavMenu, [{
    key: "init",
    value: function init() {
      this.theme_header = document.querySelector('#ps-header');
      this.nav_menu = document.querySelector('#ps-header_main_nav_menu');
      if (this.theme_header && this.nav_menu) {
        this.prevent_default_on_mobile();
        this.register_open_mobile_nav();
        this.register_close_btn();
      }
    }
  }, {
    key: "register_open_mobile_nav",
    value: function register_open_mobile_nav() {
      var self = this,
        open_btns = this.theme_header.querySelectorAll('.ps-header_nav_menu_btn__open');
      Array.prototype.forEach.call(open_btns, function (btn) {
        btn.addEventListener('click', function () {
          self.theme_header.classList.add('ps-header_nav_menu__active');
        });
      });
    }
  }, {
    key: "register_close_btn",
    value: function register_close_btn() {
      var self = this,
        close_btns = this.theme_header.querySelectorAll('.ps-header_nav_menu_btn__close');
      Array.prototype.forEach.call(close_btns, function (btn) {
        btn.addEventListener('click', function () {
          self.theme_header.classList.remove('ps-header_nav_menu__active');
        });
      });
    }
  }, {
    key: "prevent_default_on_mobile",
    value: function prevent_default_on_mobile() {
      var self = this,
        items_to_prevent_default = self.nav_menu.querySelectorAll('.ps-prevent_default_mobile');
      Array.prototype.forEach.call(items_to_prevent_default, function (item, i) {
        item.addEventListener('click', function (e) {
          if (!self.is_on_mobile_view()) {
            return;
          }
          if (!self.is_dropdwon_link(item)) {
            return;
          }
          e.preventDefault();
        });
      });
      window.addEventListener('resize', function () {
        self.is_on_mobile_view();
      }, {
        passive: true
      });
    }
  }, {
    key: "is_dropdwon_link",
    value: function is_dropdwon_link(item) {
      var sibliings = item.parentNode.children,
        status = false;
      Array.prototype.forEach.call(sibliings, function (sibling, i) {
        if (sibling.classList.contains('ps-header__dropdown')) {
          status = true;
        }
      });
      return status;
    }
  }, {
    key: "is_on_mobile_view",
    value: function is_on_mobile_view() {
      if (window.screen.width < 1110) {
        return true;
      }
      return false;
    }
  }]);
  return SavvyNavMenu;
}();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SavvyNavMenu);

/***/ }),

/***/ "../savvy/src/js/components/popup.js":
/*!*******************************************!*\
  !*** ../savvy/src/js/components/popup.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _theme__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./theme */ "../savvy/src/js/components/theme.js");
/* harmony import */ var _triggers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./triggers */ "../savvy/src/js/components/triggers.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
 * Handles the Popup of the Theme
 *
 * @package Privacysavvy
 * */



var SavvyPopup = /*#__PURE__*/function () {
  function SavvyPopup() {
    var _this = this;
    _classCallCheck(this, SavvyPopup);
    if (document.readyState != "loading") {
      this.init();
    } else {
      document.addEventListener("DOMContentLoaded", function () {
        _this.init();
      });
    }
  }
  _createClass(SavvyPopup, [{
    key: "register_close_buttons",
    value: function register_close_buttons() {
      var _this2 = this;
      var close_btns = this.popup.querySelectorAll('.ps-popup_btn_close');

      /**
       * Close the modal when user clicks on 
       * an element with the .ps-popup_btn_close class
       */
      Array.prototype.forEach.call(close_btns, function (btn) {
        btn.addEventListener('click', function (e) {
          _this2.popup.classList.remove('ps-popup__active');
          _this2.remove_hash_from_url();
        });
      });

      /**
       * Close the modal also when user 
       * clicks outside the modal window
       */
      this.popup.addEventListener('click', function (e) {
        if (e.target == _this2.popup) {
          _this2.popup.classList.remove('ps-popup__active');
          _this2.remove_hash_from_url();
        }
      });
    }
  }, {
    key: "remove_hash_from_url",
    value: function remove_hash_from_url() {
      if (!this.is_vpn_offer) {
        return;
      }
      window.history.replaceState({}, document.title, this.url.pathname);
    }
  }, {
    key: "init",
    value: function init() {
      var _this3 = this;
      /**
       * If we find #vpnoffer on the url, 
       * then we need to trigger the popup right away.
       */
      this.url = new URL(window.location.href);
      this.is_vpn_offer = this.url.hash === '#vpnoffer' ? true : false;

      /**
       * Verify if Popup is set to be called on the LRC,
       * if so, then do nothing and wait for the lrc popup callback
       * to init this class
       */
      var popup_details = undefined;
      if (_theme__WEBPACK_IMPORTED_MODULE_0__["default"].instance().check_lrc_resources()) {
        Array.prototype.every.call(ps_lrc_resources, function (resource) {
          if (resource.resource_name == 'lrc_popups') {
            popup_details = resource;
            return false;
          }
          return true;
        });
      }

      /**
       * Open the Popup if the hash #vpnoffer 
       * is present in the url, otherwise wait 25s
       */
      if (this.is_vpn_offer) {
        /**
         * If is set to be called in the lrc,
         * then we need to get it right away and then
         * remove it from lrc in order to avoid duplicates.
         */
        if (popup_details) {
          console.log('Is VPN Offer and popup was set to open on LRC');
          console.log(popup_details);
          var args = {
            action: 'popup_handler',
            template: popup_details.include_popup,
            link: popup_details.popup_link,
            post_id: ps_single_post_id
          };
          _theme__WEBPACK_IMPORTED_MODULE_0__["default"].instance().ajax_handler(args).then(function (data) {
            _theme__WEBPACK_IMPORTED_MODULE_0__["default"].instance().popup_inserter(data.callback_args, data.data);

            /**
             * Show the popup as soon as it gets inserted into the DOM
             */
            _this3.initialize();

            /**
             * Remove the popup call from the ps_lrc_resources
             */
            ps_lrc_resources.forEach(function (item, index, object) {
              if (item.resource_name == 'lrc_popups') {
                object.splice(index, 1);
              }
            });
          })["catch"](function (error) {
            console.log(error);
          });
        } else {
          this.initialize();
        }
      } else {
        if (!popup_details) {
          setTimeout(function () {
            console.log('Triggering the popup');
            _this3.initialize();
          }, 25000);
        } else {
          /**
           * Do nothing here.
           * if the popup is set to be called from
           * the lrc then wait for the callback to 
           * creates a new instance of this class.
           * 
           * @see SavvyTheme.popup_inserter();
           */
        }
      }
    }
  }, {
    key: "initialize",
    value: function initialize() {
      this.popup = document.getElementById('ps-popup');
      if (!this.popup) {
        return;
      }

      /**
       * Add the active class.
       */
      this.popup.classList.add('ps-popup__active');
      this.register_close_buttons();
      this.register_triggers();
    }
  }, {
    key: "register_triggers",
    value: function register_triggers() {
      var triggers = this.popup.querySelectorAll('.ps-triggers');
      if (triggers) {
        Array.prototype.forEach.call(triggers, function (trigger) {
          _triggers__WEBPACK_IMPORTED_MODULE_1__["default"].register_trigger(trigger);
        });
      }
    }
  }]);
  return SavvyPopup;
}();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SavvyPopup);

/***/ }),

/***/ "../savvy/src/js/components/sharer.js":
/*!********************************************!*\
  !*** ../savvy/src/js/components/sharer.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
/**
 * @preserve
 * Sharer.js
 *
 * @description Create your own social share buttons
 * @version 0.5.1
 * @author Ellison Leao <ellisonleao@gmail.com>
 * @license MIT
 *
 */

/**
 * @constructor
 */
var Sharer = function Sharer(elem) {
  this.elem = elem;
};

/**
 *  @function init
 *  @description bind the events for multiple sharer elements
 *  @returns {Empty}
 */
Sharer.init = function () {
  var elems = document.querySelectorAll('[data-sharer]'),
    i,
    l = elems.length;
  for (i = 0; i < l; i++) {
    elems[i].addEventListener('click', Sharer.add);
  }
};

/**
 *  @function add
 *  @description bind the share event for a single dom element
 *  @returns {Empty}
 */
Sharer.add = function (elem) {
  var target = elem.currentTarget || elem.srcElement;
  var sharer = new Sharer(target);
  sharer.share();
};

// instance methods
Sharer.prototype = {
  constructor: Sharer,
  /**
   *  @function getValue
   *  @description Helper to get the attribute of a DOM element
   *  @param {String} attr DOM element attribute
   *  @returns {String|Empty} returns the attr value or empty string
   */
  getValue: function getValue(attr) {
    var val = this.elem.getAttribute('data-' + attr);
    // handing facebook hashtag attribute
    if (val && attr === 'hashtag') {
      if (!val.startsWith('#')) {
        val = '#' + val;
      }
    }
    return val === null ? '' : val;
  },
  /**
   * @event share
   * @description Main share event. Will pop a window or redirect to a link
   * based on the data-sharer attribute.
   */
  share: function share() {
    var sharer = this.getValue('sharer').toLowerCase(),
      sharers = {
        facebook: {
          shareUrl: 'https://www.facebook.com/sharer/sharer.php',
          params: {
            u: this.getValue('url'),
            hashtag: this.getValue('hashtag'),
            quote: this.getValue('quote')
          }
        },
        linkedin: {
          shareUrl: 'https://www.linkedin.com/shareArticle',
          params: {
            url: this.getValue('url'),
            mini: true
          }
        },
        twitter: {
          shareUrl: 'https://twitter.com/intent/tweet/',
          params: {
            text: this.getValue('title'),
            url: this.getValue('url'),
            hashtags: this.getValue('hashtags'),
            via: this.getValue('via')
          }
        },
        email: {
          shareUrl: 'mailto:' + this.getValue('to'),
          params: {
            subject: this.getValue('subject'),
            body: this.getValue('title') + '\n' + this.getValue('url')
          }
        },
        whatsapp: {
          shareUrl: this.getValue('web') === 'true' ? 'https://web.whatsapp.com/send' : 'https://wa.me/',
          params: {
            phone: this.getValue('to'),
            text: this.getValue('title') + ' ' + this.getValue('url')
          }
        },
        telegram: {
          shareUrl: 'https://t.me/share',
          params: {
            text: this.getValue('title'),
            url: this.getValue('url')
          }
        },
        reddit: {
          shareUrl: 'https://www.reddit.com/submit',
          params: {
            url: this.getValue('url'),
            title: this.getValue('title')
          }
        }
      },
      s = sharers[sharer];

    // custom popups sizes
    if (s) {
      s.width = this.getValue('width');
      s.height = this.getValue('height');
    }
    return s !== undefined ? this.urlSharer(s) : false;
  },
  /**
   * @event urlSharer
   * @param {Object} sharer
   */
  urlSharer: function urlSharer(sharer) {
    var p = sharer.params || {},
      keys = Object.keys(p),
      i,
      str = keys.length > 0 ? '?' : '';
    for (i = 0; i < keys.length; i++) {
      if (str !== '?') {
        str += '&';
      }
      if (p[keys[i]]) {
        str += keys[i] + '=' + encodeURIComponent(p[keys[i]]);
      }
    }
    sharer.shareUrl += str;
    var isLink = this.getValue('link') === 'true';
    var isBlank = this.getValue('blank') === 'true';
    if (isLink) {
      if (isBlank) {
        window.open(sharer.shareUrl, '_blank');
      } else {
        window.location.href = sharer.shareUrl;
      }
    } else {
      // defaults to popup if no data-link is provided
      var popWidth = sharer.width || 600,
        popHeight = sharer.height || 480,
        left = window.innerWidth / 2 - popWidth / 2 + window.screenX,
        top = window.innerHeight / 2 - popHeight / 2 + window.screenY,
        popParams = 'scrollbars=no, width=' + popWidth + ', height=' + popHeight + ', top=' + top + ', left=' + left,
        newWindow = window.open(sharer.shareUrl, '', popParams);
      if (window.focus) {
        newWindow.focus();
      }
    }
  }
};
var SavvySharer = /*#__PURE__*/_createClass(function SavvySharer() {
  _classCallCheck(this, SavvySharer);
  if (document.readyState != "loading") {
    Sharer.init();
  } else {
    document.addEventListener("DOMContentLoaded", function () {
      Sharer.init();
    });
  }

  /**
   * exporting sharer for external usage
   */
  window.Sharer = Sharer;
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SavvySharer);

/***/ }),

/***/ "../savvy/src/js/components/table-of-contents.js":
/*!*******************************************************!*\
  !*** ../savvy/src/js/components/table-of-contents.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
 * Handles the Table of Contents live progress bar
 *
 * @package Privacysavvy
 * */
var SavvyTableOfContents = /*#__PURE__*/function () {
  function SavvyTableOfContents() {
    var _this = this;
    var override_ldl = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    _classCallCheck(this, SavvyTableOfContents);
    if (document.readyState != "loading") {
      this.init(override_ldl);
    } else {
      document.addEventListener("DOMContentLoaded", function () {
        _this.init(override_ldl);
      });
    }
  }
  _createClass(SavvyTableOfContents, [{
    key: "calculate_length",
    value: function calculate_length(heading, toc_heading, last_element) {
      var heading_next_sibling = '';
      if (last_element) {
        heading_next_sibling = last_element;
      } else {
        var toc_next_sibling = toc_heading.parentElement.nextElementSibling.nextElementSibling.children[0];
        var href_attr = toc_next_sibling.getAttribute('href');
        heading_next_sibling = this.post_content.querySelector(href_attr);
      }
      if (!heading_next_sibling) {
        return;
      }
      var top_dis_heading = heading.getBoundingClientRect().top;
      var top_dis__next_sibling = heading_next_sibling.getBoundingClientRect().top;
      var dis_between = top_dis__next_sibling - top_dis_heading;
      var ref_point = top_dis__next_sibling - 100;
      var percentage = ref_point * 100 / dis_between;
      var positive_percentage = 100 - percentage.toFixed(1);
      return positive_percentage;
    }
  }, {
    key: "draw_line",
    value: function draw_line(percentage) {
      var active_li = this.toc.querySelector('nav > ol > li.ps-toc_heading__active');
      active_li.setAttribute('style', '--ps_toc_line_width: ' + percentage + '%;');
    }
  }, {
    key: "is_in_viewport",
    value: function is_in_viewport(el) {
      return el.getBoundingClientRect().top >= 100;
    }
  }, {
    key: "do_autoscroll",
    value: function do_autoscroll() {
      var active_elements_collection = this.toc.querySelectorAll('.ps-toc_heading__active');
      if (active_elements_collection.length == 0) {
        return;
      }
      var first_li_element = this.toc.querySelector('nav > ol > li');
      var last_element_active = active_elements_collection[active_elements_collection.length - 1];
      var first_li_element_dist = first_li_element.getBoundingClientRect().top;
      var last_element_active_dist = last_element_active.getBoundingClientRect().top;
      var toc = document.querySelector('.ps-table_of_contents');
      toc.scrollTo({
        left: 0,
        top: last_element_active_dist - first_li_element_dist,
        behavior: 'smooth'
      });
    }
  }, {
    key: "apply_active",
    value: function apply_active(heading) {
      var last_element = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var heading_id = heading.getAttribute('id');
      var tag_name = heading.tagName.toLowerCase();
      var toc_heading = this.toc.querySelector('a[href="#' + heading_id + '"]');
      if (!toc_heading) {
        return;
      }
      if (this.current_active_heading != toc_heading) {
        Array.prototype.forEach.call(this.toc_lis, function (this_toc_li) {
          this_toc_li.classList.remove('ps-toc_heading__active');
        });
        if (tag_name === 'h3') {
          toc_heading.closest('li.relative').classList.add('ps-toc_heading__active');
        }
        toc_heading.parentElement.classList.add('ps-toc_heading__active');
        this.current_active_heading = toc_heading;
        this.do_autoscroll();
      } else {
        if (tag_name === 'h3') {
          toc_heading = toc_heading.closest('li.relative').children[0];
          heading = this.post_content.querySelector(toc_heading.getAttribute('href'));
        }
        var percentage = this.calculate_length(heading, toc_heading, last_element);
        if (percentage) {
          this.draw_line(percentage);
        }
      }
    }
  }, {
    key: "prevent_default_scroll_to_element",
    value: function prevent_default_scroll_to_element() {
      var _this2 = this;
      Array.prototype.forEach.call(this.toc_a, function (a_element) {
        a_element.addEventListener('click', function (e) {
          e.preventDefault();
          var a_href = a_element.getAttribute('href');
          var active_heading = _this2.post_content.querySelector(a_href);
          var heading_dist = active_heading.getBoundingClientRect().top;
          window.scrollTo({
            left: 0,
            top: window.scrollY + heading_dist,
            behavior: 'smooth'
          });
          var url = new URL(window.location.href);
          var new_url = url.origin + url.pathname + a_href;
          window.history.replaceState({}, document.title, new_url);
        });
      });
    }
  }, {
    key: "remove_default_checked_on_mobile",
    value: function remove_default_checked_on_mobile() {
      if (window.screen.width < 1024) {
        this.toc.querySelector('input[type="checkbox"]').checked = false;
      }
    }
  }, {
    key: "register_toggle_btn_events",
    value: function register_toggle_btn_events() {
      var _this3 = this;
      if (!this.toggle_btn) {
        return;
      }
      this.toggle_btn.addEventListener('click', function () {
        if (!_this3.toc.classList.contains('closed') && !_this3.toc.classList.contains('active')) {
          if (screen.width < 1200) {
            _this3.toc.classList.add('active');
          } else {
            _this3.toc.classList.add('closed');
          }
        } else {
          if (_this3.toc.classList.contains('closed')) {
            _this3.toc.classList.remove('closed');
            _this3.toc.classList.add('active');
          } else {
            _this3.toc.classList.add('closed');
            _this3.toc.classList.remove('active');
          }
        }
      });
    }
  }, {
    key: "init",
    value: function init(override_ldl) {
      var _this4 = this;
      /**
       * If page is loading with LDL, then we better wait until all the content 
       * of the page gets loaded, then and only after it, we run the
       * toc app.
       */
      if (typeof ps_ldl != 'undefined' && ps_ldl && !override_ldl) {
        return;
      }
      this.post_content = document.querySelector('.ps-post_content');
      this.toc = document.querySelector('.ps-table_of_contents');

      /**
       * If there is either not "post content" or not 
       * "table of content" widget, then do nothing.
       */
      if (!this.toc || !this.post_content) {
        return;
      }
      this.last_heading = document.querySelector('#ps-lrc_last_sections');
      this.toc_lis = this.toc.querySelectorAll('li');
      this.toc_a = this.toc.querySelectorAll('a');
      this.toggle_btn = this.toc.querySelector('.ps-table_of_contents_toggle_btn');
      this.pc_headings = this.post_content.querySelectorAll('h2, h3');
      this.pc_headings = Array.prototype.slice.call(this.pc_headings);
      this.current_active_heading = '';

      /**
       * if there is either not li in the toc or not headings in the content,
       * the just return.
       */
      if (this.pc_headings.length == 0 || this.toc_lis.length == 0) {
        return;
      }
      this.prevent_default_scroll_to_element();
      this.remove_default_checked_on_mobile();
      this.register_toggle_btn_events();

      /**
       * Adding the last element to the headings array
       */
      this.pc_headings.push(this.last_heading);
      document.addEventListener('scroll', function () {
        Array.prototype.some.call(_this4.pc_headings, function (pc_heading, index, pc_headings) {
          if ('null' == typeof pc_heading) {
            return;
          }
          if (_this4.is_in_viewport(pc_heading)) {
            if (pc_headings[index - 1] !== undefined) {
              if (_this4.pc_headings.length == index + 1) {
                _this4.apply_active(pc_headings[index - 1], pc_headings[index]);
              } else {
                _this4.apply_active(pc_headings[index - 1]);
              }
            }
            return true;
          } else {
            return false;
          }
        });
      }, {
        passive: true
      });
    }
  }]);
  return SavvyTableOfContents;
}();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SavvyTableOfContents);

/***/ }),

/***/ "../savvy/src/js/components/theme.js":
/*!*******************************************!*\
  !*** ../savvy/src/js/components/theme.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _triggers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./triggers */ "../savvy/src/js/components/triggers.js");
/* harmony import */ var _glider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./glider */ "../savvy/src/js/components/glider.js");
/* harmony import */ var _sharer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./sharer */ "../savvy/src/js/components/sharer.js");
/* harmony import */ var _popup__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./popup */ "../savvy/src/js/components/popup.js");
/* harmony import */ var _table_of_contents__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./table-of-contents */ "../savvy/src/js/components/table-of-contents.js");
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0) { ; } } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
 * Handles the Core Theme App of the Theme
 *
 * @package Savvy 
 * */







/**
* The FUI function excutor. This function callbacks 
* all the functions declared into the fui_events array.
* 
* Note: This function needs to be outside of the scope of 
* the SavvyTheme class, so we can remove the event listeners 
* if all the handlers were removed.
* 
* @see SavvyTheme.instance().fui_remove_event()
* 
*/
function ps_fui_executor() {
  var fui_events = SavvyTheme.instance().get_fui_events();
  Array.prototype.forEach.call(fui_events, function (fui_event) {
    SavvyTheme[fui_event.callback]();
  });
}
var SavvyTheme = /*#__PURE__*/function () {
  function SavvyTheme() {
    _classCallCheck(this, SavvyTheme);
  }
  _createClass(SavvyTheme, null, [{
    key: "start",
    value: function start() {
      var _this = this;
      if (document.readyState != "loading") {
        this.init();
      } else {
        document.addEventListener("DOMContentLoaded", function () {
          _this.init();
        });
      }
    }

    /**
     * Work only with one instance of the SavvyTheme class
     */
  }, {
    key: "instance",
    value: function instance() {
      if (!this.instance_obj) {
        this.instance_obj = this;
      }
      return this.instance_obj;
    }

    /**
     * 
     * @returns the fui_events array
     */
  }, {
    key: "get_fui_events",
    value: function get_fui_events() {
      return this.fui_events;
    }

    /**
     * Register the First User Interaction (FUI) events.
     * 
     * FUI events are intented to execute functions right after the, 
     * very first interaction of the user (either mouse move or scroll).
     * However the functions attached needs to be removed later on the code using the 
     * fui_remove_event() function.
     */
  }, {
    key: "fui_events_register",
    value: function fui_events_register() {
      document.addEventListener('mousemove', ps_fui_executor, {
        passive: true
      });
      document.addEventListener('scroll', ps_fui_executor, {
        passive: true
      });
    }
  }, {
    key: "fui_add_event",
    value: function fui_add_event(handler, callback) {
      /**
       * If the event do not exists, 
       * the we need to register it.
       */
      if (this.fui_events.length < 1) {
        this.fui_events_register();
      }

      /**
       * Pushing the hanlders and the callbacks
       */
      this.fui_events.push({
        handler: handler,
        callback: callback
      });
    }

    /**
     * Remove an event by giving the handler name
     */
  }, {
    key: "fui_remove_event",
    value: function fui_remove_event(handler) {
      this.fui_events.forEach(function (fui_event, index, object) {
        if (fui_event.handler == handler) {
          object.splice(index, 1);
        }
      });

      /**
       * Check if there the event removed was the last one on the fui_events array,
       * if so, then remove the event listeners
       */
      if (this.fui_events.length < 1) {
        document.removeEventListener('mousemove', ps_fui_executor);
        document.removeEventListener('scroll', ps_fui_executor);
      }
    }
  }, {
    key: "get_cookie",
    value: function get_cookie(cname) {
      var name = cname + "=",
        decodedCookie = decodeURIComponent(document.cookie),
        ca = decodedCookie.split(';');
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return false;
    }
  }, {
    key: "set_cookie",
    value: function set_cookie(cname, cvalue, exdays) {
      var d = new Date();
      d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
      var expires = "expires=" + d.toUTCString();
      document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }
  }, {
    key: "cookie_bar",
    value: function cookie_bar() {
      var self = this,
        cookie_element = document.querySelector('.ps-cookiebar');
      if (!cookie_element) {
        return;
      }
      var cookie_value = this.get_cookie('ps_cookie_policy');
      if (cookie_value == 'true') {
        return;
      }
      cookie_element.classList.remove('hidden');

      /**
       * Register Cookie Consent Button
       */
      var consent_btn = cookie_element.querySelector('.ps-cookiebar_btn');
      consent_btn.addEventListener('click', function () {
        self.set_cookie('ps_cookie_policy', true, 365);
        cookie_element.classList.add('hidden');
      });
    }
  }, {
    key: "get_the_gtm",
    value: function get_the_gtm() {
      /**
       * This function is declared in
       * Optimizations::load_gtm_on_fui_event();
       */
      ps_load_gtm_on_fui();
      console.log('FUI GTM Loaded');
      this.fui_remove_event('fui_gtm_later');
    }
  }, {
    key: "get_gtm_later",
    value: function get_gtm_later() {
      if (typeof ps_load_gtm_on_fui !== 'undefined' && ps_load_gtm_on_fui != '') {
        this.fui_add_event('fui_gtm_later', 'get_the_gtm');
      }
    }
  }, {
    key: "popup_inserter",
    value: function popup_inserter(args, data_content) {
      /**
       * Inserting the popup into the DOM
       */
      this.dom_inserter(args, data_content, true);

      /**
       * Registering events right after 
       * we insert the popup into the DOM
       */
      new _popup__WEBPACK_IMPORTED_MODULE_3__["default"]();
    }
  }, {
    key: "dom_inserter",
    value: function dom_inserter(args, data_content) {
      var is_append = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      args = args.split(',');
      if (args[0] === undefined || data_content === undefined) {
        return;
      }
      var parent = document.querySelector(args[0]);
      if (!parent) {
        return;
      }
      if (is_append) {
        var new_node = document.createElement('div');
        new_node.innerHTML = data_content;
        parent.appendChild(new_node);
      } else {
        parent.innerHTML = data_content;
      }
    }
  }, {
    key: "display_the_ldl_content",
    value: function display_the_ldl_content() {
      if (typeof ps_ldl == 'undefined' || this.ldl_already_fired) {
        return;
      }
      if (!ps_ldl) {
        return;
      }
      this.ldl_already_fired = true;
      console.log('LDL');
      var ldl_node = document.getElementById('ps-late_dom_load'),
        triggers = undefined;
      if (!ldl_node) {
        return;
      }
      var ldl_content = ldl_node.innerHTML;
      ldl_content = ldl_content.replace('<!-- {{ldl}}', '');
      ldl_content = ldl_content.replace('{{ldl}} -->', '');
      ldl_node.parentElement.innerHTML += ldl_content;

      /**
       * Remove the LDL content wrapper.
       */
      document.getElementById('ps-late_dom_load').remove();

      /**
       * Registering Triggers for Later DOM Load Elements
       */
      triggers = document.querySelector('.ps-post_content').querySelectorAll('.ps-triggers');
      if (triggers) {
        _triggers__WEBPACK_IMPORTED_MODULE_0__["default"].register_triggers(triggers);
      }

      /**
       * Loading the Table of Content live progress bar script
       */
      new _table_of_contents__WEBPACK_IMPORTED_MODULE_4__["default"](true);

      /**
       * If we are loading lrc resources for this page then we better 
       * load the lrc scripts once those resources are inserted into the DOM.
       */
      if (!this.check_lrc_resources()) {
        console.log('Loading LRC Scripts from LDL');
        this.loading_lrc_scripts();
      }
      this.fui_remove_event('fui_later_dom_load');
    }
  }, {
    key: "later_dom_load",
    value: function later_dom_load() {
      /**
       * Don't wait for the the FUI event if there is an 'hash' on the url,
       * call the function right away instead.
       * 
       * Add the callback of the function to an FUI envent otherwise.
       */
      if (this.is_hash_url) {
        this.display_the_ldl_content();
      } else {
        this.fui_add_event('fui_later_dom_load', 'display_the_ldl_content');
      }
    }
  }, {
    key: "loading_lrc_scripts",
    value: function loading_lrc_scripts() {
      if (this.lrc_scripts_fired) {
        return;
      }
      var lrc_scripts = document.querySelectorAll('.ps-lrc_scripts');
      Array.prototype.forEach.call(lrc_scripts, function (lrc_script) {
        lrc_script.setAttribute('src', lrc_script.getAttribute('data-src'));
      });
      this.lrc_scripts_fired = true;
    }
  }, {
    key: "lrc_post_last_sections",
    value: function lrc_post_last_sections(args, data_content) {
      this.dom_inserter(args, data_content);
      args = args.split(',');
      if (args[0] === undefined) {
        return;
      }
      var parent = document.querySelector(args[0]);

      /**
       * Registering the Gliders
       */
      var gliders = parent.querySelectorAll('.wn-carousel');
      Array.prototype.forEach.call(gliders, function (carousel) {
        new _glider__WEBPACK_IMPORTED_MODULE_1__["default"](carousel);
      });

      /**
       * Registering the Sharer
       */
      new _sharer__WEBPACK_IMPORTED_MODULE_2__["default"]();
    }
  }, {
    key: "check_lrc_resources",
    value: function check_lrc_resources() {
      if (typeof ps_lrc_resources == 'undefined') {
        return false;
      }
      if (!ps_lrc_resources.length) {
        return false;
      }
      return true;
    }
  }, {
    key: "get_the_resources",
    value: function get_the_resources() {
      var self = this;
      if (!this.check_lrc_resources() || this.lrc_already_fired) {
        return;
      }
      Array.prototype.forEach.call(ps_lrc_resources, function (resource) {
        console.log('LRC for ' + resource.resource_name);
      });
      this.lrc_already_fired = true;
      ps_lrc_resources = JSON.stringify(ps_lrc_resources);
      var args = {
        action: 'lrc_handler',
        resources: ps_lrc_resources,
        post_id: ps_single_post_id
      };
      this.ajax_handler(args).then(function (data) {
        console.log('Data Received: ');
        console.log(data);
        if (_typeof(data) === 'object') {
          data.forEach(function (resource, index) {
            var _resource$callback, _resource$callback_ar;
            var response_callback = (_resource$callback = resource.callback) !== null && _resource$callback !== void 0 ? _resource$callback : false;
            var response_args = (_resource$callback_ar = resource.callback_args) !== null && _resource$callback_ar !== void 0 ? _resource$callback_ar : false;
            switch (response_callback) {
              case 'dom_inserter':
                self.dom_inserter(response_args, resource.data);
                break;
              case 'lrc_post_last_sections':
                self.lrc_post_last_sections(response_args, resource.data);
                break;
              case 'popup_inserter':
                self.popup_inserter(response_args, resource.data);
                break;
              default:
                break;
            }
          });
          console.log('Loading LRC Scripts from LRC');
          self.loading_lrc_scripts();
        }
      })["catch"](function (error) {
        console.log(error);
      });
      this.fui_remove_event('fui_later_resource_call', 'get_the_resources');
    }
  }, {
    key: "later_resource_call",
    value: function later_resource_call() {
      /**
       * Don't wait for the the FUI event if there is an 'hash' on the url,
       * call the function right away instead.
       * 
       * Add the callback of the function to an FUI envent otherwise.
       */
      if (this.is_hash_url) {
        this.get_the_resources();
      } else {
        this.fui_add_event('fui_later_resource_call', 'get_the_resources');
      }
    }
  }, {
    key: "check_if_hash_in_url",
    value: function check_if_hash_in_url() {
      /**
       * If we find # on the url, 
       * then we need to trigger the popup right away.
       */
      this.url = new URL(window.location.href);
      this.is_hash_url = this.url.hash.includes('#');
    }
  }, {
    key: "scroll_to_heading",
    value: function scroll_to_heading() {
      /**
       * Return if there is not hash set onb the url.
       */
      if (!this.is_hash_url) {
        return;
      }
      var heading = document.querySelector(this.url.hash);

      /**
       * Return if the heading isn't in the post content.
       */
      if (!heading) {
        return;
      }

      /**
      * Return if the the browser already scrolled 
      * to the heading position.
      */
      if (window.scrollY > 10) {
        return;
      }

      /**
       * Scroll the window to the heading position.
       */
      window.scrollTo({
        left: 0,
        top: window.scrollY + heading.getBoundingClientRect().top,
        behavior: 'smooth'
      });
    }

    /**
     * Utility Ajax Hanlder Function
     */
  }, {
    key: "ajax_handler",
    value: function () {
      var _ajax_handler = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var data,
          nonce,
          request,
          url,
          _args = arguments;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                data = _args.length > 0 && _args[0] !== undefined ? _args[0] : false;
                nonce = _args.length > 1 && _args[1] !== undefined ? _args[1] : '';
                console.log('Running the handler');
                console.log(ajax_var);
                if (!(typeof ajax_var == 'undefined' || !data)) {
                  _context.next = 6;
                  break;
                }
                return _context.abrupt("return");
              case 6:
                request = new XMLHttpRequest(), url = new URL(ajax_var.url);
                Object.entries(data).forEach(function (_ref) {
                  var _ref2 = _slicedToArray(_ref, 2),
                    key = _ref2[0],
                    value = _ref2[1];
                  url.searchParams.append(key, value);
                });
                _context.next = 10;
                return new Promise(function (resolve, reject) {
                  request.open('GET', url.href, true);
                  request.onload = function () {
                    if (this.status >= 200 && this.status < 400) {
                      resolve(JSON.parse(this.response));
                    } else {
                      reject(this);
                    }
                  };
                  request.onerror = function () {
                    reject(this);
                  };
                  request.send();
                });
              case 10:
                return _context.abrupt("return", _context.sent);
              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));
      function ajax_handler() {
        return _ajax_handler.apply(this, arguments);
      }
      return ajax_handler;
    }()
  }, {
    key: "static_files_cache",
    value: function static_files_cache() {
      if (typeof ajax_var.cache_status !== 'undefined' && ajax_var.cache_status != '{{cachestatus}}') {
        console.log('Serving a Cached Page (' + ajax_var.cache_status + ')');
      }
    }
  }, {
    key: "load_fonts_later",
    value: function load_fonts_later() {
      savvy_load_fonts_on_fui.forEach(function (fui_font) {
        document.documentElement.style.setProperty(fui_font.cssvar, fui_font.family);
      });
      this.fui_remove_event('load_fonts_later_handler');
    }
  }, {
    key: "load_custom_font",
    value: function load_custom_font() {
      /**
       * If variable is undefined or ,
       * then just return.
       */
      if ('undefined' == typeof savvy_load_fonts_on_fui) {
        return;
      }

      /**
       * If variable is empty, then return.
       */
      if (savvy_load_fonts_on_fui.length < 1) {
        return;
      }
      this.fui_add_event('load_fonts_later_handler', 'load_fonts_later');
    }

    /**
     * 
     * Back to Top Button
     * 
     * */
  }, {
    key: "totop_btn",
    value: function totop_btn() {
      var totop_btn = document.querySelector('.ps-btn_back_totop');
      if (!totop_btn) {
        return;
      }

      //Scroll back to top when click
      totop_btn.addEventListener('click', function () {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });

      //Hide it when gets close to the header
      window.addEventListener('scroll', function (e) {
        if (window.pageYOffset > 300) {
          totop_btn.classList.add('ps-trans_fade_in');
        } else {
          totop_btn.classList.remove('ps-trans_fade_in');
        }
      }, {
        passive: true
      });
    }
  }, {
    key: "init",
    value: function init() {
      console.log('MAIN CORE APP ');
      this.fui_events = [];
      this.static_files_cache();
      this.load_custom_font();
      this.check_if_hash_in_url();
      this.totop_btn();
      this.cookie_bar();
      this.get_gtm_later();
      this.later_resource_call();
      this.later_dom_load();
      this.scroll_to_heading();
    }
  }]);
  return SavvyTheme;
}();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SavvyTheme);

/***/ }),

/***/ "../savvy/src/js/components/triggers.js":
/*!**********************************************!*\
  !*** ../savvy/src/js/components/triggers.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
 * Handles the Triggers Class
 * 
 * This object is intented to register events from the html directly
 *
 * @package Privacysavvy
 * */
var SavvyTriggers = /*#__PURE__*/function () {
  function SavvyTriggers() {
    var _this = this;
    _classCallCheck(this, SavvyTriggers);
    if (document.readyState != "loading") {
      this.init();
    } else {
      document.addEventListener("DOMContentLoaded", function () {
        _this.init();
      });
    }
  }
  _createClass(SavvyTriggers, [{
    key: "init",
    value: function init() {
      var _this2 = this;
      var triggers = document.querySelectorAll('.ps-triggers');
      console.log('Registering the triggers');
      if (triggers) {
        Array.prototype.forEach.call(triggers, function (trigger) {
          _this2.constructor.register_trigger(trigger);
        });
      }
    }
  }], [{
    key: "register_triggers",
    value: function register_triggers(triggers) {
      var self = this;
      Array.prototype.forEach.call(triggers, function (trigger) {
        self.register_trigger(trigger);
      });
    }
  }, {
    key: "register_trigger",
    value: function register_trigger(trigger) {
      var events = trigger.dataset.event,
        target = trigger.dataset.target,
        action = trigger.dataset.action,
        content = trigger.dataset.content;
      if (!events || !target || !action || !content) {
        return;
      }
      function get_target_node(target) {
        var target_node;
        if (target.includes('closest-')) {
          target_node = trigger.closest(target.replace('closest-', ''));
        }
        if (target.includes('sibling-')) {
          target_node = trigger.parentNode.querySelector(target.replace('sibling-', ''));
        }
        return target_node;
      }
      function do_the_actions() {
        var target_node = get_target_node(target);
        if (action == 'toggle_class') {
          target_node.classList.toggle(content);
        }
      }

      /**
       * Registering multiple events
       */
      events = events.split(' ');
      events.forEach(function (event) {
        trigger.addEventListener(event, function () {
          do_the_actions();
        });
      });
    }
  }]);
  return SavvyTriggers;
}();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SavvyTriggers);

/***/ }),

/***/ "../savvy/src/js/savvy-app.js":
/*!************************************!*\
  !*** ../savvy/src/js/savvy-app.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_nav_menu__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/nav-menu */ "../savvy/src/js/components/nav-menu.js");
/* harmony import */ var _components_theme__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/theme */ "../savvy/src/js/components/theme.js");
/* harmony import */ var _components_table_of_contents__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/table-of-contents */ "../savvy/src/js/components/table-of-contents.js");
/* harmony import */ var _components_article_score__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/article-score */ "../savvy/src/js/components/article-score.js");
/* harmony import */ var _components_glider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/glider */ "../savvy/src/js/components/glider.js");
/* harmony import */ var _components_sharer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/sharer */ "../savvy/src/js/components/sharer.js");
/* harmony import */ var _components_popup__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/popup */ "../savvy/src/js/components/popup.js");
/* harmony import */ var _components_triggers__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/triggers */ "../savvy/src/js/components/triggers.js");
/**
 * Core Public App for the Theme
 *
 * @package Savvy
 * */









new _components_nav_menu__WEBPACK_IMPORTED_MODULE_0__["default"]();
new _components_table_of_contents__WEBPACK_IMPORTED_MODULE_2__["default"]();
new _components_article_score__WEBPACK_IMPORTED_MODULE_3__["default"]();
new _components_glider__WEBPACK_IMPORTED_MODULE_4__["default"]();
new _components_sharer__WEBPACK_IMPORTED_MODULE_5__["default"]();
new _components_popup__WEBPACK_IMPORTED_MODULE_6__["default"]();
new _components_triggers__WEBPACK_IMPORTED_MODULE_7__["default"]();

/**
 * Starting the main Theme Script
 */
_components_theme__WEBPACK_IMPORTED_MODULE_1__["default"].instance().start();

/***/ }),

/***/ "./src/sass/temp/.sass-output.css":
/*!****************************************!*\
  !*** ./src/sass/temp/.sass-output.css ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/sass/temp/.sass-fcp-home-output.css":
/*!*************************************************!*\
  !*** ./src/sass/temp/.sass-fcp-home-output.css ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/sass/temp/.sass-fcp-single-output.css":
/*!***************************************************!*\
  !*** ./src/sass/temp/.sass-fcp-single-output.css ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/sass/temp/.sass-fcp-archive-output.css":
/*!****************************************************!*\
  !*** ./src/sass/temp/.sass-fcp-archive-output.css ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/sass/temp/.sass-lrc-output.css":
/*!********************************************!*\
  !*** ./src/sass/temp/.sass-lrc-output.css ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/sass/app.scss":
/*!***************************!*\
  !*** ./src/sass/app.scss ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/sass/fcp-home.scss":
/*!********************************!*\
  !*** ./src/sass/fcp-home.scss ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/sass/fcp-single.scss":
/*!**********************************!*\
  !*** ./src/sass/fcp-single.scss ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/sass/fcp-archive.scss":
/*!***********************************!*\
  !*** ./src/sass/fcp-archive.scss ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/sass/lrc.scss":
/*!***************************!*\
  !*** ./src/sass/lrc.scss ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"/assets/js/all": 0,
/******/ 			"src/sass/temp/.sass-lrc-output": 0,
/******/ 			"src/sass/temp/.sass-fcp-archive-output": 0,
/******/ 			"src/sass/temp/.sass-fcp-single-output": 0,
/******/ 			"src/sass/temp/.sass-fcp-home-output": 0,
/******/ 			"src/sass/temp/.sass-output": 0,
/******/ 			"assets/css/ps-lrc": 0,
/******/ 			"assets/css/ps-fcp-archive": 0,
/******/ 			"assets/css/ps-fcp-single": 0,
/******/ 			"assets/css/ps-fcp-home": 0,
/******/ 			"assets/css/all": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunksavvy_child"] = self["webpackChunksavvy_child"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	__webpack_require__.O(undefined, ["src/sass/temp/.sass-lrc-output","src/sass/temp/.sass-fcp-archive-output","src/sass/temp/.sass-fcp-single-output","src/sass/temp/.sass-fcp-home-output","src/sass/temp/.sass-output","assets/css/ps-lrc","assets/css/ps-fcp-archive","assets/css/ps-fcp-single","assets/css/ps-fcp-home","assets/css/all"], () => (__webpack_require__("./src/js/sc-app.js")))
/******/ 	__webpack_require__.O(undefined, ["src/sass/temp/.sass-lrc-output","src/sass/temp/.sass-fcp-archive-output","src/sass/temp/.sass-fcp-single-output","src/sass/temp/.sass-fcp-home-output","src/sass/temp/.sass-output","assets/css/ps-lrc","assets/css/ps-fcp-archive","assets/css/ps-fcp-single","assets/css/ps-fcp-home","assets/css/all"], () => (__webpack_require__("./src/sass/app.scss")))
/******/ 	__webpack_require__.O(undefined, ["src/sass/temp/.sass-lrc-output","src/sass/temp/.sass-fcp-archive-output","src/sass/temp/.sass-fcp-single-output","src/sass/temp/.sass-fcp-home-output","src/sass/temp/.sass-output","assets/css/ps-lrc","assets/css/ps-fcp-archive","assets/css/ps-fcp-single","assets/css/ps-fcp-home","assets/css/all"], () => (__webpack_require__("./src/sass/fcp-home.scss")))
/******/ 	__webpack_require__.O(undefined, ["src/sass/temp/.sass-lrc-output","src/sass/temp/.sass-fcp-archive-output","src/sass/temp/.sass-fcp-single-output","src/sass/temp/.sass-fcp-home-output","src/sass/temp/.sass-output","assets/css/ps-lrc","assets/css/ps-fcp-archive","assets/css/ps-fcp-single","assets/css/ps-fcp-home","assets/css/all"], () => (__webpack_require__("./src/sass/fcp-single.scss")))
/******/ 	__webpack_require__.O(undefined, ["src/sass/temp/.sass-lrc-output","src/sass/temp/.sass-fcp-archive-output","src/sass/temp/.sass-fcp-single-output","src/sass/temp/.sass-fcp-home-output","src/sass/temp/.sass-output","assets/css/ps-lrc","assets/css/ps-fcp-archive","assets/css/ps-fcp-single","assets/css/ps-fcp-home","assets/css/all"], () => (__webpack_require__("./src/sass/fcp-archive.scss")))
/******/ 	__webpack_require__.O(undefined, ["src/sass/temp/.sass-lrc-output","src/sass/temp/.sass-fcp-archive-output","src/sass/temp/.sass-fcp-single-output","src/sass/temp/.sass-fcp-home-output","src/sass/temp/.sass-output","assets/css/ps-lrc","assets/css/ps-fcp-archive","assets/css/ps-fcp-single","assets/css/ps-fcp-home","assets/css/all"], () => (__webpack_require__("./src/sass/lrc.scss")))
/******/ 	__webpack_require__.O(undefined, ["src/sass/temp/.sass-lrc-output","src/sass/temp/.sass-fcp-archive-output","src/sass/temp/.sass-fcp-single-output","src/sass/temp/.sass-fcp-home-output","src/sass/temp/.sass-output","assets/css/ps-lrc","assets/css/ps-fcp-archive","assets/css/ps-fcp-single","assets/css/ps-fcp-home","assets/css/all"], () => (__webpack_require__("./src/sass/temp/.sass-output.css")))
/******/ 	__webpack_require__.O(undefined, ["src/sass/temp/.sass-lrc-output","src/sass/temp/.sass-fcp-archive-output","src/sass/temp/.sass-fcp-single-output","src/sass/temp/.sass-fcp-home-output","src/sass/temp/.sass-output","assets/css/ps-lrc","assets/css/ps-fcp-archive","assets/css/ps-fcp-single","assets/css/ps-fcp-home","assets/css/all"], () => (__webpack_require__("./src/sass/temp/.sass-fcp-home-output.css")))
/******/ 	__webpack_require__.O(undefined, ["src/sass/temp/.sass-lrc-output","src/sass/temp/.sass-fcp-archive-output","src/sass/temp/.sass-fcp-single-output","src/sass/temp/.sass-fcp-home-output","src/sass/temp/.sass-output","assets/css/ps-lrc","assets/css/ps-fcp-archive","assets/css/ps-fcp-single","assets/css/ps-fcp-home","assets/css/all"], () => (__webpack_require__("./src/sass/temp/.sass-fcp-single-output.css")))
/******/ 	__webpack_require__.O(undefined, ["src/sass/temp/.sass-lrc-output","src/sass/temp/.sass-fcp-archive-output","src/sass/temp/.sass-fcp-single-output","src/sass/temp/.sass-fcp-home-output","src/sass/temp/.sass-output","assets/css/ps-lrc","assets/css/ps-fcp-archive","assets/css/ps-fcp-single","assets/css/ps-fcp-home","assets/css/all"], () => (__webpack_require__("./src/sass/temp/.sass-fcp-archive-output.css")))
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["src/sass/temp/.sass-lrc-output","src/sass/temp/.sass-fcp-archive-output","src/sass/temp/.sass-fcp-single-output","src/sass/temp/.sass-fcp-home-output","src/sass/temp/.sass-output","assets/css/ps-lrc","assets/css/ps-fcp-archive","assets/css/ps-fcp-single","assets/css/ps-fcp-home","assets/css/all"], () => (__webpack_require__("./src/sass/temp/.sass-lrc-output.css")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;