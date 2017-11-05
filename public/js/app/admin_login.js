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
/******/ 	return __webpack_require__(__webpack_require__.s = 66);
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

/***/ 66:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = __webpack_require__(1);
var ReactDOM = __webpack_require__(2);

var IoIo = function (_React$Component) {
    _inherits(IoIo, _React$Component);

    function IoIo(props) {
        _classCallCheck(this, IoIo);

        var _this = _possibleConstructorReturn(this, (IoIo.__proto__ || Object.getPrototypeOf(IoIo)).call(this, props));

        _this.handleClick = _this.handleClick.bind(_this);
        return _this;
    }

    _createClass(IoIo, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            adminLogin();
        }
    }, {
        key: 'handleClick',
        value: function handleClick(e) {
            var user_name = $('#user_name').val();
            var password = $('#password').val();
            if (!user_name) {
                alert('请输入用户名');
                return;
            }
            if (!password) {
                alert('请输入密码');
                return;
            }
            $.ajax({
                url: "/do_login_admin",
                dataType: 'json',
                type: 'POST',
                data: { "username": user_name, "password": password },
                success: function (data) {
                    if (data.success) {
                        location.href = "admin_product_list";
                    } else {
                        alert(data.message);
                    }
                }.bind(this),
                error: function (xhr, status, err) {}.bind(this)
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                { className: 'loding_wrap' },
                React.createElement(
                    'div',
                    { id: 'logo' },
                    React.createElement('img', { src: 'img/logo.png', alt: '' })
                ),
                React.createElement(
                    'div',
                    { id: 'loginbox' },
                    React.createElement(
                        'div',
                        { id: 'loginform', className: 'form-vertical' },
                        React.createElement(
                            'p',
                            null,
                            '\u8BF7\u8F93\u5165\u7528\u6237\u540D\u548C\u5BC6\u7801'
                        ),
                        React.createElement(
                            'div',
                            { className: 'control-group' },
                            React.createElement(
                                'div',
                                { className: 'controls' },
                                React.createElement(
                                    'div',
                                    { className: 'input-prepend' },
                                    React.createElement(
                                        'span',
                                        { className: 'add-on' },
                                        React.createElement('i', { className: 'icon-user' })
                                    ),
                                    React.createElement('input', { type: 'text', placeholder: '\u7528\u6237\u540D', id: 'user_name' })
                                )
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: 'control-group' },
                            React.createElement(
                                'div',
                                { className: 'controls' },
                                React.createElement(
                                    'div',
                                    { className: 'input-prepend' },
                                    React.createElement(
                                        'span',
                                        { className: 'add-on' },
                                        React.createElement('i', { className: 'icon-lock' })
                                    ),
                                    React.createElement('input', { type: 'password', placeholder: '\u5BC6\u7801', id: 'password' })
                                )
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: 'form-actions' },
                            React.createElement(
                                'span',
                                { className: 'pull-left' },
                                React.createElement(
                                    'a',
                                    { href: '#', className: 'flip-link', id: 'to-recover' },
                                    '\u5FD8\u8BB0\u5BC6\u7801?'
                                )
                            ),
                            React.createElement(
                                'span',
                                { className: 'pull-right', onClick: this.handleClick },
                                React.createElement('input', { type: 'submit', className: 'btn btn-inverse', value: '\u767B\u5F55' })
                            )
                        )
                    ),
                    React.createElement(
                        'div',
                        { id: 'recoverform', action: '#', className: 'form-vertical' },
                        React.createElement(
                            'p',
                            null,
                            '\u8F93\u5165\u6CE8\u518C\u624B\u673A\u53F7'
                        ),
                        React.createElement(
                            'div',
                            { className: 'control-group' },
                            React.createElement(
                                'div',
                                { className: 'controls' },
                                React.createElement(
                                    'div',
                                    { className: 'input-prepend' },
                                    React.createElement(
                                        'span',
                                        { className: 'add-on' },
                                        React.createElement('i', { className: 'icon-envelope' })
                                    ),
                                    React.createElement('input', { type: 'text', placeholder: '\u624B\u673A\u53F7' })
                                )
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: 'form-actions' },
                            React.createElement(
                                'span',
                                { className: 'pull-left' },
                                React.createElement(
                                    'a',
                                    { href: '#', className: 'flip-link', id: 'to-login' },
                                    '< \u8FD4\u56DE\u767B\u9646'
                                )
                            ),
                            React.createElement(
                                'span',
                                { className: 'pull-right' },
                                React.createElement('input', { type: 'submit', className: 'btn btn-inverse', value: '\u627E\u56DE' })
                            )
                        )
                    )
                )
            );
        }
    }]);

    return IoIo;
}(React.Component);

;

ReactDOM.render(React.createElement(IoIo, null), document.getElementById("admin_login"));

/***/ })

/******/ });