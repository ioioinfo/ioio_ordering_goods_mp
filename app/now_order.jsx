var React = require('react');
var ReactDOM = require('react-dom');
import { Provider, connect } from 'react-redux'
import { createStore } from 'redux'


function product(state, action) {
  switch (action.type) {
  case 'PRODUCT_DETAIL':
    {
      $.ajax({
         url: "/search_ol_orders_infos?order_ids="+order_ids,
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
    return {items:data.rows[0].details,products:data.products};
  }

  default:
    return state
  }
}

let store = createStore(product,{items:[],products:{}});

const mapStateToProps = (state) => {
    return {
        items: state.items,
        products: state.products,

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

class ProjectlistClass extends React.Component {
    constructor(props) {
      super(props);
    }
    componentDidMount() {
        store.dispatch({ type: 'PRODUCT_DETAIL'});
    }


    render() {
      var style = {marginRight:'5px' ,display:'block'};
      var products = this.props.products;
      var total_data = this.props.total_data;
      return (
          <ul className="project_list_ul">
            {this.props.items.map((item,index) => (
              <li key={index}>
                <div className="weui-cells">
                  <div className="weui-cell font_style position_relative">
                      <div className="weui-cell__hd project_list_img_wrap"><img src={products[item.product_id].img.location} alt="" style={style}/></div>
                      <div className="weui-cell__bd product_name">
                          <p className="product_name_infor">{products[item.product_id].product_name}</p>
                          <p className="product_price"><span>￥</span>{products[item.product_id].product_sale_price}</p>
                      </div>
                      <div className="weui-cell__ft position_absolute2"><span id={'number_'+item.product_id}>{item.number}</span> 件</div>
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
const Projectlist = connect(mapStateToProps)(ProjectlistClass);
ReactDOM.render(
    <Provider store={store}>
    <IoIo/>
    </Provider>,
  document.getElementById("now_order")
);
