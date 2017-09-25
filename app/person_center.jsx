var React = require('react');
var ReactDOM = require('react-dom');
import { Provider, connect } from 'react-redux'
import { createStore } from 'redux'

function product(state, action) {
  switch (action.type) {
        case 'PERSON_INFOR':
        {
          $.ajax({
             url: "/find_person_info",
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
        return {person:data.row,orders:state.orders};
      }
      case 'GET_DATA1':
      {
        var data = action.data;
        return {person:state.person,orders:data.orders[0]};
      }
      case 'ORDER_NUMBER':
      {
          var status = [1];
        $.ajax({
           url: "/search_online_by_status",
           dataType: 'json',
           type: 'GET',
           data:{"status":JSON.stringify(status)},
           success: function(data) {
             if (data.success) {
               store.dispatch({ type: 'GET_DATA1', data: data});
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

let store = createStore(product,{person:{},orders:{}});

const mapStateToProps = (state) => {
    return {
        person: state.person,
        orders: state.orders
    }
}


class IoIo extends React.Component {
    constructor(props) {
      super(props);
      // 初始化一个空对象
    }
    componentDidMount() {
      var height = $(window).height();
      $('.back_bottom').css('height',0.7*height);
      $('.person_center_top').css('height',0.15*height);
      $('.person_center_order').css('top',0.3*height-60);
      store.dispatch({ type: 'PERSON_INFOR'});
      store.dispatch({ type: 'ORDER_NUMBER'});
    }

    render() {
        var total_number = (<p>0</p>);
        if(this.props.orders){
            total_number = (<p>{this.props.orders.total_number}</p>);
        }
      return (
        <div className="person_center">
          <div className="background"></div>
          <div className="back_bottom"></div>
          <div className="person_center_top">
            <img src="images/biyou.jpg"/>
            <p>{this.props.person.person_code}</p>
          </div>

          <div className="person_center_order">
            <div className="person_center_order_infor person_center_order_left">
              {total_number}
              <p>待收货</p>
            </div>
            <div className="person_center_order_infor person_center_order_right">
              <p>历史订单</p>
            </div>
          </div>
          <div className="weui-tabbar">
              <a href="index" className="weui-tabbar__item">
                  <span className="weui-tabbar__icon"><i className="fa fa-home"></i></span>
                  <p className="weui-tabbar__label">首页</p>
              </a>
              <a href="product_cart" className="weui-tabbar__item">
                  <span className="weui-tabbar__icon"><i className="fa fa-cart-arrow-down"></i></span>
                  <p className="weui-tabbar__label">购物车</p>
              </a>
              <a href="product_sort" className="weui-tabbar__item">
                  <span className="weui-tabbar__icon"><i className="fa fa-bars"></i></span>
                  <p className="weui-tabbar__label">分类</p>
              </a>
              <a href="person_center" className="weui-tabbar__item weui-bar__item_on">
                  <span className="weui-tabbar__icon"><i className="fa fa-user"></i></span>
                  <p className="weui-tabbar__label">我</p>
              </a>
          </div>
        </div>
      );
    }
};
const IoIoRedux = connect(mapStateToProps)(IoIo);
ReactDOM.render(
    <Provider store={store}>
    <IoIoRedux/>
    </Provider>,
    document.getElementById("person_center")
);
