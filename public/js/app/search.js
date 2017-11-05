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
/******/ 	return __webpack_require__(__webpack_require__.s = 63);
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

/***/ 63:
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

    // 初始化一个空对象
    var _this = _possibleConstructorReturn(this, (IoIo.__proto__ || Object.getPrototypeOf(IoIo)).call(this, props));

    _this.state = {};
    return _this;
  }

  _createClass(IoIo, [{
    key: 'componentDidMount',
    value: function componentDidMount() {}
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'project_list_wrap' },
        React.createElement(Projectsearch, null),
        React.createElement(Projectlist, null),
        React.createElement(ProjectButton, null),
        React.createElement(Top, null)
      );
    }
  }]);

  return IoIo;
}(React.Component);

;

var Projectsearch = function (_React$Component2) {
  _inherits(Projectsearch, _React$Component2);

  function Projectsearch(props) {
    _classCallCheck(this, Projectsearch);

    // 初始化一个空对象
    var _this2 = _possibleConstructorReturn(this, (Projectsearch.__proto__ || Object.getPrototypeOf(Projectsearch)).call(this, props));

    _this2.state = {};
    return _this2;
  }

  _createClass(Projectsearch, [{
    key: 'componentDidMount',
    value: function componentDidMount() {}
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'page__bd project_list_search' },
        React.createElement(
          'div',
          { className: 'weui-search-bar', id: 'searchBar' },
          React.createElement(
            'form',
            { className: 'weui-search-bar__form' },
            React.createElement(
              'div',
              { className: 'weui-search-bar__box' },
              React.createElement('i', { className: 'weui-icon-search' }),
              React.createElement('input', { type: 'search', className: 'weui-search-bar__input', id: 'searchInput', placeholder: '\u641C\u7D22', required: '' })
            )
          ),
          React.createElement(
            'a',
            { href: 'javascript:', className: 'weui-search-bar__cancel-btn', id: 'searchCancel' },
            '\u53D6\u6D88'
          )
        )
      );
    }
  }]);

  return Projectsearch;
}(React.Component);

;

var Projectlist = function (_React$Component3) {
  _inherits(Projectlist, _React$Component3);

  function Projectlist(props) {
    _classCallCheck(this, Projectlist);

    var _this3 = _possibleConstructorReturn(this, (Projectlist.__proto__ || Object.getPrototypeOf(Projectlist)).call(this, props));

    _this3.handleMinus = _this3.handleMinus.bind(_this3);
    _this3.handlePlus = _this3.handlePlus.bind(_this3);
    _this3.handleSure = _this3.handleSure.bind(_this3);
    _this3.handleBack = _this3.handleBack.bind(_this3);
    _this3.handleBuy = _this3.handleBuy.bind(_this3);
    // 初始化一个空对象
    _this3.state = { project_list: [], number: 1 };
    return _this3;
  }

  _createClass(Projectlist, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var list = [{ img: 'images/img1.jpg', name: '这个名字够不够长你说，不够长我还可以加，加到你满意为止', price: '100.00' }, { img: 'images/img2.jpg', name: '来一个短一点的', price: '100.00' }, { img: 'images/img3.jpg', name: '汉堡', price: '999.00' }, { img: 'images/img4.jpg', name: '猪肉', price: '888.00' }, { img: 'images/img5.jpg', name: '葡萄', price: '777.00' }, { img: 'images/img6.jpg', name: '连衣裙', price: '666.00' }];
      this.setState({ project_list: list });
      var number = this.state.number;
      var num = $('#number').val();
      $('#number').val(num);
      this.setState({ number: num });
    }
  }, {
    key: 'handleBuy',
    value: function handleBuy(e) {
      $('.background').show();
      $('.projecrt_number').show();
    }
  }, {
    key: 'handleMinus',
    value: function handleMinus(e) {
      var number = this.state.number;
      var num = $('#number').val();
      if (num > 1) {
        num--;
        $('#number').val(num);
        this.setState({ number: num });
      } else {
        $('#number').val('1');
        this.setState({ number: 1 });
      }
    }
  }, {
    key: 'handlePlus',
    value: function handlePlus(e) {
      var number = this.state.number;
      var num = $('#number').val();
      num++;
      $('#number').val(num);
      this.setState({ number: num });
    }
  }, {
    key: 'handleSure',
    value: function handleSure(e) {
      $('.background').hide();
      $('.projecrt_number').hide();
    }
  }, {
    key: 'handleBack',
    value: function handleBack(e) {
      $('.background').hide();
      $('.projecrt_number').hide();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var style = { marginRight: '5px', display: 'block' };
      return React.createElement(
        'ul',
        { className: 'project_list_ul' },
        this.state.project_list.map(function (item, index) {
          return React.createElement(
            'li',
            { key: index },
            React.createElement(
              'div',
              { className: 'weui-cells' },
              React.createElement(
                'div',
                { className: 'weui-cell font_style position_relative' },
                React.createElement(
                  'div',
                  { className: 'weui-cell__hd project_list_img_wrap' },
                  React.createElement('img', { src: item.img, alt: '', style: style })
                ),
                React.createElement(
                  'div',
                  { className: 'weui-cell__bd product_name' },
                  React.createElement(
                    'p',
                    { className: 'product_name_infor' },
                    item.name
                  ),
                  React.createElement(
                    'p',
                    { className: 'product_price' },
                    React.createElement(
                      'span',
                      null,
                      '\uFFE5'
                    ),
                    item.price
                  )
                ),
                React.createElement(
                  'div',
                  { className: 'weui-cell__ft position_absolute', onClick: _this4.handleBuy },
                  React.createElement('i', { className: 'fa fa-shopping-basket' })
                )
              )
            )
          );
        }),
        React.createElement('div', { className: 'background', onClick: this.handleBack }),
        React.createElement(
          'div',
          { className: 'projecrt_number' },
          React.createElement(
            'div',
            { className: 'projecrt_number_in' },
            React.createElement(
              'p',
              { onClick: this.handleMinus },
              React.createElement('i', { className: 'fa fa-minus' })
            ),
            React.createElement(
              'p',
              null,
              React.createElement(
                'span',
                { className: 'input_out' },
                React.createElement('input', { type: 'number', placeholder: '1', id: 'number' })
              )
            ),
            React.createElement(
              'p',
              { onClick: this.handlePlus },
              React.createElement('i', { className: 'fa fa-plus' })
            ),
            React.createElement(
              'button',
              { className: 'sure', onClick: this.handleSure },
              '\u786E\u5B9A'
            )
          )
        )
      );
    }
  }]);

  return Projectlist;
}(React.Component);

