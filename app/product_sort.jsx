var React = require('react');
var ReactDOM = require('react-dom');
import { Provider, connect } from 'react-redux'
import { createStore } from 'redux'

function product(state, action) {
  switch (action.type) {
        case 'PRODUCT_SORT':
        {
          $.ajax({
             url: "/search_sorts",
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
        var navs = [];
        for (var i = 0; i < data.rows.length; i++) {
            var row = data.rows[i];
            if (row.parent=='0') {
                row.childs = [];
                navs.push(row);

                for (var j = 0; j < data.rows.length; j++) {
                    var row1 = data.rows[j]
                    var img = "images/img2.jpg";
                    if (!row1.img_location) {
                        row1.img_location = img;
                    }
                    if (row1.parent==row.id ) {
                        row.childs.push(row1);
                    }
                }
            }
        }
        return {navs:navs};
      }
      default:
        return state
  }
}

let store = createStore(product,{navs:[]});

const mapStateToProps = (state) => {
    return {
        navs: state.navs
    }
}

class IoIo extends React.Component {
    constructor(props) {
      super(props);
    }
    componentDidMount() {
    }
    render() {
      return (
        <div className="project_list_wrap">
          <Projectsearch/>
          <ProjectBottom/>
        </div>
      );
    }
};

class Projectsearch extends React.Component {
    constructor(props) {
      super(props);
    }
    componentDidMount() {
    }
    render() {
      return (
        <div className="page__bd project_list_search">
            <div className="weui-search-bar" id="searchBar">
                <form className="weui-search-bar__form">
                    <div className="weui-search-bar__box">
                        <i className="weui-icon-search"></i>
                        <input type="search" className="weui-search-bar__input" id="searchInput" placeholder="搜索" required=""/>
                    </div>
                </form>
                <a href="javascript:" className="weui-search-bar__cancel-btn" id="searchCancel">取消</a>
            </div>
        </div>
      );
    }
};

class ProjectBottom extends React.Component {
    constructor(props) {
      super(props);
    }
    componentDidMount() {
    }
    render() {
      return (
        <div className="project_sort_bottom">
          <ProjectsortNav/>
          <ProjectsortInfor/>
        </div>
      );
    }
};

class ProjectsortNavClass extends React.Component {
    constructor(props) {
      super(props);
      this.handleClick=this.handleClick.bind(this);
    }
    componentDidMount() {
        store.dispatch({ type: 'PRODUCT_SORT'});

    }
    componentDidUpdate(){
        $('.project_sort_nav_infor_0').attr('id','nav_style');
    }
    handleClick(id){
      $('.project_sort_infor ul').hide();
      $('.project_sort_nav li').removeAttr('id');
      $('#project_sort_infor_ul_' + id).show();
      $('.project_sort_nav_infor_' + id).attr('id','nav_style');
    }

    render() {
      return (
        <ul className="project_sort_nav">
            {this.props.navs.map((item,index) => (
                <li key={index} className={"project_sort_nav_infor project_sort_nav_infor_"+index} onClick={this.handleClick.bind(this,index)}>{item.sort_name}</li>
            ))
          }
        </ul>
      );
    }
};

class ProjectsortInforClass extends React.Component {
    constructor(props) {
      super(props);
    }
    componentDidMount() {
      $('.project_sort_infor ul').hide();
      $('.project_sort_infor ul:nth-child(1)').show();
    }
    render() {
      return (
        <div className="project_sort_infor">
            {this.props.navs.map((item,index) => (
                <ul key={index} className="project_sort_infor_ul" id={"project_sort_infor_ul_"+index}>
                    {item.childs.map((item,index) => (
                        <li key={index} className="project_sort_infor_li">
                          <p className="project_sort_infor_li_img"><img src={item.img_location}/></p>
                          <p className="project_sort_infor_li_name">{item.sort_name}</p>
                        </li>
                    ))
                  }
                </ul>
            ))
          }

        </div>
      );
    }
};

const ProjectsortNav = connect(mapStateToProps)(ProjectsortNavClass);
const ProjectsortInfor = connect(mapStateToProps)(ProjectsortInforClass);

ReactDOM.render(
    <Provider store={store}>
    <IoIo/>
    </Provider>,
  document.getElementById("product_sort")
);
