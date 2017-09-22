var React = require('react');

class Nav extends React.Component {
  constructor(props) {
      super(props);
      // 初始化一个空对象
      this.state = {items: []};
  }
  componentDidMount() {
  var rows= [{name: "首页",code: "01", href:"/", icon_class: "icon-home",child: [{name: "首页",href: "/",icon_class: "icon-th"}]},
            {name: "用户列表",code: "02", href:"admin_user_list", icon_class: "icon-home",child: [{name: "用户列表",href: "/",icon_class: "icon-th"}]},
            {name: "商品列表",code: "03", href:"admin_product_list", icon_class: "icon-home",child: [{name: "商品列表",href: "/",icon_class: "icon-th"}]},
            {name: "商品图片",code: "04", href:"admin_product_img", icon_class: "icon-home",child: [{name: "商品图片",href: "/",icon_class: "icon-th"}]},
            {name: "订单列表",code: "05", href:"admin_order_list", icon_class: "icon-home",child: [{name: "商品图片",href: "/",icon_class: "icon-th"}]},
            {name: "订单详情",code: "06", href:"admin_order_detail", icon_class: "icon-home",child: [{name: "商品图片",href: "/",icon_class: "icon-th"}]},
            {name: "订单商品详情",code: "07", href:"admin_order_product_detail", icon_class: "icon-home",child: [{name: "商品图片",href: "/",icon_class: "icon-th"}]},
          ];
  this.setState({items:rows});
  unicorn();
  }

  render() {
    var nav = [];
    this.state.items.map(function(item,index) {
      var c = "submenu";
      if (item.code == selected) {
        c = "submenu active";
      }
      nav.push(<li className={c} key={index}>
        <a href={item.href}><i className={"icon " + item.icon_class}></i> <span>{item.name}</span></a>
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