var React = require('react');
var ReactDOM = require('react-dom');


class IoIo extends React.Component {
    constructor(props) {
      super(props);
      this.state={person_wx:{}};
    }
    componentDidMount() {
    $.ajax({
       url: "/member_info",
       dataType: 'json',
       type: 'GET',
       success: function(data) {
         if (data.success) {
             this.setState({person_wx:data.person_wx});
         }else {

         }

       }.bind(this),
       error: function(xhr, status, err) {
       }.bind(this)
   });

    }

    render() {
        var img = "images/head.jpeg";
        if (this.state.person_wx) {
            img = this.state.person_wx.headimgurl;
        }
      return (
        <div className="person_center">
          <div className="person_center_head">
            <span className="person_center_head_img"><img src={img}/></span>
            <p className="person_center_head_name">{this.state.person_wx.nickname}</p>
          </div>

          <PersonCenterMiddle/>
        </div>
      );
    }
};


class PersonCenterMiddle extends React.Component {
    constructor(props) {
      super(props);
      // 初始化一个空对象
    }
    componentDidMount() {

    }

    render() {
      var style = {color:'#fff',marginRight:'5px',display:'block'};
      return (
        <div className="weui-cells">
            <a className="weui-cell weui-cell_access" href="order_list">
                <div className="weui-cell__hd icon_wrap_style"><span style={style} className="icon_style1"><i className="fa fa-align-justify"></i></span></div>
                <div className="weui-cell__bd">
                    <p>我的订单</p>
                </div>
                <div className="weui-cell__ft">1</div>
            </a>
            <a className="weui-cell weui-cell_access" href="mendian_list">
                <div className="weui-cell__hd icon_wrap_style"><span style={style} className="icon_style3"><i className="fa fa-building-o"></i></span></div>
                <div className="weui-cell__bd">
                    <p>门店列表</p>
                </div>
                <div className="weui-cell__ft"></div>
            </a>

            <a className="weui-cell weui-cell_access" href="product_sort">
                <div className="weui-cell__hd icon_wrap_style"><span style={style} className="icon_style4"><i className="fa fa-file"></i></span></div>
                <div className="weui-cell__bd">
                    <p>商品分类</p>
                </div>
                <div className="weui-cell__ft"></div>
            </a>
        </div>

      );
    }
};


ReactDOM.render(
  <IoIo/>,
  document.getElementById("person_center")
);
