/******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 56);
/******/ })
/************************************************************************/
/******/ ({

/***/ 1:
/***/ (function(module, exports) {

module.exports = React;

/***/ }),

/***/ 2:
/***/ (function(module, exports) {

module.exports = ReactDOM;

/***/ }),

/***/ 56:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = __webpack_require__(1);
var ReactDOM = __webpack_require__(2);
var time;
function time(num) {
  var t = setInterval(function () {
    num--;
    $(".timenum").html(Math.ceil(num));
    if (num <= 0) {
      clearInterval(t);
      $(".timenum").html('获取验证码');
    }
  }, 1000);
}

var IoIo = function (_React$Component) {
  _inherits(IoIo, _React$Component);

  function IoIo(props) {
    _classCallCheck(this, IoIo);

    var _this = _possibleConstructorReturn(this, (IoIo.__proto__ || Object.getPrototypeOf(IoIo)).call(this, props));

    _this.handleClick = _this.handleClick.bind(_this);
    // 初始化一个空对象
    _this.state = {};
    return _this;
  }

  _createClass(IoIo, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      $('#phone').focus();
      $("[name='checkbox']").prop("checked", true);
      var windowHeight = $(window).height();
      var signupTopHeight = $('.signup_top').height();
      var marginHeight = windowHeight - signupTopHeight - 46;
      $('.signup_button').css('margin-top', marginHeight);
    }
  }, {
    key: 'handleClick',
    value: function handleClick(e) {
      time(60);
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'signup_wrap' },
        React.createElement(
          'div',
          { className: 'signup_top' },
          React.createElement(
            'div',
            { className: 'page__hd signup_title_style' },
            React.createElement(
              'h1',
              { className: 'page__title', id: 'animation' },
              '\u6B22\u8FCE\u6765\u5230\u79C1\u4EBA\u8BA2\u8D27'
            )
          ),
          React.createElement(
            'div',
            { className: 'weui-cells' },
            React.createElement(
              'div',
              { className: 'weui-cell weui-cell_access' },
              React.createElement(
                'div',
                { className: 'weui-cell__bd' },
                React.createElement(
                  'p',
                  { className: 'signup_word_style' },
                  '\u6CE8\u518C'
                )
              ),
              React.createElement(
                'a',
                { className: 'weui-cell__ft account_style', href: 'login' },
                '\u6709\u5E10\u53F7\uFF1F\u53BB\u767B\u5F55'
              )
            )
          ),
          React.createElement(
            'div',
            { className: 'weui-cells weui-cells_form' },
            React.createElement(
              'div',
              { className: 'weui-cell weui-cell_vcode' },
              React.createElement(
                'div',
                { className: 'weui-cell__hd' },
                React.createElement(
                  'label',
                  { className: 'weui-label' },
                  '\u624B\u673A\u53F7'
                )
              ),
              React.createElement(
                'div',
                { className: 'weui-cell__bd' },
                React.createElement('input', { className: 'weui-input', type: 'tel', placeholder: '\u8BF7\u8F93\u5165\u624B\u673A\u53F7', id: 'phone' })
              ),
              React.createElement(
                'div',
                { className: 'weui-cell__ft' },
                React.createElement(
                  'button',
                  { className: 'weui-vcode-btn  timenum', onClick: this.handleClick },
                  '\u83B7\u53D6\u9A8C\u8BC1\u7801'
                )
              )
            ),
            React.createElement(
              'div',
              { className: 'weui-cell' },
              React.createElement(
                'div',
                { className: 'weui-cell__hd' },
                React.createElement(
                  'label',
                  { className: 'weui-label' },
                  '\u5BC6\u7801'
                )
              ),
              React.createElement(
                'div',
                { className: 'weui-cell__bd' },
                React.createElement('input', { className: 'weui-input', placeholder: '\u8BF7\u8F93\u5165\u5BC6\u7801' })
              )
            ),
            React.createElement(
              'div',
              { className: 'weui-cell yanzhengma' },
              React.createElement(
                'div',
                { className: 'weui-cell__hd' },
                React.createElement(
                  'label',
                  { className: 'weui-label' },
                  '\u9A8C\u8BC1\u7801'
                )
              ),
              React.createElement(
                'div',
                { className: 'weui-cell__bd' },
                React.createElement('input', { className: 'weui-input', type: 'number', pattern: '[0-9]*', placeholder: '\u8BF7\u8F93\u5165\u9A8C\u8BC1\u7801' })
              )
            )
          ),
          React.createElement(
            'label',
            { className: 'weui-agree agree_style' },
            React.createElement('input', { id: 'weuiAgree', type: 'checkbox', name: 'checkbox', className: 'weui-agree__checkbox' }),
            React.createElement(
              'span',
              { className: 'weui-agree__text' },
              '\u9009\u62E9\u6CE8\u518C\u4EE3\u8868\u60A8\u5DF2\u7ECF\u540C\u610F',
              React.createElement(
                'a',
                { href: '#' },
                '\u300A\u76F8\u5173\u6761\u6B3E\u300B'
              )
            )
          )
        ),
        React.createElement(
          'div',
          { className: 'signup_button' },
          React.createElement(
            'a',
            { className: 'weui-btn weui-btn_primary', href: 'javascript:', id: 'showTooltips' },
            '\u6CE8\u518C'
          )
        )
      );
    }
  }]);

  return IoIo;
}(React.Component);

;

ReactDOM.render(React.createElement(IoIo, null), document.getElementById("signup"));

/***/ })

/******/ });