var React = require('react');
var ReactDOM = require('react-dom');


class IoIo extends React.Component {
    constructor(props) {
      super(props);
      this.handleClick=this.handleClick.bind(this);
    }
    componentDidMount() {
      adminLogin();
    }
    handleClick(e){
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
           data:{"username":user_name,"password":password},
           success: function(data) {
             if (data.success) {
                  location.href  = "admin_product_list";
             }else {
                 alert(data.message);
             }

           }.bind(this),
           error: function(xhr, status, err) {
           }.bind(this)
       });
    }
    render() {
      return (
        <div className="loding_wrap">
          <div id="logo">
              <img src="img/logo.png" alt="" />
          </div>
          <div id="loginbox">
              <div id="loginform" className="form-vertical">
                  <p>请输入用户名和密码</p>
                  <div className="control-group">
                      <div className="controls">
                          <div className="input-prepend">
                              <span className="add-on"><i className="icon-user"></i></span>
                              <input type="text" placeholder="用户名" id="user_name" />
                          </div>
                      </div>
                  </div>
                  <div className="control-group">
                      <div className="controls">
                          <div className="input-prepend">
                              <span className="add-on"><i className="icon-lock"></i></span>
                              <input type="password" placeholder="密码" id="password" />
                          </div>
                      </div>
                  </div>
                  <div className="form-actions">
                      <span className="pull-left"><a href="#" className="flip-link" id="to-recover">忘记密码?</a></span>
                      <span className="pull-right" onClick={this.handleClick}><input type="submit" className="btn btn-inverse" value="登录" /></span>
                  </div>
              </div>
              <div id="recoverform" action="#" className="form-vertical">
                  <p>输入注册手机号</p>
                  <div className="control-group">
                      <div className="controls">
                          <div className="input-prepend">
                              <span className="add-on"><i className="icon-envelope"></i></span>
                              <input type="text" placeholder="手机号" />
                          </div>
                      </div>
                  </div>
                  <div className="form-actions">
                      <span className="pull-left"><a href="#" className="flip-link" id="to-login">&lt; 返回登陆</a></span>
                      <span className="pull-right"><input type="submit" className="btn btn-inverse" value="找回" /></span>
                  </div>
              </div>
          </div>
        </div>
      );
    }
};


ReactDOM.render(
  <IoIo/>,
  document.getElementById("admin_login")
);