;

var ProjectButton = function (_React$Component4) {
  _inherits(ProjectButton, _React$Component4);

  function ProjectButton(props) {
    _classCallCheck(this, ProjectButton);

    // 初始化一个空对象
    var _this5 = _possibleConstructorReturn(this, (ProjectButton.__proto__ || Object.getPrototypeOf(ProjectButton)).call(this, props));

    _this5.state = {};
    return _this5;
  }

  _createClass(ProjectButton, [{
    key: 'componentDidMount',
    value: function componentDidMount() {}
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'project_list_button' },
        React.createElement(
          'p',
          null,
          '\u53BB\u8D2D\u7269\u8F66'
        )
      );
    }
  }]);

  return ProjectButton;
}(React.Component);

;

// 返回顶部

var Top = function (_React$Component5) {
  _inherits(Top, _React$Component5);

  function Top(props) {
    _classCallCheck(this, Top);

    var _this6 = _possibleConstructorReturn(this, (Top.__proto__ || Object.getPrototypeOf(Top)).call(this, props));

    _this6.handleClick = _this6.handleClick.bind(_this6);
    return _this6;
  }
  // 点击返回顶部


  _createClass(Top, [{
    key: 'handleClick',
    value: function handleClick(e) {
      $('body,html').animate({ scrollTop: 0 }, 400);
    }
    // 页面发生变化的时候触发

  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      $(window).scroll(function () {
        var topHeight = $(window).scrollTop();
        if (topHeight > 100) {
          //当滚动条的位置处于距顶部1000像素以下时，就是大于1000象数时，跳转出现
          $(".top").fadeIn(250);
        } else {
          //否则就消失
          $(".top").fadeOut(250);
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var topHeight = $(window).scrollTop();

      return React.createElement(
        'div',
        { className: 'top', onClick: this.handleClick },
        React.createElement('img', { src: 'images/scroll-to-top-icon.png', alt: '' })
      );
    }
  }]);

  return Top;
}(React.Component);

;

ReactDOM.render(React.createElement(IoIo, null), document.getElementById("search"));

/***/ })

/******/ });