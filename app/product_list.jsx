var React = require('react');
var ReactDOM = require('react-dom');

import { Provider, connect } from 'react-redux'
import { createStore } from 'redux'

function product(state, action) {
  switch (action.type) {
  case 'PRODUCT_LIST':
    {
        var q = action.q;
        if (!q) {
            q = "";
        }
      $.ajax({
         url: "/search_products?sort_id="+sort_id +"&q=" +q,
         dataType: 'json',
         type: 'GET',
         success: function(data) {
           if(data.success){
             store.dispatch({ type: 'GET_DATA', data: data.products});
           }else {
             store.dispatch({ type: 'GET_DATA', data: []});
           }
         },
         error: function(xhr, status, err) {
         }
      });

      return state;
    }
  case 'GET_DATA':
  {
    return {project_list:action.data ,number:state.number ,q:action.q};
  }
  case 'NUMBER_PLUS':
  {
    var number = state.number+action.addValue;
    if (number < 0) {
      number = 0;
    }
    return {project_list:state.project_list,number:number ,q:state.q};
  }

  default:
    return state
  }
}

let store = createStore(product,{project_list:[],number:1 , q:""});

const mapStateToProps = (state) => {
    return {
        project_list: state.project_list,
        number: state.number,
        q: state.q,
    }
}

class IoIo extends React.Component {
    render() {
      return (
        <div className="project_list_wrap">
          <Projectsearch/>
          <Projectlist/>
          <ProjectButton/>
          <Top/>
        </div>
      );
    }
};

class Projectsearch extends React.Component {
    constructor(props) {
      super(props);
      this.handleSearch=this.handleSearch.bind(this);
    }
    componentDidMount() {
        $("#searchInput").val(q);
    }
    handleSearch(e) {
        var q = $('#searchInput').val();
        store.dispatch({ type: 'PRODUCT_LIST' , q:q});
    }
    render() {
      return (
        <div className="page__bd project_list_search">
            <div className="weui-search-bar" id="searchBar">
                <form className="weui-search-bar__form">
                    <div className="weui-search-bar__box">
                        <i className="weui-icon-search"></i>
                        <input type="search" className="weui-search-bar__input" id="searchInput" required=""/>
                    </div>
                </form>
                <a className="weui-search-bar__cancel-btn" id="searchCancel" onClick={this.handleSearch}>搜索</a>
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
      this.changeNumber = this.changeNumber.bind(this);
      this.handleSure = this.handleSure.bind(this);
      this.handleBack = this.handleBack.bind(this);
      this.handleBuy = this.handleBuy.bind(this);
    }
    componentDidMount() {
      store.dispatch({ type: 'PRODUCT_LIST',q:q});
    }
    handleBuy(e){
      $('.background').show();
      $('.projecrt_number').show();
    }
    handleMinus(e){
      store.dispatch({ type: 'NUMBER_PLUS', addValue: -1});
    }
    handlePlus(e){
      store.dispatch({ type: 'NUMBER_PLUS', addValue: 1});
    }

    changeNumber(e) {

    }

    handleSure(e){
      $('.background').hide();
      $('.projecrt_number').hide();
    }
    handleBack(e){
      $('.background').hide();
      $('.projecrt_number').hide();
  }
    render() {
      var style = {marginRight:'5px' ,display:'block'};
      return (
        <ul className="project_list_ul">
          {this.props.project_list.map((item,index) => (
            <li key={index}>
              <div className="weui-cells">
                <div className="weui-cell font_style position_relative">
                    <div className="weui-cell__hd project_list_img_wrap"><img src={item.img.location} alt="" style={style}/></div>
                    <div className="weui-cell__bd product_name">
                        <p className="product_name_infor">{item.product_name}</p>
                        <p className="product_price"><span>￥</span>{item.product_sale_price}</p>
                    </div>
                    <div className="weui-cell__ft position_absolute" onClick={this.handleBuy}><i className="fa fa-shopping-basket"></i></div>
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

        </ul>
      );
    }
};


class ProjectButton extends React.Component {
    constructor(props) {
      super(props);
      // 初始化一个空对象
      this.state = {};
    }
    componentDidMount() {
    }
    render() {
      return (
        <div className="project_list_button">
          <p>购物车</p>
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
      if (topHeight>100){
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

const Projectlist = connect(mapStateToProps)(ProjectlistClass);

ReactDOM.render(
  <Provider store={store}>
  <IoIo/>
  </Provider>,
  document.getElementById("product_list")
);
