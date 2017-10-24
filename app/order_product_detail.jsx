var React = require('react');
var ReactDOM = require('react-dom');
var Nav = require('Nav');

import { Provider, connect } from 'react-redux'
import { createStore } from 'redux'

function product(state, action) {
  switch (action.type) {
  case 'PRODUCT_DETAIL':
    {
      $.ajax({
         url: "/search_product_detail?product_id="+product_id,
         dataType: 'json',
         type: 'GET',
         success: function(data) {
           if (data.success) {
             store.dispatch({ type: 'GET_DATA', data: data});
           }else {
           }
         }.bind(this),
         error: function(xhr, status, err) {
         }.bind(this)
      });

      return state;
    }
  case 'GET_DATA':
  {
    var data = action.data;
    return {product:data.product};
  }

  default:
    return state
  }
}

let store = createStore(product,{product:{}});

const mapStateToProps = (state) => {
    return {
        product: state.product,

    }
}

    // 框架
    class Wrap extends React.Component {
      render() {
          return (
            <div className="HomePage_wrap">
            <Head/>
            <Nav/>
            <Infor/>
            </div>
          );
      }
    };
    class Head extends React.Component {
      render() {
          return (
            <div>
              <div id="header">
          			<h1><a href="#">在线订货后台</a></h1>
          		</div>

          		<div id="search">
          			<input type="text" placeholder="搜索..."/>
                <button type="submit" className="tip-right" title="Search">
                  <i className="icon-search icon-white"></i>
                </button>
          		</div>
          		<div id="user-nav" className="navbar navbar-inverse">
                  <ul className="nav btn-group">
                      <li className="btn btn-inverse" >
                        <a title="" href="#">
                          <i className="icon icon-user"></i>
                          <span className="text">Profile</span>
                        </a>
                      </li>
                      <li className="btn btn-inverse dropdown" id="menu-messages">
                        <a href="#" data-toggle="dropdown" data-target="#menu-messages" className="dropdown-toggle">
                          <i className="icon icon-envelope"></i>
                          <span className="text">Messages</span>
                          <span className="label label-important">5</span>
                          <b className="caret"></b>
                        </a>
                        <ul className="dropdown-menu">
                            <li><a className="sAdd" title="" href="#">new message</a></li>
                            <li><a className="sInbox" title="" href="#">inbox</a></li>
                            <li><a className="sOutbox" title="" href="#">outbox</a></li>
                            <li><a className="sTrash" title="" href="#">trash</a></li>
                        </ul>
                      </li>
                      <li className="btn btn-inverse"><a title="" href="#">
                        <i className="icon icon-cog"></i> <span className="text">Settings</span></a>
                      </li>
                      <li className="btn btn-inverse">
                        <a title="" href="#"><i className="icon icon-share-alt"></i>
                        <span className="text">Logout</span></a>
                      </li>
                  </ul>
              </div>

            </div>
          );
      }
    };

    class Infor extends React.Component {
      render() {
        var style = {backgroundColor:'#555555',borderColor:'#aaaaaa'};
        var style1 = {backgroundColor:'#8399b0'};
        var style2 = {backgroundColor:'#2D2F57'};
        var style3 = {backgroundColor:'#673232'};
        var style4 = {backgroundImage:" url('img/demo/red-green.png')",backgroundRepeat: "no-repeat"};
          return (
            <div>
              <div id="style-switcher">
                <i className="icon-arrow-left icon-white"></i>
                <span>Style:</span>
                <a href="#grey" style={style}></a>
                <a href="#light-blue" style={style1}></a>
	              <a href="#blue" style={style2}></a>
			          <a href="#red" style={style3}></a>
                <a href="#red-green" style={style4}></a>
              </div>

              <div id="content">
                <div id="content-header">
                  <h1>订单商品详情</h1>
                  <div className="btn-group">
                    <a className="btn btn-large tip-bottom" title="Manage Files"><i className="icon-file"></i></a>
                    <a className="btn btn-large tip-bottom" title="Manage Users"><i className="icon-user"></i></a>
                    <a className="btn btn-large tip-bottom" title="Manage Comments"><i className="icon-comment"></i><span className="label label-important">5</span></a>
                    <a className="btn btn-large tip-bottom" title="Manage Orders"><i className="icon-shopping-cart"></i></a>
                  </div>
                </div>
                <div id="breadcrumb">
                  <a href="#" title="Go to Home" className="tip-bottom"><i className="icon-home"></i> 首页</a>
                </div>
                <div className="container-fluid">
                  <ImgWrap/>
                </div>

              </div>
            </div>
          );
      }
    };
    // 图片
    class ImgWrapClass extends React.Component {
      constructor(props) {
          super(props);
      }
      componentDidMount() {
          store.dispatch({ type: 'PRODUCT_DETAIL'});
      }
      render() {
          return (
            <div className="row-fluid">
                <div className="span12">
                    <div className="widget-box">
                        <div className="widget-title">
                            <span className="icon">
                                <i className="icon-picture"></i>
                            </span>
                            <h5>订单商品详情</h5>
                        </div>
                        <div className="widget-content">
                            <div className="invoice-content">
                                <div className="invoice-head">
                                    <div className="invoice-meta">
                                    <span className="invoice-number">日期 ：{this.props.product.update_at_text} </span>
                                    </div>
                                    <h5>{this.props.product.product_name}</h5>
                                    <div className="invoice-to">
                                        <ul>
                                            <li>
                                                <span><strong>详情：</strong></span>
                                                <span></span>
                                                <span>生产日期：{this.props.product.time_to_market}</span>
                                                <span>颜色：{this.props.product.color}</span>
                                                <span>品牌：{this.props.product.product_brand}</span>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="invoice-from">
                                        <ul>
                                            <li>
                                                <span><strong>价格：</strong></span>
                                                <span>市场价：{this.props.product.product_marketing_price} 元</span>
                                                <span>实际售价：{this.props.product.product_sale_price} 元</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          );
      }
    };

const ImgWrap = connect(mapStateToProps)(ImgWrapClass);
// 返回到页面
ReactDOM.render(
    <Provider store={store}>
    <Wrap/>
    </Provider>,
    document.getElementById("order_product_detail")
);
