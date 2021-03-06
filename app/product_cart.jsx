var React = require('react');
var ReactDOM = require('react-dom');
import { Provider, connect } from 'react-redux'
import { createStore } from 'redux'

var cart_id = "";

function product(state, action) {
  switch (action.type) {
  case 'PRODUCT_CART':
    {
      $.ajax({
         url: "/find_person_cart",
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
    return {items:data.rows,products:data.products,total_data:data.total_data, number:state.number};
  }
  case 'NUMBER_PLUS':
  {
    var number = state.number+action.addValue;
    if (number < 0) {
      number = 0;
    }
    return {items:state.items,products:state.products,total_data:state.total_data,number:number};
  }
  case 'NUMBER_CHANGE':
  {
    var number = action.value;
    return {items:state.items,products:state.products,total_data:state.total_data,number:number};
  }
  case 'NUMBER_STAR':
  {
    var number = action.Value;
    return {items:state.items,products:state.products,total_data:state.total_data,number:number};
  }
  case 'DELECT_PRODUCT':
  {
    var cart_id = action.cart_id
    $.ajax({
       url: "/delete_shopping_carts",
       dataType: 'json',
       type: 'POST',
       data:{'id':cart_id},
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
  case 'UPDATA_NUMBER':
  {
    var cart_id = action.cart_id;
    var number = state.number;
    $.ajax({
       url: "/update_cart_number",
       dataType: 'json',
       type: 'POST',
       data:{'id':cart_id,'num':number},
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
  case 'SAVE_PRODUCT':
  {
    var products = state.items;
    var shopping_carts = [];
    var product = {};
    var total_data = state.total_data;

    for (var i = 0; i < products.length; i++) {
        product = {'id':products[i].id,'product_id':products[i].product_id,'total_items':products[i].total_items,
                    'per_price':products[i].per_price,'total_prices':products[i].total_prices,
                    'cart_code':products[i].cart_code,'is_selected':products[i].is_selected};
        shopping_carts.push(product);
    }
    var total_data = {'total_prices':total_data.total_prices,'total_items':total_data.total_items,total_weight:total_data.total_weight};
    $.ajax({
       url: "/save_online_orders",
       dataType: 'json',
       type: 'POST',
       data:{'shopping_carts':JSON.stringify(shopping_carts),'total_data':JSON.stringify(total_data)},
       success: function(data) {

         if (data.success) {
             if ($('#loadingToast').css('display') != 'none') return;

             $('#loadingToast').fadeIn(100);
             setTimeout(function () {
                 $('#loadingToast').fadeOut(100);
                 location.href="product_cart";
             }, 500);
             location.href = 'now_order?order_id='+data.order_id;
         }else {
           alert('提交失败');
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

let store = createStore(product,{items:[],products:{},total_data:{}, number:1});

const mapStateToProps = (state) => {
    return {
        items: state.items,
        products: state.products,
        number: state.number,
        total_data:state.total_data,

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
        var style = {display:'none'};
      return (
        <div className="project_list_wrap">
          <Projectlist/>
          <ProjectButton/>
          <Top/>
          <Home/>
          <div id="loadingToast" style={style}>
              <div className="weui-mask_transparent"></div>
              <div className="weui-toast">
                  <i className="weui-loading weui-icon_toast"></i>
                  <p className="weui-toast__content">正在提交</p>
              </div>
          </div>
        </div>
      );
    }
};

class ProjectlistClass extends React.Component {
    constructor(props) {
      super(props);
      this.handleMinus = this.handleMinus.bind(this);
      this.handlePlus = this.handlePlus.bind(this);
      this.handleSure = this.handleSure.bind(this);
      this.handleBack = this.handleBack.bind(this);
      this.handleNumber = this.handleNumber.bind(this);
      this.handleDelect = this.handleDelect.bind(this);
      this.handleHide = this.handleHide.bind(this);
      this.changeNumber = this.changeNumber.bind(this);
      this.handleDelectYes = this.handleDelectYes.bind(this);
      this.handleGo = this.handleGo.bind(this);
      this.handleReturn = this.handleReturn.bind(this);
      this.state={number:0};
    }
    componentDidMount() {
      store.dispatch({ type: 'PRODUCT_CART'});

      $('.background').show();
      $('.project_money').show();
      $('.project_money').addClass('animation');
    }
    handleNumber(id,product_id){
      var num = $('#number_'+product_id).html();
      store.dispatch({ type: 'NUMBER_STAR',Value:parseInt(num)});
      cart_id = id;
      $('.background').show();
      $('.projecrt_number').show();
    }
    handleMinus(e){
      store.dispatch({ type: 'NUMBER_PLUS',addValue:-1});
    }
    handlePlus(e){
      store.dispatch({ type: 'NUMBER_PLUS',addValue:1});
    }
    changeNumber() {
      store.dispatch({ type: 'NUMBER_CHANGE',value:$('#number').val()});
    }
    handleSure(e){
      store.dispatch({ type: 'UPDATA_NUMBER',cart_id:cart_id});
      $('.background').hide();
      $('.projecrt_number').hide();

    }
    handleBack(e){
      $('.background').hide();
      $('.projecrt_number').hide();
      $('.delect_order').hide();
      $('.project_money').hide();
      $('.submit_order').hide();
    }
    handleHide(e){
      $('.background').hide();
      $('.delect_order').hide();
    }
    handleDelect(id){
      $('.delect_order').show();
      $('.background').show();
      cart_id = id;
    }
    handleDelectYes(e){
      store.dispatch({ type: 'DELECT_PRODUCT',cart_id:cart_id});
      $('.background').hide();
      $('.delect_order').hide();
    }
    handleGo(e){
      store.dispatch({ type: 'SAVE_PRODUCT'});
      $('.background').hide();
      $('.submit_order').hide();
    }
    handleReturn(e){
     $('.background').hide();
     $('.submit_order').hide();
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
                    <div className="weui-cell__ft position_absolute"><i className="fa fa-pencil" onClick={this.handleNumber.bind(this,item.id,item.product_id)}></i></div>
                    <div className="weui-cell__ft position_absolute1"><i className="fa fa-trash-o" onClick={this.handleDelect.bind(this,item.id)}></i></div>
                    <div className="weui-cell__ft position_absolute2"><span id={'number_'+item.product_id}>{item.total_items}</span> 件</div>
                </div>
              </div>

            </li>

            ))
          }
          <div className="background" onClick={this.handleBack}></div>
          <div className="projecrt_number">
            <div className="projecrt_number_in">
              <p onClick={this.handleMinus}><i className="fa fa-minus"></i></p>
              <p><span className="input_out"><input type="number" placeholder="1" id="number" value={this.props.number} onChange={this.changeNumber}/></span></p>
              <p onClick={this.handlePlus}><i className="fa fa-plus"></i></p>
              <button className="sure" onClick={this.handleSure}>确定</button>
            </div>
          </div>

          <div className="delect_order">
            <p className="yes_or_no">是否确认删除该商品？</p>
            <p className="delect_order_button"><span className="no"  onClick={this.handleDelectYes}>删除</span><span className="yes" onClick={this.handleHide}>不删除</span></p>
          </div>

          <div className="project_money">
            <p>统计</p>
            <p>共计 ： {total_data.total_prices} 元</p>
          </div>

          <div className="submit_order">
            <p className="submit_order_title">确认提交订单？</p>
            <p className="submit_order_hand"><span onClick={this.handleReturn}><i className="fa fa-arrow-left"></i></span><span onClick={this.handleGo}>确定</span></p>
          </div>
        </ul>
      );
    }
};


class ProjectButtonClass extends React.Component {
    constructor(props) {
      super(props);
      this.handleSave=this.handleSave.bind(this);
    }
    handleSave(e) {
        $('.background').show();
        $('.submit_order').show();
        $('.submit_order').addClass('animation');
    }
    render() {
        var total_data = this.props.total_data;
        var items = "";
        if (total_data) {
            items = total_data.total_items;
        }
      return (
        <div className="project_list_button">
          <p onClick={this.handleSave}>去提交(共{items}件)</p>
        </div>
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
const ProjectButton = connect(mapStateToProps)(ProjectButtonClass);
ReactDOM.render(
  <Provider store={store}>
  <IoIo/>
  </Provider>,
  document.getElementById("product_cart")
);
