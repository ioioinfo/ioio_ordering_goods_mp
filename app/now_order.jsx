var React = require('react');
var ReactDOM = require('react-dom');

import { Provider, connect } from 'react-redux'
import { createStore } from 'redux'

function product(state, action) {
    switch (action.type) {
        case 'PRODUCT_ORDER':
          {
            $.ajax({
               url: "/search_online_by_id",
               dataType: 'json',
               type: 'GET',
               data:{'id':id}
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
          return {product_list:data.product_list};
        }
    }
    default:
      return state
    }
}

let store = createStore(product,{product_list:[]});
const mapStateToProps = (state) => {
    return {
        product_list: state.product_list,

    }
}
class IoIo extends React.Component {
    constructor(props) {
      super(props);
      // 初始化一个空对象
      this.state = {};
    }
    componentDidMount() {
    }
    render() {
      return (
        <div className="project_list_wrap">
          <Projectlist/>
          <Top/>
          <Home/>
        </div>
      );
    }
};

class Projectlist extends React.Component {
    constructor(props) {
      super(props);
    }
    componentDidMount() {
        store.dispatch({ type: 'PRODUCT_ORDER'});
    }


    render() {
      var style = {marginRight:'5px' ,display:'block'};
      return (
        <ul className="project_list_ul">
          {this.props.project_list.map((item,index) => (
            <li key={index}>
              <div className="weui-cells">
                <div className="weui-cell font_style position_relative">
                    <div className="weui-cell__hd project_list_img_wrap"><img src={item.img} alt="" style={style}/></div>
                    <div className="weui-cell__bd product_name">
                        <p className="product_name_infor">{item.name}</p>
                        <p className="product_price"><span>￥</span>{item.price}</p>
                    </div>
                    <div className="weui-cell__ft position_absolute2"><span>11</span> 件</div>
                </div>
              </div>

            </li>

            ))
          }
        </ul>
      );
    }
};


// 返回顶部
class Top extends React.Component {
  constructor(props) {
      super(props);
      this.handleClick=this.handleClick.bind(this);
  }
  // 点击返回顶部
  handleClick(e){
     $('body,html').animate({scrollTop:0},400);
  }
  // 页面发生变化的时候触发
  componentDidMount() {
    $(window).scroll(function(){
      var topHeight=$(window).scrollTop();
      if (topHeight>200){
        //当滚动条的位置处于距顶部1000像素以下时，就是大于1000象数时，跳转出现
        $(".top").fadeIn(250);
      }else{ //否则就消失
        $(".top").fadeOut(250);
      }

    })
  }


  render() {
    var topHeight=$(window).scrollTop();

      return (
        <div className="top" onClick={this.handleClick}><img src="images/scroll-to-top-icon.png" alt="" /></div>
      );
  }
};


class Home extends React.Component {
    constructor(props) {
      super(props);
      // 初始化一个空对象
      this.state = {};
    }
    componentDidMount() {
      $(window).scroll(function(){
        var topHeight=$(window).scrollTop();
        if (topHeight>100){
          //当滚动条的位置处于距顶部1000像素以下时，就是大于1000象数时，跳转出现
          $(".nav_home").fadeIn(250);
        }else{ //否则就消失
          $(".nav_home").fadeOut(250);
        }

      })
    }
    render() {
      return (
        <div className="nav_home"><a href="#"><i className="fa fa-home"></i></a></div>
      );
    }
};

ReactDOM.render(
  <IoIo/>,
  document.getElementById("now_order")
);
