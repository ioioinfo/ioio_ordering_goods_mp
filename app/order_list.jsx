var React = require('react');
var ReactDOM = require('react-dom');

import { Provider, connect } from 'react-redux'
import { createStore } from 'redux'

function product(state, action) {
  switch (action.type) {
  case 'PRODUCT_LIST':
    {
      $.ajax({
         url: "/search_online_by_personid",
         dataType: 'json',
         type: 'GET',
         success: function(data) {
           if(data.success){
             store.dispatch({ type: 'GET_DATA', data: data.rows});
           }
         },
         error: function(xhr, status, err) {
         }
      });

      return state;
    }
  case 'GET_DATA':
  {
    var data = action.data;
    return {order_list:data};
  }
  default:
    return state
  }
}

let store = createStore(product,{order_list:[]});

const mapStateToProps = (state) => {
    return {
        order_list: state.order_list,
    }
}

class IoIo extends React.Component {
    constructor(props) {
      super(props);
      // 初始化一个空对象
      this.state = {};
    }
    componentDidMount() {
        store.dispatch({ type: 'PRODUCT_LIST'});
    }
    render() {
      var style = {width:'20px' , marginRight:'5px' , display:'block'};
      var style1 = {textAlign:'center' , fontSize:'12px' , color:'#666' , marginTop:'27px' , marginBottom:'17px'};
      return (
        <div>
          <div className="page__hd">
            <h1 className="page__title">订单</h1>
            <p className="page__desc">列表</p>
          </div>

          <div className="weui-cells">
          {this.props.order_list.map((item,index) => (
            <a key={index} className="weui-cell weui-cell_access" href={'order_detail?order_id='+item.order_id}>
                <div className="weui-cell__bd">
                    <p>{item.created_at_text}</p>
                </div>
                <div className="weui-cell__ft">{item.actual_price} 元</div>
            </a>
           ))
          }
          </div>
          <p style = {style1}>没有更多了 &nbsp;&nbsp;&nbsp;<a href="#">点此返回首页</a></p>
        </div>
      );
    }
};

const IoIoRedux = connect(mapStateToProps)(IoIo);
ReactDOM.render(
    <Provider store={store}>
    <IoIoRedux/>
    </Provider>,
  document.getElementById("order_list")
);
