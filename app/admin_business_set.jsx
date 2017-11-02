var React = require('react');
var ReactDOM = require('react-dom');
var Nav = require('Nav');
var s=[];
var seller_id = "";

import { Provider, connect } from 'react-redux'
import { createStore } from 'redux'

function product(state, action) {
  switch (action.type) {
  case 'CUSTOM_LIST':
    {
      $.ajax({
         url: "/get_sellers_list",
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

      $.ajax({
         url: "/get_level_one",
         dataType: 'json',
         type: 'GET',
         success: function(data) {
           if (data.success) {
             store.dispatch({ type: 'GET_DATA1', data1: data});
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
    return {custom_list:data.rows,product_sorts:state.product_sorts};
  }
  case 'GET_DATA1':
  {
    var data1 = action.data1;
    return {custom_list:state.custom_list,product_sorts:data1.rows};
  }
  case 'SET_KEEP':
      var sellers_discount = {};
      var id = s[0];
      var name = s[1];
      var discount = $("#discount").val();
      sellers_discount = {"seller_id":seller_id,"sort_id":id,"sort_name":name,"discount":discount};
    {
      $.ajax({
         url: "/add_seller_discount",
         dataType: 'json',
         type: 'POST',
         data:{"sellers_discount":JSON.stringify(sellers_discount)},
         success: function(data) {
           if (data.success) {
               alert("保存成功");
           }else {
           }
         }.bind(this),
         error: function(xhr, status, err) {
         }.bind(this)
      });

      return state;
    }

  default:
    return state
  }
}

let store = createStore(product,{custom_list:[],product_sorts:[]});

const mapStateToProps = (state) => {
    return {
        custom_list: state.custom_list,
        product_sorts: state.product_sorts,
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
                  <h1>商家价格设置</h1>
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
                  <AddWrap/>
                </div>

              </div>
            </div>
          );
      }
    };
    // add
    class AddWrapClass extends React.Component {
        componentDidMount() {
            store.dispatch({ type: 'CUSTOM_LIST'});
        }
        handlerClick(e){
            var val = e.target.value;
            s = val.split("_");

        }
        handlerClick1(e){
            store.dispatch({ type: 'SET_KEEP'});
        }
        handlerClick2(e){
            seller_id = e.target.value;
        }
        render() {
            var custom_list = [];
            if (this.props.custom_list.length>0) {
                custom_list = this.props.custom_list;
            }

            var product_sorts = [];
            if (this.props.product_sorts.length>0) {
                product_sorts = this.props.product_sorts;
            }
          return (
            <div className="row-fluid">
                <div className="span12">
                    <div className="">
                        商家：
                        <select onClick={this.handlerClick2}>
                            <option value="下拉菜单选择商家">下拉菜单选择商家</option>
                            {custom_list.map((item,index) => (
                                <option key={index} value={item.org_merchant_id}>{item.org_merchant_name}</option>
                            ))}

                        </select>
                    </div>
                    <br/>
                    <div className="">
                        分类：
                        <select onClick={this.handlerClick}>
                            <option value="下拉菜单选择商品分类">下拉菜单选择商品分类</option>
                            {product_sorts.map((item,index) => (
                                <option key={item.id} value={item.id + "_" + item.sort_name}>{item.sort_name}</option>
                            ))}
                        </select>
                    </div>
                    <br/>
                    <div className="">
                        折扣：
                        <input type="text" placeholder="请输入折扣例如(0.5)即打5折" id="discount"/>
                    </div>
                    <div>
                        <button onClick={this.handlerClick1}>保存</button>
                    </div>
                </div>
            </div>
          );
      }
    };
// 返回到页面
const AddWrap = connect(mapStateToProps)(AddWrapClass);
ReactDOM.render(
    <Provider store={store}>
    <Wrap/>
    </Provider>,
    document.getElementById("admin_business_set")
);
