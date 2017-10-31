var React = require('react');

class Nav extends React.Component {
  constructor(props) {
      super(props);
      // 初始化一个空对象
      this.state = {items: []};
  }
  componentDidMount() {
  var rows= [{name: "首页",code: "01", href:"/", icon_class: "icon-home",child: [{name: "首页",href: "index",icon_class: "icon-th"}]},
            {name: "用户",code: "02",icon_class: "icon-home",child: [{name: "用户列表",href:"admin_user_list",icon_class: "icon-th"}]},
            {name: "商品",code: "03", icon_class: "icon-home",child: [{name: "商品列表",href:"admin_product_list",icon_class: "icon-th"}]},
            {name: "历史订单",code: "05", icon_class: "icon-home",child: [{name: "历史订单列表",href: "admin_order_list",icon_class: "icon-th"}]},
            {name: "在线订单",code: "08", icon_class: "icon-home",child: [{name: "在线订单列表", href:"admin_product_online_list",icon_class: "icon-th"}]},
            {name: "添加",code: "09", icon_class: "icon-home"
            ,child: [{name: "添加商品",href: "admin_add_product",icon_class: "icon-th"}
                    ,{name: "添加客户",href: "admin_add_custom",icon_class: "icon-th"}
                    ,{name: "添加商家",href: "admin_add_business",icon_class: "icon-th"}]
            },
            {name: "商品分类",code: "12",icon_class: "icon-home",child: [{name: "商品分类列表",href: "admin_product_sort_list",icon_class: "icon-th"}]},
            {name: "商家",code: "13", icon_class: "icon-home",child: [{name: "商家列表",href: "admin_business_list",icon_class: "icon-th"}]},
            {name: "门店",code: "15", icon_class: "icon-home",child: [{name: "门店列表",href: "admin_store_list",icon_class: "icon-th"}]},
            {name: "用户编辑",code: "17", icon_class: "icon-home",child: [{name: "用户编辑",href: "admin_user_edit",icon_class: "icon-th"}]},
            {name: "统计",code: "18", icon_class: "icon-home"
            ,child: [{name: "当前批次订货统计",href: "admin_count",icon_class: "icon-th"}
                    ,{name: "产品分类订货统计",href: "admin_count_sort",icon_class: "icon-th"}
                    ,{name: "门店订货统计",href: "admin_count_store",icon_class: "icon-th"}]
            },
          ];
          this.setState({items:rows});

  }
  componentDidUpdate(){
      unicorn();
  }


  render() {
    var nav = [];
    this.state.items.map(function(item,index) {
      var c = "submenu";
      if (item.code == selected) {
        c = "submenu active open";
      }
      nav.push(<li className={c} key={index}>
        <a href="#"><i className={"icon " + item.icon_class}></i> <span>{item.name}</span></a>
        <ul>
          {item.child.map((item,index) => (
            <li key={index}><a href={item.href}>{item.name}</a></li>
          ))
        }
        </ul>
      </li>);
    });

      return (
        <div>
          <div id="sidebar">
            <ul>
              {nav}
            </ul>

          </div>

        </div>
      );
  }
};

module.exports = Nav;
