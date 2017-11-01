var React = require('react');
var ReactDOM = require('react-dom');
var Nav = require('Nav');

import { Provider, connect } from 'react-redux'
import { createStore } from 'redux'

function product(state, action) {
  switch (action.type) {
  case 'CUSTOM_EDIT':
    {
      $.ajax({
         url: "/get_store_by_id?id="+id,
         dataType: 'json',
         type: 'GET',
         success: function(data) {
           if (data.success) {
               var org_merchant_code = data.row.org_merchant_code;
               var org_merchant_name = data.row.org_merchant_name;
               var abbr = data.row.abbr;
               var remark = data.row.remark;
               $("#org_merchant_code").val(org_merchant_code);
               $("#org_merchant_name").val(org_merchant_name);
               $("#abbr").val(abbr);
               $("#remark").val(remark);
           }else {
           }
         }.bind(this),
         error: function(xhr, status, err) {
         }.bind(this)
      });

      return state;
    }
    case 'CUSTOM_KEEP':
        var merchant_code = $("#org_merchant_code").val();
        var merchant_name = $("#org_merchant_name").val();
        var abbr = $("#abbr").val();
        var remark = $("#remark").val();
      {
        $.ajax({
           url: "/update_merchant",
           dataType: 'json',
           type: 'POST',
           data:{"id":id,"merchant_code":merchant_code,"merchant_name":merchant_name,"abbr":abbr,"remark":remark},
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

let store = createStore(product);

const mapStateToProps = (state) => {
    return {

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
      constructor(props) {
          super(props);
          // 初始化一个空对象
      }
      componentDidMount() {
      }
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
                  <h1>商家编辑</h1>
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
    class AddWrap extends React.Component {
      componentDidMount() {
          store.dispatch({ type: 'CUSTOM_EDIT'});

      }
      handleClick(e){
          store.dispatch({ type: 'CUSTOM_KEEP'});
      }
      render() {
        var style = {display:'none' };
        var style1 = {width:'1px'};
          return (
            <div className="row-fluid">
                <div className="span12">
                    <div className="widget-box">
                        <div className="widget-title">
                            <span className="icon">
                                <i className="icon-align-justify"></i>
                            </span>
                            <h5>商家编辑</h5>
                        </div>
                        <div className="widget-content nopadding">
                            <div action="#" method="get" className="form-horizontal">
                                <div className="control-group">
                                    <label className="control-label">编号</label>
                                    <div className="controls">
                                        <input type="text" id="org_merchant_code" />
                                    </div>
                                </div>


                                <div className="control-group">
                                    <label className="control-label">名称</label>
                                    <div className="controls">
                                        <input type="text" id="org_merchant_name"  />
                                    </div>
                                </div>

                                <div className="control-group">
                                    <label className="control-label">简写</label>
                                    <div className="controls">
                                        <input type="text" id="abbr"  />
                                    </div>
                                </div>

                                <div className="control-group">
                                    <label className="control-label">备注</label>
                                    <div className="controls">
                                        <input type="text" id="remark"  />
                                    </div>
                                </div>

                                <div className="form-actions">
                                    <button type="submit" className="btn btn-primary" onClick={this.handleClick}>保 存</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          );
      }
    };
// 返回到页面
ReactDOM.render(
    <Wrap/>,
    document.getElementById("admin_business_edit")
);
