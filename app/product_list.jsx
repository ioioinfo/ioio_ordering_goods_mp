var React = require('react');
var ReactDOM = require('react-dom');

import { Provider, connect } from 'react-redux'
import { createStore } from 'redux'
var index = "";
var product_id = "";
var product_sale_price  = "";
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
    return {project_list:action.data ,q:action.q};
  }


  default:
    return state
  }
}

let store = createStore(product,{project_list:[], q:""});

const mapStateToProps = (state) => {
    return {
        project_list: state.project_list,
        q: state.q,
    }
}

class IoIo extends React.Component {
    render() {
      var style = {display:'none'};
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
    }
    componentDidMount() {
      store.dispatch({ type: 'PRODUCT_LIST',q:q});
    }

    render() {
      var style = {marginRight:'5px' ,display:'block'};
      return (
        <ul className="project_list_ul">
          {this.props.project_list.map((item,index) => (
            <li key={index}>
              <div className="weui-cells">
                <div className="weui-cell font_style position_relative">
                    <div className="weui-cell__hd project_list_img_wrap"><a href={"product_show?product_id="+item.id}><img src={item.img.location} alt="" style={style}/></a></div>
                    <div className="weui-cell__bd product_name">
                        <p className="product_name_infor">{item.product_name}</p>
                        <p className="product_price"><span>￥</span>{item.product_sale_price}</p>
                    </div>
                </div>
              </div>
            </li>

            ))
          }
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
    render() {
      return (
        <div className="project_list_button">
          <p><a href="product_cart">购物车</a></p>
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
