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
         url: "/mendian_detail?store_id="+store_id,
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
    return {view:data.row,picture:data.row.pictures};
  }

  default:
    return state
  }
}

let store = createStore(product,{view:{},picture:[]});

const mapStateToProps = (state) => {
    return {
        view: state.view,
        picture: state.picture,
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
                  <h1>门店详情</h1>
                  <div className="btn-group">
                    <a className="btn btn-large tip-bottom" title="Manage Files"><i className="icon-file"></i></a>
                    <a className="btn btn-large tip-bottom" title="Manage Users"><i className="icon-user"></i></a>
                    <a className="btn btn-large tip-bottom" title="Manage Comments"><i className="icon-comment"></i><span className="label label-important">5</span></a>
                    <a className="btn btn-large tip-bottom" title="Manage Orders"><i className="icon-shopping-cart"></i></a>
                  </div>
                </div>
                <div id="breadcrumb">
                  <a href="#" title="Go to Home" className="tip-bottom"><i className="icon-tint"></i> 首页</a>
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
          var province = "";
          var detail_address = "";
          var img = "images/no.jpg";
          if (this.props.picture.length>0) {
              img = "http://shop.buy42.com/images/"+this.props.picture[0].location;
          }
          if (this.props.view.points) {
              province = this.props.view.points[0].province+this.props.view.points[0].city+this.props.view.points[0].district;
              detail_address = this.props.view.points[0].detail_address;
          }
          return (
            <div className="row-fluid">
                <div className="span12">
                    <div className="widget-box">
                        <div className="widget-title">
                            <span className="icon">
                                <i className="icon-picture"></i>
                            </span>
                            <h5>门店详情</h5>
                        </div>
                        <div className="widget-content">
                            <div className="invoice-content">
                                <div className="invoice-head">
                                    <div className="invoice-meta">
                                    <span className="invoice-number">名称 ：{this.props.view.org_store_name} </span>
                                    </div>
                                    <div className="invoice-to">
                                        <ul>
                                            <li>
                                                <span><strong>详情：</strong></span>
                                                <span>门店简称：{this.props.view.abbr}</span>
                                                <span>开店日期：{this.props.view.open_date_text}</span>
                                            </li>
                                            <br/>
                                            <li>
                                                <span><strong>地址：</strong></span>
                                                <span>省市区：{province}</span>
                                                <span>详细地址：{detail_address}</span>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="invoice-from">
                                        <ul>
                                            <li>
                                                <span><strong>门店图片：</strong></span>
                                                <img src={img}/>
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
    document.getElementById("admin_store_view")
);
