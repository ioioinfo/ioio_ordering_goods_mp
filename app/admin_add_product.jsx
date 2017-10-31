var React = require('react');
var ReactDOM = require('react-dom');
var Nav = require('Nav');

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
                        <li className="btn btn-inverse">
                            <a title="" href="#">
                                <i className="icon icon-cog"></i>
                                <span className="text">Settings</span>
                            </a>
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
                        <h1>添加商品</h1>
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
    class ImgWrap extends React.Component {
      constructor(props) {
          super(props);
      }
      componentDidMount() {

      }
      render() {
          return (
            <div className="row-fluid">
                <div className="span12">
                    <div className="widget-box">
                        <div className="widget-title">
                            <span className="icon">
                                <i className="icon-th"></i>
                            </span>
                            <h5>添加商品</h5>
                        </div>
                        <div className="widget-content nopadding">
                            <div className="form-horizontal" method="post" action="#" name="basic_validate" id="basic_validate">
                                <div className="control-group">
                                    <label className="control-label">商品名称</label>
                                    <div className="controls">
                                    <input type="text" name="required" id="required"/>
                                    </div>
                                </div>
                                <div className="control-group">
                                    <label className="control-label">产地</label>
                                    <div className="controls">
                                        <input type="text" name="email" id="email"/>
                                    </div>
                                </div>
                                <div className="control-group">
                                    <label className="control-label">价格(元)</label>
                                    <div className="controls">
                                        <input type="password" name="date" id="date"/>
                                    </div>
                                </div>
                                <div className="control-group">
                                    <label className="control-label">品牌</label>
                                    <div className="controls">
                                        <input type="password" name="url" id="url"/>
                                    </div>
                                </div>
                                <div className="control-group">
                                    <label className="control-label">保质期</label>
                                    <div className="controls">
                                        <input type="password" name="url" id="url"/>
                                    </div>
                                </div>
                                <div className="control-group">
                                    <label className="control-label">规格</label>
                                    <div className="controls">
                                        <input type="password" name="url" id="url"/>
                                    </div>
                                </div>
                                <div className="control-group">
                                    <label className="control-label">其他</label>
                                    <div className="controls">
                                        <input type="password" name="url" id="url"/>
                                    </div>
                                </div>
                                <div className="form-actions">
                                    <input type="submit" value="确认" className="btn btn-primary"/>
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
    document.getElementById("admin_add_product")
);
