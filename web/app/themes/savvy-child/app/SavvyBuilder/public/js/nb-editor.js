/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./app/SavvyBuilder/src/js/editor.js":
/*!*******************************************!*\
  !*** ./app/SavvyBuilder/src/js/editor.js ***!
  \*******************************************/
/***/ (() => {

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0) { ; } } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
 * 
 * @package Node Builder
 * 
 * */
var NoderStyles = /*#__PURE__*/function () {
  function NoderStyles() {
    _classCallCheck(this, NoderStyles);
    console.log('Noder Styles');
    this.styles_data = noder_json_styles;
    console.log(this.styles_data);
  }
  _createClass(NoderStyles, [{
    key: "setControlsValues",
    value: function setControlsValues(block_id, styles_data) {
      this.styles_data[block_id] = styles_data;
      console.log(this.styles_data);
    }
  }, {
    key: "getControlsValues",
    value: function getControlsValues(block_id) {
      var _this$styles_data$blo;
      return (_this$styles_data$blo = this.styles_data[block_id]) !== null && _this$styles_data$blo !== void 0 ? _this$styles_data$blo : [];
    }
  }, {
    key: "getStylesObject",
    value: function getStylesObject() {
      return this.styles_data;
    }
  }, {
    key: "getPropertyValue",
    value: function getPropertyValue(block_id, control_id, screen) {
      /**
       * If there is no an screen specified for the property,
       * then return the desktop (default).
       */
      if ('undefined' === typeof this.styles_data[block_id][control_id][screen]) {
        return this.styles_data[block_id][control_id]['desktop']['value'];
      } else {
        return this.styles_data[block_id][control_id][screen]['value'];
      }
    }
  }, {
    key: "render_block_style",
    value: function render_block_style(block_id) {
      /**
       * Remove Current Styles of the Block.
       */
      Array.prototype.forEach.call(document.querySelectorAll('style.nb-style-' + block_id), function (style_tab) {
        style_tab.remove();
      });

      /**
       * Create the Style Tab.
       */
      var style_tab = document.createElement('style');
      style_tab.classList.add('nb-style-' + block_id);

      /**
       * Iterate over all controls wrap which matach 
       * the block id.
       */
      Array.prototype.forEach.call(this.editor.querySelectorAll('.nb-controls_wrap[data-blockid="' + block_id + '"]'), function (control_wrap) {
        /**
         * Iterate over all selectors within the controls wraps.
         */
        Array.prototype.forEach.call(control_wrap.querySelectorAll('.nb-editor_selector'), function (selector) {
          var _selector$dataset$ren;
          style_tab.innerHTML += (_selector$dataset$ren = selector.dataset.renderedstyle) !== null && _selector$dataset$ren !== void 0 ? _selector$dataset$ren : '';
        });
      });

      /**
       * Attach the generated style to the document head.
       */
      document.querySelector('head').appendChild(style_tab);
    }
  }, {
    key: "renderInlineStylesForBlockId",
    value: function renderInlineStylesForBlockId(block_id) {
      /**
       * Remove Current Styles of the Block.
       */
      Array.prototype.forEach.call(document.querySelectorAll('style.nb-style-' + block_id), function (style_tab) {
        style_tab.remove();
      });

      /**
       * Create the Style Tab.
       */
      var style_tab = document.createElement('style');
      style_tab.classList.add('nb-style-' + block_id);
      var object = this.styles_data[block_id];
      var styles_html = '';
      for (var control_id in object) {
        if (Object.prototype.hasOwnProperty.call(object, control_id)) {
          var control = object[control_id];
          var selector = control['selector'];
          var property = control['property'];
          var value = control['desktop']['value'];
          styles_html += selector + '{' + property.replace('{{VALUE}}', value) + '}';
          if (Object.prototype.hasOwnProperty.call(control, 'tablet')) {
            var tablet_value = control['tablet']['value'];
            styles_html += '@media screen and (max-width: 1024px){ ' + selector + '{' + property.replace('{{VALUE}}', tablet_value) + '}}';
          }
          if (Object.prototype.hasOwnProperty.call(control, 'mobile')) {
            var mobile_value = control['mobile']['value'];
            styles_html += '@media screen and (max-width: 767px){ ' + selector + '{' + property.replace('{{VALUE}}', mobile_value) + '}}';
          }
        }
      }
      style_tab.innerHTML = styles_html;

      /**
       * Attach the generated style to the document head.
       */
      document.querySelector('head').appendChild(style_tab);
    }
  }, {
    key: "setPropertyValue",
    value: function setPropertyValue(block_id, control_id, screen, value) {
      this.styles_data[block_id][control_id][screen]['value'] = value;
      this.renderInlineStylesForBlockId(block_id);
    }
  }]);
  return NoderStyles;
}();
var NbEditor = /*#__PURE__*/function () {
  function NbEditor() {
    var _this = this;
    _classCallCheck(this, NbEditor);
    if (document.readyState != "loading") {
      this.init();
    } else {
      document.addEventListener("DOMContentLoaded", function () {
        _this.init();
      });
    }
  }
  _createClass(NbEditor, [{
    key: "init",
    value: function init() {
      this.registered_controls = [];
      this.dragging_node = false;
      this.cloned_picker = null;
      this.mouse_in_base = false;
      this.mouse_down = false;
      this.styles_obj = new NoderStyles();
      this.editor = document.querySelector('.nb-editor');
      this.blocks = document.querySelectorAll('.nb-block');
      this.bases = document.querySelectorAll('.nb-base');
      this.document_body = document.querySelector('body');
      this.nav_bar = this.editor.querySelector('.nb-editor_tab_nav_menu');
      this.temp_wrap = this.editor.querySelector('.nb-editor_temp');
      this.tab_contents = this.editor.querySelectorAll('.nb-editor_tab_content');
      this.all_controls_wrap = this.editor.querySelectorAll('.nb-controls_wrap');
      this.all_controls = this.editor.querySelectorAll('.nb_control_wrap');
      this.slide_editor = this.editor.querySelector('.nb-editor_resize_bar');
      this.hide_editor_btn = this.editor.querySelector('.nb-editor_hide_btn');
      this.all_picker_blocks = this.editor.querySelectorAll('.nb-editor_blocks_picker > div');
      this.content_wrap = this.editor.querySelector('.nb-editor_tab_content_content');
      this.style_wrap = this.editor.querySelector('.nb-editor_tab_content_style');
      this.block_picker_btn = this.editor.querySelector('.nb-editor_blocks_picker_btn');
      this.blocks_picker_wrap = this.editor.querySelector('.nb-editor_blocks_picker');
      this.nav_bar_links = this.nav_bar.querySelectorAll('a');
      this.update_post_btn = this.editor.querySelector('.nb-editor_btn_update');
      this.upate_all_inputs_values();
      this.create_dialog_element();
      this.register_editor_slide_events();
      this.register_hide_editor_events();
      this.register_nav_bar_events();
      this.register_update_btn_events();
      this.register_preselect_banner_events();
      this.register_block_picker_btn_events();
      this.register_document_events();
      this.register_controls_events();
    }

    /**
     * Fix possible bug on Firefox.
     */
  }, {
    key: "upate_all_inputs_values",
    value: function upate_all_inputs_values() {
      Array.prototype.forEach.call(this.editor.querySelectorAll('input,select'), function (input) {
        input.value = input.getAttribute('value');
      });
    }
  }, {
    key: "responsive_set_active_btn",
    value: function responsive_set_active_btn(selected_btn) {
      var all_btns = selected_btn.closest('.nb-control_responsive_btns').querySelectorAll('.nb-control_resp_btn');

      /**
       * Remove the class active from all buttons.
       */
      Array.prototype.forEach.call(all_btns, function (btn) {
        btn.classList.remove('active');
      });
      selected_btn.classList.add('active');
    }
  }, {
    key: "responsive_set_property_value_to_control",
    value: function responsive_set_property_value_to_control(selected_btn) {
      var block_id = selected_btn.closest('.nb-controls_wrap').dataset.blockid;
      var control_id = selected_btn.closest('.nb_control_wrap').dataset.controlid;
      var screen = selected_btn.dataset.screen;
      var value = this.styles_obj.getPropertyValue(block_id, control_id, screen);
      this.set_control_value(selected_btn.closest('.nb_control_wrap'), value);
    }
  }, {
    key: "set_control_value",
    value: function set_control_value(control_wrap, value) {
      var control_type = control_wrap.dataset.type;
      switch (control_type) {
        case 'select':
          this.set_control_value_type__select(control_wrap, value);
          break;
        default:
          break;
      }
    }
  }, {
    key: "set_control_value_type__select",
    value: function set_control_value_type__select(control_wrap, value) {
      var control_input = control_wrap.querySelector('select');
      control_input.value = value;
      control_input.dispatchEvent(new Event('input'));
    }
  }, {
    key: "responsive_move_selected_screen_on_top",
    value: function responsive_move_selected_screen_on_top(selected_btn) {
      selected_btn.closest('.nb-control_responsive_btns').prepend(selected_btn);
    }
  }, {
    key: "responsive_btn_click_event",
    value: function responsive_btn_click_event(selected_btn) {
      /**
       * Mark the selected responsive btn as active.
       */
      this.responsive_set_active_btn(selected_btn);
      this.responsive_set_property_value_to_control(selected_btn);
    }
  }, {
    key: "resposive_set_properties_to_all_controls",
    value: function resposive_set_properties_to_all_controls(block_id) {
      var _this2 = this;
      Array.prototype.forEach.call(this.editor.querySelectorAll('.nb-controls_wrap[data-blockid="' + block_id + '"]'), function (controls_wrap_list) {
        Array.prototype.forEach.call(controls_wrap_list.querySelectorAll('.nb_control_wrap'), function (control_wrap_list) {
          var selected_responsive_btn = control_wrap_list.querySelector('nb-control_resp_btn.active');
          _this2.responsive_set_property_value_to_control(selected_btn);
        });
      });
    }
  }, {
    key: "register_document_events",
    value: function register_document_events() {
      var _this3 = this;
      /**
       * Click events.
       */
      document.addEventListener('click', function (e) {
        if (!e.target.closest('.nb-dialog')) {
          _this3.dialog.classList.add('nb-display__none');
        }

        /**
         * If block is clicked.
         */
        if (e.target.closest('.nb-block')) {
          var this_block = e.target.closest('.nb-block');

          /**
           * When a block is clicked, then hide the 
           * blocks picker and show proper content for the 
           * block on the editor.
           */
          if (_this3.content_wrap) {
            _this3.content_wrap.classList.remove('nb-display__none');
          }
          if (_this3.style_wrap) {
            _this3.style_wrap.classList.remove('nb-display__none');
          }
          _this3.nav_bar.classList.remove('nb-display__none');
          _this3.blocks_picker_wrap.classList.add('nb-display__none');
          Array.prototype.forEach.call(_this3.all_controls_wrap, function (control_wrap) {
            control_wrap.classList.remove('nb_display_block');
          });
          _this3.select_block(this_block);
          // this.resposive_set_properties_to_all_controls(this_block);

          var selected_controls_wrap = _this3.editor.querySelectorAll('.nb-controls_wrap[data-blockid="' + this_block.dataset.blockid + '"]');
          Array.prototype.forEach.call(selected_controls_wrap, function (control_wrap) {
            control_wrap.classList.add('nb_display_block');
          });
        }

        /**
         * Responsive Btn Option
         * 
         * */
        Array.prototype.forEach.call(_this3.editor.querySelectorAll('.nb-control_responsive_btns'), function (reponsive_btns_wrapper) {
          // reponsive_btns_wrapper.classList.remove('active');
        });

        // Array.prototype.forEach.call(this.editor.querySelectorAll('.nb-control_resp_btn.active'), (selected_btn) => {
        //     let btns_wrapper = selected_btn.closest('.nb-control_responsive_btns');

        //     if( 'desktop' === selected_btn.dataset.screen ){
        //         btns_wrapper.style.justifyContent = 'flex-start';
        //     }

        //     if( 'tablet' === selected_btn.dataset.screen ){
        //         btns_wrapper.style.justifyContent = 'center';
        //     }

        //     if( 'mobile' === selected_btn.dataset.screen ){
        //         btns_wrapper.style.justifyContent = 'flex-end';
        //     }
        // });

        if (e.target.closest('.nb-control_resp_btn')) {
          /**
           * Get the selected screen.
           */
          var _selected_btn = e.target.closest('.nb-control_resp_btn');

          /**
           * Open the responsive selector with available screens.
           */
          e.target.closest('.nb-control_responsive_btns').classList.add('active');

          /**
           * Handle the click event.
           */
          // this.responsive_btn_click_event(selected_btn);

          /**
           * Select all other responsive buttons to the selected screen.
           */
          Array.prototype.forEach.call(_this3.editor.querySelectorAll('.nb-control_resp_btn[data-screen="' + _selected_btn.dataset.screen + '"]'), function (btn) {
            _this3.responsive_btn_click_event(btn);
            var btns_wrapper = btn.closest('.nb-control_responsive_btns');
            if ('desktop' === btn.dataset.screen) {
              btns_wrapper.style.justifyContent = 'flex-start';
            }
            if ('tablet' === btn.dataset.screen) {
              btns_wrapper.style.justifyContent = 'center';
            }
            if ('mobile' === btn.dataset.screen) {
              btns_wrapper.style.justifyContent = 'flex-end';
            }

            // btns_wrapper.classList.remove('active');
          });
        }
      });

      /**
       * Right Click Event.
       */
      document.addEventListener('contextmenu', function (e) {
        if (e.target.closest('.nb-block')) {
          var this_block = e.target.closest('.nb-block');
          e.preventDefault();

          /**
           * Clean up dialog element.
           */
          _this3.dialog.innerHTML = '';

          /**
           * Create Blocks Options
           */
          _this3.dialog.innerHTML = '<ul><li class="nb-blocks_options" data-option="delete">Delete</li></ul>';

          /**
           * Register Options Events.
           */
          Array.prototype.forEach.call(_this3.dialog.querySelectorAll('.nb-blocks_options'), function (option) {
            option.addEventListener('click', function () {
              _this3.dialog.classList.add('nb-display__none');

              /**
               * Options Switch
               */
              switch (option.dataset.option) {
                case 'delete':
                  _this3.delete_block(this_block.dataset.blockid);
                  break;
                default:
                  break;
              }
            });
          });

          /**
           * Open Dialog Window.
           */
          _this3.dialog.style.left = e.clientX + 'px';
          _this3.dialog.style.top = e.clientY + 'px';
          _this3.dialog.classList.remove('nb-display__none');
        }
      }, false);

      /**
       * Mouse Move Events.
       */
      document.addEventListener('mousemove', function (e) {
        /**
         * Check if we are dragging any node.
         */
        if (_this3.dragging_node && _this3.mouse_down) {
          /**
           * Check if dragging a block to move it.
           */
          if (_this3.dragging_node.classList.contains('nb-block')) {
            _this3.dragging_node.classList.add('nb-display__none');
          }
          _this3.cloned_picker.classList.remove('nb-display__none');
          _this3.cloned_picker.style.left = e.clientX + 10 + 'px';
          _this3.cloned_picker.style.top = e.clientY + 10 + 'px';
          _this3.insert_preselect_banner(e);
        }
      });

      /**
       * Mouse Over Events.
       */
      document.addEventListener('mouseover', function (e) {
        /**
         * Check if we are over a block.
         */
        if (e.target.closest('.nb-block')) {
          var this_block = e.target.closest('.nb-block');
          Array.prototype.forEach.call(_this3.blocks, function (block) {
            block.classList.remove('nb-block_show_edit_btn');
          });

          /**
          * Only show the block hover border if 
          * we are not dragging a block/block-picker or 
          * the currrent block isn't in a column.
          */
          if (!_this3.dragging_node) {
            _this3.show_hover_border(this_block);
          }
        }
      });

      /**
       * Mouse Down Event.
       */
      document.addEventListener('mousedown', function (e) {
        _this3.mouse_down = true;
        var dragging_picker = e.target.closest('.nb-editor_block_picker');
        var dragging_block = e.target.closest('.nb-block');

        /**
         * Check if we are dragging a block picker.
         */
        if (dragging_picker) {
          _this3.dragging_node = dragging_picker;
          _this3.set_cloner_picker(dragging_picker, e);
        }

        /**
         * Check if we are dragging a block.
         * 
         * Mouse Move Event on the Block's Edit Button...
         * Change Block Position (Drag a Block).
         * 
         */
        if (dragging_block) {
          _this3.dragging_node = dragging_block;
          _this3.set_cloner_picker(_this3.editor.querySelector('.nb-editor_block_picker[data-blocktype="' + dragging_block.dataset.blocktype + '"]'), e);
        }
      });

      /**
       * Mouse Up Event.
       */
      document.addEventListener('mouseup', function (e) {
        _this3.mouse_down = false;
        if (_this3.dragging_node) {
          /**
           * Return select control to the body of the 
           * document.
           */
          _this3.document_body.classList.remove('nb-status__noselect');
          /**
           * Remove the current cloned picker.
           */
          _this3.cloned_picker.remove();

          /**
           * Check if dragging a picker.
           */
          if (_this3.dragging_node.classList.contains('nb-editor_block_picker')) {
            /**
             * Create a new block.
             * 
             * New position have been set in this.preselect_banner 
             * during the mousemove event.
             */
            _this3.create_new_block(_this3.dragging_node, e.target.closest('.nb-base'));
          }

          /**
           * Check if dragging a block.
           */
          if (_this3.dragging_node.classList.contains('nb-block')) {
            /**
             * Move the block to the new position.
             * 
             * New position have been set in this.preselect_banner 
             * during the mousemove event.
             */
            _this3.move_block(_this3.dragging_node);

            /**
             * Make the block visible again.
             */
            _this3.dragging_node.classList.remove('nb-display__none');

            /**
             * Remove the Preselect Banner.
             */
            _this3.remove_preselect_banner();
          }
        }

        /**
         * When we release the click, then we are not dragging 
         * anything.
         */
        _this3.dragging_node = false;
      });
    }
  }, {
    key: "is_block_upper_half",
    value: function is_block_upper_half(hovering_element, e) {
      var block_position = hovering_element.getBoundingClientRect();
      var mouse_position = e.clientY - block_position.top;
      var block_height = hovering_element.offsetHeight;
      return mouse_position < block_height / 2 ? true : false;
    }
  }, {
    key: "is_close_to_edges",
    value: function is_close_to_edges(hovering_element, e) {
      var block_position = hovering_element.getBoundingClientRect();
      var mouse_position = e.clientY - block_position.top;
      var block_height = hovering_element.offsetHeight;
      return mouse_position < 20 || mouse_position > block_height - 20 ? true : false;
    }
  }, {
    key: "insert_preselect_banner",
    value: function insert_preselect_banner(e) {
      /**
       * If e.target it is not a valid node element
       * then just return;
       */
      if ('function' !== typeof e.target.closest) {
        return;
      }

      /**
       * Set either a base or a block as a hovering element.
       */
      var hovering_element = e.target.closest('.nb-block,.nb-base');

      /**
       * If any hover is selected, the return.
       */
      if (!hovering_element) {
        return;
      }

      /**
       * In case we are hovering a base( the main wrapper or a column block ).
       */
      if (hovering_element.classList.contains('nb-base')) {
        /**
         * In case the base contains blocks, then 
         * we are only able to either insert or move blocks
         * when we are close to the upper or the bottom edges.
         */
        if (hovering_element.querySelectorAll('.nb-block').length > 0) {
          /**
           * If we are not close to the edges then just return.
           */
          if (!this.is_close_to_edges(hovering_element, e)) {
            return;
          }
        }
        if (this.is_block_upper_half(hovering_element, e)) {
          hovering_element.prepend(this.preselect_banner);
        } else {
          hovering_element.appendChild(this.preselect_banner);
        }
      } else {
        if (this.is_block_upper_half(hovering_element, e)) {
          hovering_element.parentNode.insertBefore(this.preselect_banner, hovering_element);
        } else {
          hovering_element.parentNode.insertBefore(this.preselect_banner, hovering_element.nextSibling);
        }
      }
    }
  }, {
    key: "create_dialog_element",
    value: function create_dialog_element() {
      this.dialog = document.createElement('div');
      this.dialog.classList.add('nb-dialog');
      this.dialog.classList.add('nb-display__none');
      this.document_body.appendChild(this.dialog);
    }
  }, {
    key: "register_block_picker_btn_events",
    value: function register_block_picker_btn_events() {
      var _this4 = this;
      this.block_picker_btn.addEventListener('click', function () {
        if (_this4.content_wrap) {
          _this4.content_wrap.classList.add('nb-display__none');
        }
        if (_this4.style_wrap) {
          _this4.style_wrap.classList.add('nb-display__none');
        }
        _this4.nav_bar.classList.add('nb-display__none');
        _this4.blocks_picker_wrap.classList.remove('nb-display__none');
      });
    }
  }, {
    key: "update_all_controls_list",
    value: function update_all_controls_list() {
      this.all_controls = this.editor.querySelectorAll('.nb_control_wrap');
    }
  }, {
    key: "update_all_controls_wrap_list",
    value: function update_all_controls_wrap_list() {
      this.all_controls_wrap = this.editor.querySelectorAll('.nb-controls_wrap');
    }
  }, {
    key: "remove_preselect_banner",
    value: function remove_preselect_banner() {
      var preselect_banners = document.querySelectorAll('.nb-preselect_banner');
      Array.prototype.forEach.call(preselect_banners, function (preselect_banner) {
        preselect_banner.remove();
      });
    }
  }, {
    key: "register_preselect_banner_events",
    value: function register_preselect_banner_events() {
      this.preselect_banner = document.createElement('div');
      this.preselect_banner.classList.add('nb-preselect_banner');
    }
  }, {
    key: "move_block",
    value: function move_block(block) {
      if (typeof this.preselect_banner.parentNode === 'undefined') {
        return;
      }
      if (this.preselect_banner.parentNode === null) {
        return;
      }

      /**
       * Insert if the new child isn't an ancestor of the parent.
       */
      if (!block.contains(this.preselect_banner.parentNode)) {
        this.preselect_banner.parentNode.insertBefore(block, this.preselect_banner);
        this.select_block(block);
        block.click();
      } else {
        console.log('Error: The new child is an ancestor of the parent');
      }
    }
  }, {
    key: "set_cloner_picker",
    value: function set_cloner_picker(element, mousedown_event) {
      this.cloned_picker = element.cloneNode(true);
      this.cloned_picker.style.left = mousedown_event.clientX + 'px';
      this.cloned_picker.style.top = mousedown_event.clientY + 'px';
      this.cloned_picker.classList.add('nb-editor_cloned_picker');
      this.cloned_picker.classList.add('nb-display__none');
      this.document_body.appendChild(this.cloned_picker);
      this.document_body.classList.add('nb-status__noselect');
    }
  }, {
    key: "insert_block",
    value: function insert_block(block_id, block_html, editor_controls_html, styles_data) {
      var _this5 = this;
      console.log('Insert Block');
      console.log({
        block_id: block_id,
        block_html: block_html,
        editor_controls_html: editor_controls_html,
        styles_data: styles_data
      });
      /**
       * Valadation before insert the block.
       */
      if (!this.preselect_banner || !block_id || !block_html) {
        return;
      }

      /**
       * Store the editors controls html into a temporally element.
       * so we can select them.
       */
      this.temp_wrap.innerHTML = editor_controls_html;
      var temp_controls = this.temp_wrap.querySelectorAll('.nb-controls_wrap');
      Array.prototype.forEach.call(temp_controls, function (control) {
        if (control.classList.contains('nb_tab_content')) {
          if (_this5.content_wrap) {
            _this5.content_wrap.appendChild(control);
          }
        } else {
          if (_this5.style_wrap) {
            _this5.style_wrap.appendChild(control);
          }
        }
      });

      /**
       * Store the block html into a temporally element.
       * so we can select it.
       */
      this.temp_wrap.innerHTML = block_html;
      var block = this.temp_wrap.querySelector('.nb-block[data-blockid="' + block_id + '"]');
      this.preselect_banner.parentNode.insertBefore(block, this.preselect_banner);
      this.remove_preselect_banner();

      /**
       * Update our editor with the new Block.
       */
      this.update_all_blocks();
      this.update_all_controls_wrap_list();
      this.update_all_controls_list();
      this.register_controls_events();
      this.render_block_style(block_id);
      this.styles_obj.setControlsValues(block_id, styles_data);
    }
  }, {
    key: "create_new_block",
    value: function create_new_block(block_picker, selected_base) {
      var _this6 = this;
      /**
       * Valadation before create the block.
       */
      if (!block_picker || !selected_base) {
        return;
      }

      /**
       * Set arguments to send to the server.
       */
      var args = {
        action: 'create_block',
        post_id: nb_ajax_var.post_id,
        block_type: block_picker.dataset.blocktype,
        base_id: selected_base.dataset.blockid
      };

      /**
       * Ajax Call.
       */
      this.ajax_handler(args).then(function (data) {
        if (data.status == 'success') {
          switch (data.callback) {
            case 'insert_block':
              _this6.insert_block(data.block_id, data.block_html, data.editor_controls_html, data.styles_data);
              break;
            default:
              break;
          }
        } else {
          console.log('Error received from server');
        }
      })["catch"](function (error) {
        console.log(error);
      });
    }
  }, {
    key: "register_hide_editor_events",
    value: function register_hide_editor_events() {
      var _this7 = this;
      this.hide_editor_btn.addEventListener('click', function () {
        _this7.document_body.classList.toggle('nb-status_hide_editor');
      });
    }

    /**
     * Slide Editor bar, which allow to 
     * shirink or expand the editor.
     */
  }, {
    key: "register_editor_slide_events",
    value: function register_editor_slide_events() {
      var _this8 = this;
      var is_pressed = false;
      this.slide_editor.addEventListener('mousedown', function () {
        is_pressed = true;
        _this8.document_body.classList.add('nb-status__noselect');
      });
      document.addEventListener('mousemove', function (e) {
        if (is_pressed && e.clientX > 200 && e.clientX < 600) {
          _this8.document_body.style.marginLeft = e.clientX + 'px';
          _this8.editor.style.width = e.clientX + 'px';
        }
      });
      document.addEventListener('mouseup', function () {
        if (is_pressed) {
          _this8.document_body.classList.remove('nb-status__noselect');
          is_pressed = false;
        }
      });
    }
  }, {
    key: "update_on_the_fly",
    value: function update_on_the_fly(control_wrap) {
      /**
       * If the data-uof attribute isn't present, 
       * then continue;
       */
      if ('true' != control_wrap.dataset.uof) {
        return;
      }

      /**
       * If Block type is column, then return.
       */
      if ('nb_columns_block' == control_wrap.closest('.nb-controls_wrap').dataset.blocktype) {
        return;
      }
      switch (control_wrap.dataset.type) {
        case 'text':
          this.content_uof__text(control_wrap);
          break;
        case 'select':
          this.content_uof__select(control_wrap);
          break;
        default:
          break;
      }
    }
  }, {
    key: "style_uof__select",
    value: function style_uof__select(control_wrap) {
      var _this9 = this;
      /**
       * Get the input element.
       */
      var input = control_wrap.querySelector('select');
      input.addEventListener('input', function () {
        var block_id = input.closest('.nb-controls_wrap').dataset.blockid;
        var control_id = input.closest('.nb_control_wrap').dataset.controlid;
        var value = input.value;
        var screen = input.closest('.nb_control_wrap').querySelector('.nb-control_resp_btn.active').dataset.screen;

        /**
         * Update Styles Object
         */
        _this9.styles_obj.setPropertyValue(block_id, control_id, screen, value);
        _this9.check_all_blocks_conditions(control_wrap.closest('.nb-controls_wrap'));
      });
    }
  }, {
    key: "style_uof__text",
    value: function style_uof__text(control_wrap) {
      var _this10 = this;
      var input = control_wrap.querySelector('input');
      input.addEventListener('input', function () {
        var block_id = input.closest('.nb-controls_wrap').dataset.blockid;
        var control_id = input.closest('.nb_control_wrap').dataset.controlid;
        var value = input.value;
        var screen = input.closest('.nb_control_wrap').querySelector('.nb-control_resp_btn.active').dataset.screen;

        /**
         * Update Styles Object
         */
        _this10.styles_obj.setPropertyValue(block_id, control_id, screen, value);
        _this10.check_all_blocks_conditions(control_wrap.closest('.nb-controls_wrap'));
      });
    }
  }, {
    key: "render_block_style",
    value: function render_block_style(block_id) {
      /**
       * Remove Current Styles of the Block.
       */
      Array.prototype.forEach.call(document.querySelectorAll('style.nb-style-' + block_id), function (style_tab) {
        style_tab.remove();
      });

      /**
       * Create the Style Tab.
       */
      var style_tab = document.createElement('style');
      style_tab.classList.add('nb-style-' + block_id);

      /**
       * Iterate over all controls wrap which matach 
       * the block id.
       */
      Array.prototype.forEach.call(this.editor.querySelectorAll('.nb-controls_wrap[data-blockid="' + block_id + '"]'), function (control_wrap) {
        /**
         * Iterate over all selectors within the controls wraps.
         */
        Array.prototype.forEach.call(control_wrap.querySelectorAll('.nb-editor_selector'), function (selector) {
          var _selector$dataset$ren2;
          style_tab.innerHTML += (_selector$dataset$ren2 = selector.dataset.renderedstyle) !== null && _selector$dataset$ren2 !== void 0 ? _selector$dataset$ren2 : '';
        });
      });

      /**
       * Attach the generated style to the document head.
       */
      document.querySelector('head').appendChild(style_tab);
    }

    /**
     * Update Controls Selectors on Change.
     * 
     */
  }, {
    key: "update_selectors_on_the_fly",
    value: function update_selectors_on_the_fly(control_wrap) {
      switch (control_wrap.dataset.type) {
        case 'select':
          this.style_uof__select(control_wrap);
          break;
        case 'text':
          this.style_uof__text(control_wrap);
          break;
        default:
          break;
      }
    }

    /**
     * Register All Controls Events.
     */
  }, {
    key: "register_controls_events",
    value: function register_controls_events() {
      var _this11 = this;
      Array.prototype.forEach.call(this.all_controls, function (control_wrap) {
        console.log('Register Control');
        console.log(control_wrap);
        /**
         * Do not register the same Control Twice.
         */
        if (_this11.registered_controls.includes(control_wrap)) {
          return;
        } else {
          _this11.registered_controls.push(control_wrap);
        }

        /**
         * Update Style on the Fly (Render Stlyes).
         */
        if (control_wrap.querySelectorAll('.nb-control_resp_btn').length > 0) {
          _this11.update_selectors_on_the_fly(control_wrap, control_wrap.querySelector('.nb-control_responsive_btns'));
        } else {
          /**
           * 
           * If Control do not have selectos, then we can update its
           * content on the fly, if needed.
           * 
           * Update Content on the Fly (Ajax Call).
           */
          if (control_wrap.dataset.uof) {
            _this11.update_on_the_fly(control_wrap);
          }
        }

        /**
         * Set Conditional Fields Visibility.
         */
        if (control_wrap.dataset.hasconditions) {
          _this11.check_conditions_for_control(control_wrap);
        }
      });
    }
  }, {
    key: "check_conditions_for_control",
    value: function check_conditions_for_control(control_wrap) {
      /**
       * If the condition isn't met, then hide the control.
       */
      var attr_names = control_wrap.getAttributeNames();
      var display_control = true;
      var _iterator = _createForOfIteratorHelper(attr_names),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var attr_name = _step.value;
          if (attr_name.includes('data-cond-target-')) {
            var target_name = control_wrap.getAttribute(attr_name);
            var cond_value = control_wrap.getAttribute(attr_name.replace('data-cond-target-', 'data-cond-value-'));

            /**
             * Check if condition met.
             */
            var target_control = control_wrap.closest('.nb-controls_wrap').querySelector('div[data-controlid="' + target_name + '"]');

            /**
             * If Target Controls isn't defined, then
             * just return.
             */
            if (!target_control) {
              return;
            }
            var target_value = '';
            switch (target_control.dataset.type) {
              case 'select':
                target_value = target_control.querySelector('select').value;
                break;
              case 'text':
                target_value = target_control.querySelector('input').value;
                break;
              default:
                break;
            }
            if (target_value != cond_value) {
              display_control = false;
            }
          }
        }

        /**
         * If all conditions are met, then display the control.
         * Otheriwse hide it.
         */
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      if (display_control) {
        control_wrap.classList.remove('nb-display__none');
      } else {
        control_wrap.classList.add('nb-display__none');
      }
    }
  }, {
    key: "check_all_blocks_conditions",
    value: function check_all_blocks_conditions(controls_wrap) {
      var _this12 = this;
      Array.prototype.forEach.call(controls_wrap.querySelectorAll('.nb_control_wrap'), function (control_wrap) {
        _this12.check_conditions_for_control(control_wrap);
      });
    }
  }, {
    key: "update_all_blocks",
    value: function update_all_blocks() {
      this.blocks = document.querySelectorAll('.nb-block');
    }
  }, {
    key: "content_uof__select",
    value: function content_uof__select(control_wrap) {
      var _this13 = this;
      /**
       * Get the input element.
       */
      var input = control_wrap.querySelector('select');
      input.addEventListener('input', function () {
        _this13.uof_ajax_caller(control_wrap);
        _this13.check_all_blocks_conditions(control_wrap.closest('.nb-controls_wrap'));
      });
    }

    /**
     * Update text on the fly.
     * 
     * Every time the input gets modified, 
     * this function waits 500ms before calling 
     * ajax and request the block with the new 
     * information.
     */
  }, {
    key: "content_uof__text",
    value: function content_uof__text(control_wrap) {
      var input = control_wrap.querySelector('input');
      var interval_set = false;
      var key_pressed = false;
      var self = this;
      input.addEventListener('input', function () {
        key_pressed = true;
        if (!interval_set) {
          var set_key_pressed_to_off = function set_key_pressed_to_off() {
            key_pressed = false;
          };
          var check_if_still_pressing_keys = function check_if_still_pressing_keys() {
            if (key_pressed == false) {
              interval_set = false;
              clearInterval(key_to_off);
              clearInterval(check);
              self.uof_ajax_caller(control_wrap);
              self.check_all_blocks_conditions(control_wrap.closest('.nb-controls_wrap'));
            } else {}
          };
          interval_set = true;
          var key_to_off = setInterval(set_key_pressed_to_off, 200);
          var check = setInterval(check_if_still_pressing_keys, 500);
        }
      });
    }
  }, {
    key: "collect_controls_values",
    value: function collect_controls_values(controls_wrap_list) {
      var _this14 = this;
      var controls_values = {};
      Array.prototype.forEach.call(controls_wrap_list, function (controls_wrap) {
        /**
         * Get all controls inside the wrapper.
         */
        var controls = controls_wrap.querySelectorAll('.nb_control_wrap');

        /**
         * Create an object on the first iteration.
         */
        Array.prototype.forEach.call(controls, function (control) {
          var value;
          var control_type = control.dataset.type,
            control_id = control.dataset.controlid;
          switch (control_type) {
            case 'text':
              value = _this14.collect_data_from_control__text(control);
              break;
            case 'select':
              value = _this14.collect_data_from_control__select(control);
              break;
            default:
              break;
          }
          controls_values[control_id] = value;
        });
      });
      return controls_values;
    }
  }, {
    key: "collect_controls_data",
    value: function collect_controls_data(controls_wrap_list) {
      var _this15 = this;
      var blocks = {};
      Array.prototype.forEach.call(controls_wrap_list, function (controls_wrap) {
        var block_id = controls_wrap.dataset.blockid;

        /**
         * Create an object on the first iteration.
         */
        if (typeof blocks[block_id] === 'undefined') {
          blocks[block_id] = {};
        }

        /**
         * Set the Block's Type.
         */
        blocks[block_id]['block_type'] = controls_wrap.dataset.blocktype;

        /**
         * Create an object on the first iteration.
         */
        if (typeof blocks[block_id]['controls_values'] === 'undefined') {
          blocks[block_id]['controls_values'] = {};
        }
        blocks[block_id]['controls_values'] = _this15.collect_controls_values(controls_wrap_list);
      });
      return blocks;
    }
  }, {
    key: "uof_ajax_caller",
    value: function uof_ajax_caller(control_wrap) {
      var _this16 = this;
      var block_id = control_wrap.closest('.nb-controls_wrap').dataset.blockid;
      var block_type = control_wrap.closest('.nb-controls_wrap').dataset.blocktype;
      var block_controls_wrap = this.editor.querySelectorAll('.nb-controls_wrap[data-blockid="' + block_id + '"]');
      var block_data_object = this.collect_controls_data(block_controls_wrap);
      var block_data_string = JSON.stringify(block_data_object);
      var args = {
        action: 'uof_save_block',
        block_id: block_id,
        block_data: block_data_string,
        block_type: block_type
      };
      this.ajax_handler(args).then(function (data) {
        if (data.status == 'success') {
          if (typeof data.callback != 'undefined') {
            switch (data.callback) {
              case 'update_block':
                _this16.update_block(data.block_id, data.html_content);
                break;
              default:
                break;
            }
          }
        } else {
          console.log('Error received from server');
        }
      })["catch"](function (error) {
        console.log(error);
      });
    }
  }, {
    key: "update_block",
    value: function update_block(block_id, html_content) {
      var block = document.querySelector('.nb-block[data-blockid="' + block_id + '"]');
      block.outerHTML = html_content;
      block = document.querySelector('.nb-block[data-blockid="' + block_id + '"]');
      this.update_all_blocks();
    }
  }, {
    key: "collect_data_from_control__text",
    value: function collect_data_from_control__text(control) {
      var input = control.querySelector('input');
      return input.value;
    }
  }, {
    key: "collect_data_from_control__select",
    value: function collect_data_from_control__select(control) {
      var select = control.querySelector('select');
      return select.value;
    }

    /**
     * Collect Blocks Data.
     */
  }, {
    key: "collect_block_data",
    value: function collect_block_data(blocks_list) {
      var _this17 = this;
      var all_blocks_controls_data = [];

      /**
       * Loop over all the blocks.
       */
      Array.prototype.forEach.call(blocks_list, function (block) {
        if (!block.classList.contains('nb-block')) {
          return;
        }
        var controls_data = {};
        var controls_wrap_list = _this17.editor.querySelectorAll('.nb-controls_wrap[data-blockid="' + block.dataset.blockid + '"]');
        // const controls_values       = this.collect_controls_values(controls_wrap_list);

        var controls_values = _this17.styles_obj.getControlsValues(block.dataset.blockid);
        controls_data['block_id'] = block.dataset.blockid;
        controls_data['block_type'] = block.dataset.blocktype;
        controls_data['controls_values'] = controls_values;
        if (block.children.length > 0) {
          controls_data['children'] = _this17.collect_block_data(block.children);
        }
        all_blocks_controls_data.push(controls_data);
      });
      return all_blocks_controls_data;
    }
  }, {
    key: "collect_wrappers_data",
    value: function collect_wrappers_data(noder_wrap) {
      return this.collect_block_data(noder_wrap.children);
      ;
    }
  }, {
    key: "collect_node_wraps_data",
    value: function collect_node_wraps_data() {
      var _this18 = this;
      var noder_wraps_data = {};
      var noder_wraps_list = document.querySelectorAll('.nb-main_wrap');
      Array.prototype.forEach.call(noder_wraps_list, function (noder_wrap) {
        var base_id = noder_wrap.dataset.blockid;
        var controls_data = _this18.collect_wrappers_data(noder_wrap);
        noder_wraps_data[base_id] = controls_data;
      });
      return noder_wraps_data;
    }
  }, {
    key: "create_styles_object",
    value: function create_styles_object() {
      var controls_wrap_list = this.editor.querySelectorAll('.nb-controls_wrap');
      var styles_object = {};
      Array.prototype.forEach.call(controls_wrap_list, function (controls_wrap) {
        var selectors = controls_wrap.querySelectorAll('.nb-editor_selector');
        var iterator = 0;
        if (selectors.length < 1) {
          return;
        }
        if (typeof styles_object[controls_wrap.dataset.blockid] === 'undefined') {
          styles_object[controls_wrap.dataset.blockid] = {};
          styles_object[controls_wrap.dataset.blockid]['selectors'] = {};
        }
        Array.prototype.forEach.call(selectors, function (selector) {
          var data_selector = selector.dataset.selector;
          var nail_selector = selector.dataset.selector.replace('.nb-base div.nb-block.' + controls_wrap.dataset.blockid, '');
          var rendered_style = selector.dataset.renderedstyle;
          nail_selector = nail_selector ? nail_selector : iterator;
          rendered_style = rendered_style.replace(data_selector + '{', '');
          // rendered_style  = rendered_style.slice(0, -1);
          // rendered_style  = rendered_style.replace('}', '');
          rendered_style = rendered_style.substring(0, rendered_style.length - 1);
          styles_object[controls_wrap.dataset.blockid]['selectors'][nail_selector] = rendered_style;
          iterator++;
        });
      });
      return styles_object;
    }

    /**
     * Update Current Post Button.
     * (This updates all the content of the bases in the current post)
     */
  }, {
    key: "register_update_btn_events",
    value: function register_update_btn_events() {
      var _this19 = this;
      this.update_post_btn.addEventListener('click', function () {
        var noder_wraps_data = _this19.collect_node_wraps_data();
        var styles_object = _this19.styles_obj.getStylesObject();
        var stringfy_data = JSON.stringify(noder_wraps_data);
        var stringfy_styles = JSON.stringify(styles_object);
        var args = {
          action: 'save_post',
          post_id: nb_ajax_var.post_id,
          noder_data: stringfy_data,
          styles_data: stringfy_styles
        };
        _this19.ajax_handler(args).then(function (data) {
          if (data.status == 'success') {
            console.log('Success');
          } else {
            console.log('Error received from server');
          }
        })["catch"](function (error) {
          console.log(error);
        });
      });
    }

    /**
     * Remove Block's Styles from the Current Head.
     */
  }, {
    key: "remove_block_style",
    value: function remove_block_style(block_id) {
      Array.prototype.forEach.call(document.querySelectorAll('style.nb-style-' + block_id), function (style_tab) {
        style_tab.remove();
      });
    }
  }, {
    key: "delete_block",
    value: function delete_block(block_id) {
      var _this20 = this;
      var block = document.querySelector('.nb-block[data-blockid="' + block_id + '"]');

      /**
       * Before remove all this block's childrens.
       * 
       */
      Array.prototype.forEach.call(block.children, function (descendent) {
        if (descendent.classList.contains('nb-block')) {
          _this20.delete_block(descendent.dataset.blockid);
        }
      });

      /**
       * Remove the Block's Controls.
       */
      var block_controls = this.editor.querySelectorAll('.nb-controls_wrap[data-blockid="' + block_id + '"]');
      Array.prototype.forEach.call(block_controls, function (block_control) {
        block_control.remove();
      });

      /**
       * Remove the Block's Styles.
       */
      this.remove_block_style(block_id);

      /**
       * Remove the Block Itself.
       */
      block.remove();
    }
  }, {
    key: "show_hover_border",
    value: function show_hover_border(block) {
      /**
       * Show hover border for currrent block.
       */
      block.classList.add('nb-block_show_edit_btn');

      /**
       * Show hover border for any wrapper block.
       */
      var wrapper_block = block.parentNode.closest('.nb-block');
      while (wrapper_block) {
        wrapper_block.classList.add('nb-block_show_edit_btn');
        wrapper_block = wrapper_block.parentNode.closest('.nb-block');
      }
    }
  }, {
    key: "remove_hover_border",
    value: function remove_hover_border(block) {
      /**
       * Show hover border for currrent block.
       */
      block.classList.remove('nb-block_show_edit_btn');

      /**
       * Show hover border for any wrapper block.
       */
      var wrapper_block = block.parentNode.closest('.nb-block');
      while (wrapper_block) {
        wrapper_block.classList.remove('nb-block_show_edit_btn');
        wrapper_block = wrapper_block.parentNode.closest('.nb-block');
      }
    }
  }, {
    key: "select_block",
    value: function select_block(block) {
      /**
       * Remove selected from all blocks.
       */
      Array.prototype.forEach.call(this.blocks, function (block) {
        block.classList.remove('nb-block_selected');
      });

      /**
       * Add selected to this block.
       */
      block.classList.add('nb-block_selected');
    }
  }, {
    key: "register_nav_bar_events",
    value: function register_nav_bar_events() {
      var _this21 = this;
      Array.prototype.forEach.call(this.nav_bar_links, function (link) {
        link.addEventListener('click', function () {
          /**
           * Hide all the tab contents.
           */
          Array.prototype.forEach.call(_this21.tab_contents, function (content) {
            content.classList.remove('nb_display_block');
          });

          /**
           * Remove selected from the links.
           */
          Array.prototype.forEach.call(_this21.nav_bar_links, function (this_link) {
            this_link.classList.remove('nb-editor_selected');
          });

          /**
           * Add selected to the clicked link.
           */
          link.classList.add('nb-editor_selected');

          /**
           * Show the content of the clicked tab
           */
          _this21.editor.querySelector('.nb-editor_tab_content_' + link.dataset.tab).classList.add('nb_display_block');
        });
      });
    }
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
                if (!(typeof nb_ajax_var == 'undefined' || !data)) {
                  _context.next = 4;
                  break;
                }
                return _context.abrupt("return");
              case 4:
                request = new XMLHttpRequest(), url = new URL(nb_ajax_var.url);
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
      function ajax_handler() {
        return _ajax_handler.apply(this, arguments);
      }
      return ajax_handler;
    }()
  }]);
  return NbEditor;
}();
new NbEditor();

