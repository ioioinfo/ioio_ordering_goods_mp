var React = require('react');
var ReactDOM = require('react-dom');
var Nav = require('Nav');

import { Provider, connect } from 'react-redux'
import { createStore } from 'redux'

function product(state, action) {
  switch (action.type) {
  case 'PRODUCT_IMGS':
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
    return {imgs:data.pictures};
  }

  default:
    return state
  }
}

let store = createStore(product,{imgs:[]});

const mapStateToProps = (state) => {
    return {
        imgs: state.imgs,

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
              <h1>图片查看</h1>
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
  componentDidMount() {
      store.dispatch({ type: 'PRODUCT_IMGS'});
    unicorn();
  }
  render() {
    var style = {position:'relative' , height:'2251px' , width:'520px'};
    var style1 = {position:'absolute' , top:'0px' , left:'0px'};
    var style2 = {overFlow:'auto'};
    var img = (<p>暂无图片</p>);
    if (this.props.imgs) {
        img = (<div className="gallery-masonry masonry overFlowAututo">
            {this.props.imgs.map((item,index) => (
              <div key={index} className="item masonry-brick">
                <a href="#" className="thumbnail">
                  <img src={item.location} alt=""/>
                </a>
                <div className="actions">
                  <a title="" href="#" className="tip-top" data-original-title="Edit">
                    <i className="icon-pencil icon-white"></i>
                  </a>
                  <a title="" href="#" className="tip-top" data-original-title="Remove">
                    <i className="icon-remove icon-white"></i>
                  </a>
                </div>
              </div>
              ))
            }
          </div>);
    }else {
        img = (<div>暂无</div>);
    }
      return (
        <div className="row-fluid">
			<div className="span12">
				<div className="widget-box">
					<div className="widget-title">
						<span className="icon">
							<i className="icon-picture"></i>
						</span>
						<h5>图片列表</h5>
					</div>
					<div className="widget-content">
	                  {img}
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
    document.getElementById("admin_product_img")
);
