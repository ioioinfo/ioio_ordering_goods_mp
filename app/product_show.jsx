var React = require('react');
var ReactDOM = require('react-dom');
var Lunbo = require('newflash_v1.1');

import { Provider, connect } from 'react-redux'
import { createStore } from 'redux'

function product(state, action) {
  switch (action.type) {
  case 'PRODUCT_SHOW':
    {
      $.ajax({
         url: "/get_product",
         dataType: 'json',
         type: 'GET',
         data:{'product_id':product_id},
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
    var data = action.data.product;

    var imgs = [];
    for (var i = 0; i < data.pictures.length; i++) {
      imgs.push({"id":i,"img":data.pictures[i].location,"href":"#"});

    }
    return {item:data,number:state.number,imgs:imgs};
  }
  case 'NUMBER_PLUS':
  {
    var number = state.number+action.addValue;
    if (number < 0) {
      number = 0;
    }
    return {item:state.item,number:number,imgs:state.imgs};
  }
  case 'NUMBER_CHANGE':
  {
    var number = action.value;
    return {item:state.item,number:number ,imgs:state.imgs};
  }
  case 'PRODUCT_BUY':
    {

        var number = state.number;
        var product_price = action.product_sale_price;
        var sku_id = action.sku_id;
      $.ajax({
         url: "/add_shopping_cart",
         dataType: 'json',
         type: 'POST',
         data:{"product_num":number,"product_id":product_id,"product_price":product_price,"sku_id":sku_id},
         success: function(data) {
           if(data.success){
               if ($('#loadingToast').css('display') != 'none') return;

               $('#loadingToast').fadeIn(100);
               setTimeout(function () {
                   $('#loadingToast').fadeOut(100);
               }, 500);
           }else {
             alert("添加失败");
           }
         },
         error: function(xhr, status, err) {
         }
      });

      return state;
    }

  default:
    return state
  }
}

let store = createStore(product,{item:{},imgs:[],number:1});

const mapStateToProps = (state) => {
    return {
        item: state.item,
        imgs: state.imgs,
        number: state.number,
    }
}


class IoIo extends React.Component {
    constructor(props) {
      super(props);
      this.handleMinus = this.handleMinus.bind(this);
      this.handlePlus = this.handlePlus.bind(this);
      this.handleSure = this.handleSure.bind(this);
      this.handleBack = this.handleBack.bind(this);
      this.handleBuy = this.handleBuy.bind(this);
      this.changeNumber = this.changeNumber.bind(this);
    }
    componentDidMount() {
      store.dispatch({ type: 'PRODUCT_SHOW'});
      $("#num").html("0");
    }

    handleBuy(e){
      $('.background').show();
      $('.projecrt_number').show();
    }
    handleMinus(e){
      store.dispatch({ type: 'NUMBER_PLUS',addValue:-1});
    }
    handlePlus(e){
      store.dispatch({ type: 'NUMBER_PLUS',addValue:1});
    }
    changeNumber(e) {
      store.dispatch({ type: 'NUMBER_CHANGE',value:$('#number').val()});
    }
    handleSure(product_sale_price,sku_ids){
      store.dispatch({ type: 'PRODUCT_BUY',product_sale_price:product_sale_price,sku_id:sku_ids});
      var num = $("#number").val();
      $("#num").html(num);
      $('.background').hide();
      $('.projecrt_number').hide();
    }
    handleBack(e){
      $('.background').hide();
      $('.projecrt_number').hide();

  }
    render() {
      var lunbo = (<div></div>);

      if (this.props.imgs.length > 0) {
        lunbo = <Lunbo items={this.props.imgs}/>;
      }
      var style = {display:'none'};
      return (
        <div className="project_show_wrap">
          {lunbo}
          <div className="product_infor">
            <div className="product_infor_in">
              <p className="product_name">{this.props.item.product_name}</p>
              <p className="product_price"><span>￥</span> {this.props.item.product_sale_price}</p>
            </div>
          </div>

          <div className="product_remind">
            <p><span>产地：</span>中国香港</p>
            <p><span>保质期：</span>三年</p>
            <p><span>规格：</span>500 g</p>
            <p><span>存储温度：</span>2～6℃</p>
          </div>
          <div className="project_infor_img">
            <img src="images/product_infor.jpg" />
          </div>
          <div className="project_list_button">
            <p onClick={this.handleBuy}>下单(<span id="num"></span>)</p>
            <p><a href="product_cart">去购物车</a></p>
          </div>


          <div className="background" onClick={this.handleBack}></div>
          <div className="projecrt_number">
            <div className="projecrt_number_in">
              <p onClick={this.handleMinus}><i className="fa fa-minus"></i></p>
              <p><span className="input_out"><input type="number" placeholder="1" id="number" value={this.props.number} onChange={this.changeNumber}/></span></p>
              <p onClick={this.handlePlus}><i className="fa fa-plus"></i></p>
              <button className="sure" onClick={this.handleSure.bind(this,this.props.item.product_sale_price,this.props.item.sku_id)}>确定</button>
            </div>
          </div>

          <div id="loadingToast" style={style}>
              <div className="weui-mask_transparent"></div>
              <div className="weui-toast">
                  <i className="weui-loading weui-icon_toast"></i>
                  <p className="weui-toast__content">添加成功</p>
              </div>
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
  document.getElementById("product_show")
);
