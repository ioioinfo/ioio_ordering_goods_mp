var React = require('react');
var ReactDOM = require('react-dom');
var Lunbo = require('newflash_v1.1');

// 框架
class Wrap extends React.Component {
    render() {
        return (
            <div className="wrap">
                <div className="weui-tabbar">
                    <a href="index" className="weui-tabbar__item weui-bar__item_on">
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
                    <a href="person_center" className="weui-tabbar__item">
                        <span className="weui-tabbar__icon"><i className="fa fa-user"></i></span>
                        <p className="weui-tabbar__label">我</p>
                    </a>
                </div>
            </div>
        );
    }
};




// 返回到页面
ReactDOM.render(
    <Wrap/>,
    document.getElementById("index")
);