/***/ }),

/***/ "./src/sass/lrc.scss":
/*!***************************!*\
  !*** ./src/sass/lrc.scss ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/sass/temp/.sass-output.css":
/*!****************************************!*\
  !*** ./src/sass/temp/.sass-output.css ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/sass/temp/.sass-fcp-home-output.css":
/*!*************************************************!*\
  !*** ./src/sass/temp/.sass-fcp-home-output.css ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/sass/temp/.sass-fcp-single-output.css":
/*!***************************************************!*\
  !*** ./src/sass/temp/.sass-fcp-single-output.css ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/sass/temp/.sass-lrc-output.css":
/*!********************************************!*\
  !*** ./src/sass/temp/.sass-lrc-output.css ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./app/SavvyBuilder/src/sass/editor.scss":
/*!***********************************************!*\
  !*** ./app/SavvyBuilder/src/sass/editor.scss ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/sass/app.scss":
/*!***************************!*\
  !*** ./src/sass/app.scss ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/sass/fcp-home.scss":
/*!********************************!*\
  !*** ./src/sass/fcp-home.scss ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/sass/fcp-single.scss":
/*!**********************************!*\
  !*** ./src/sass/fcp-single.scss ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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
/******/ 			"/app/SavvyBuilder/public/js/nb-editor": 0,
/******/ 			"src/sass/temp/.sass-fcp-single-output": 0,
/******/ 			"src/sass/temp/.sass-fcp-home-output": 0,
/******/ 			"src/sass/temp/.sass-output": 0,
/******/ 			"app/SavvyBuilder/public/css/nb-editor": 0,
/******/ 			"assets/css/ps-lrc": 0,
/******/ 			"assets/css/ps-fcp-single": 0,
/******/ 			"assets/css/ps-fcp-home": 0,
/******/ 			"assets/css/all": 0,
/******/ 			"src/sass/temp/.sass-lrc-output": 0
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
/******/ 	__webpack_require__.O(undefined, ["src/sass/temp/.sass-fcp-single-output","src/sass/temp/.sass-fcp-home-output","src/sass/temp/.sass-output","app/SavvyBuilder/public/css/nb-editor","assets/css/ps-lrc","assets/css/ps-fcp-single","assets/css/ps-fcp-home","assets/css/all","src/sass/temp/.sass-lrc-output"], () => (__webpack_require__("./app/SavvyBuilder/src/js/editor.js")))
/******/ 	__webpack_require__.O(undefined, ["src/sass/temp/.sass-fcp-single-output","src/sass/temp/.sass-fcp-home-output","src/sass/temp/.sass-output","app/SavvyBuilder/public/css/nb-editor","assets/css/ps-lrc","assets/css/ps-fcp-single","assets/css/ps-fcp-home","assets/css/all","src/sass/temp/.sass-lrc-output"], () => (__webpack_require__("./app/SavvyBuilder/src/sass/editor.scss")))
/******/ 	__webpack_require__.O(undefined, ["src/sass/temp/.sass-fcp-single-output","src/sass/temp/.sass-fcp-home-output","src/sass/temp/.sass-output","app/SavvyBuilder/public/css/nb-editor","assets/css/ps-lrc","assets/css/ps-fcp-single","assets/css/ps-fcp-home","assets/css/all","src/sass/temp/.sass-lrc-output"], () => (__webpack_require__("./src/sass/app.scss")))
/******/ 	__webpack_require__.O(undefined, ["src/sass/temp/.sass-fcp-single-output","src/sass/temp/.sass-fcp-home-output","src/sass/temp/.sass-output","app/SavvyBuilder/public/css/nb-editor","assets/css/ps-lrc","assets/css/ps-fcp-single","assets/css/ps-fcp-home","assets/css/all","src/sass/temp/.sass-lrc-output"], () => (__webpack_require__("./src/sass/fcp-home.scss")))
/******/ 	__webpack_require__.O(undefined, ["src/sass/temp/.sass-fcp-single-output","src/sass/temp/.sass-fcp-home-output","src/sass/temp/.sass-output","app/SavvyBuilder/public/css/nb-editor","assets/css/ps-lrc","assets/css/ps-fcp-single","assets/css/ps-fcp-home","assets/css/all","src/sass/temp/.sass-lrc-output"], () => (__webpack_require__("./src/sass/fcp-single.scss")))
/******/ 	__webpack_require__.O(undefined, ["src/sass/temp/.sass-fcp-single-output","src/sass/temp/.sass-fcp-home-output","src/sass/temp/.sass-output","app/SavvyBuilder/public/css/nb-editor","assets/css/ps-lrc","assets/css/ps-fcp-single","assets/css/ps-fcp-home","assets/css/all","src/sass/temp/.sass-lrc-output"], () => (__webpack_require__("./src/sass/lrc.scss")))
/******/ 	__webpack_require__.O(undefined, ["src/sass/temp/.sass-fcp-single-output","src/sass/temp/.sass-fcp-home-output","src/sass/temp/.sass-output","app/SavvyBuilder/public/css/nb-editor","assets/css/ps-lrc","assets/css/ps-fcp-single","assets/css/ps-fcp-home","assets/css/all","src/sass/temp/.sass-lrc-output"], () => (__webpack_require__("./src/sass/temp/.sass-output.css")))
/******/ 	__webpack_require__.O(undefined, ["src/sass/temp/.sass-fcp-single-output","src/sass/temp/.sass-fcp-home-output","src/sass/temp/.sass-output","app/SavvyBuilder/public/css/nb-editor","assets/css/ps-lrc","assets/css/ps-fcp-single","assets/css/ps-fcp-home","assets/css/all","src/sass/temp/.sass-lrc-output"], () => (__webpack_require__("./src/sass/temp/.sass-fcp-home-output.css")))
/******/ 	__webpack_require__.O(undefined, ["src/sass/temp/.sass-fcp-single-output","src/sass/temp/.sass-fcp-home-output","src/sass/temp/.sass-output","app/SavvyBuilder/public/css/nb-editor","assets/css/ps-lrc","assets/css/ps-fcp-single","assets/css/ps-fcp-home","assets/css/all","src/sass/temp/.sass-lrc-output"], () => (__webpack_require__("./src/sass/temp/.sass-fcp-single-output.css")))
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["src/sass/temp/.sass-fcp-single-output","src/sass/temp/.sass-fcp-home-output","src/sass/temp/.sass-output","app/SavvyBuilder/public/css/nb-editor","assets/css/ps-lrc","assets/css/ps-fcp-single","assets/css/ps-fcp-home","assets/css/all","src/sass/temp/.sass-lrc-output"], () => (__webpack_require__("./src/sass/temp/.sass-lrc-output.css")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;