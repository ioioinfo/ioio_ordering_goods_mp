/**
 ┌──────────────────────────────────────────────────────────────┐
 │               ___ ___ ___ ___ ___ _  _ ___ ___               │
 │              |_ _/ _ \_ _/ _ \_ _| \| | __/ _ \              │
 │               | | (_) | | (_) | || .` | _| (_) |             │
 │              |___\___/___\___/___|_|\_|_| \___/              │
 │                                                              │
 │                                                              │
 │                       set up in 2015.2                       │
 │                                                              │
 │   committed to the intelligent transformation of the world   │
 │                                                              │
 └──────────────────────────────────────────────────────────────┘
*/

var _ = require('lodash');
var moment = require('moment');
var eventproxy = require('eventproxy');
const sys_option = require('../config/sys_option');

var moduel_prefix = sys_option.product_name + '_main';

exports.register = function(server, options, next) {
    var wx_api = server.plugins.services.wx_api;
    var person = server.plugins.services.person;
    var api = server.plugins.services.clothing_api;

    //页面获取微信id
    var page_get_openid = function(request,cb) {
        var state;
        var openid = "";

        if (request.query.openid) {
            openid = request.query.openid;
            cb(openid);
        } else {
            if (request.state && request.state.cookie) {
                state = request.state.cookie;
                if (state[sys_option.cookie_key]) {
                    openid = state[sys_option.cookie_key];
                }
            }
            if (openid) {
                console.log("cookie openid:" + openid);
                cb(openid);
            }else {
                // cb("owHd9s_erpLPfU4uv0uiGzB1JeOI");
                var code = request.query.code;
                if (!code) {
                    cb(null);
                } else {
                    wx_api.page_get_access_token(platform_id, code, function(err,openid) {
                        console.log("page openid:" + openid);
                        cb(openid);
                    });
                }
            }
        }
    };

    //查询手机号
    var get_mobile = function(request,cb) {
        page_get_openid(request,function(openid) {
            if (!openid) {
                cb(null);
            } else {
                person.get_wx_by_openid(platform_id,openid,function(err,rows) {
                    if (rows && rows.length > 0) {
                        var row = rows[0];

                        //查询手机号
                        person.get_mobile(row.person_id,function(err,rows) {
                            if (rows && rows.length > 0) {
                                cb(rows[0].mobile);
                            } else {
                                cb(null);
                            }
                        });
                    } else {
                        cb(null);
                    }
                });
            }
        });
    };

    server.route([
        //首页
        {
            method: 'GET',
            path: '/index',
            handler: function(request, reply) {
                // page_get_openid(request,function(openid) {
                //     if (!openid) {
                //         return reply("获取用户信息失败");
                //     }
                //     var cookie = request.state.cookie;
                //     if (!cookie) {
                //         cookie = {};
                //     }
                //     cookie[sys_option.cookie_key] = openid;
                //     return reply.view("index").state('cookie', cookie, sys_option.cookie_options);;
                // });

                 return reply.view("index");
            },
        },

        //登录
        {
            method: 'GET',
            path: '/login',
            handler: function(request, reply) {
              return reply.view("login");
            }
        },

        //个人中心
        {
            method: 'GET',
            path: '/person_center',
            handler: function(request, reply) {
              return reply.view("person_center");
            }
        },

        //商品列表
        {
            method: 'GET',
            path: '/product_list',
            handler: function(request, reply) {
              var sort_id = request.query.sort_id;
              var q = request.query.q;
              return reply.view("product_list" , {sort_id:sort_id ,q:q});
            }
        },

        //注册
        {
            method: 'GET',
            path: '/signup',
            handler: function(request, reply) {
              return reply.view("signup");
            }
        },

        //商品分类
        {
            method: 'GET',
            path: '/product_sort',
            handler: function(request, reply) {
              return reply.view("product_sort");
            }
        },

        //购物车
        {
            method: 'GET',
            path: '/product_cart',
            handler: function(request, reply) {
              return reply.view("product_cart");
            }
        },

        //订单确认
        {
            method: 'GET',
            path: '/order_sure',
            handler: function(request, reply) {
              return reply.view("order_sure");
            }
        },

        //历史订单详情
        {
            method: 'GET',
            path: '/order_detail',
            handler: function(request, reply) {
                var order_id = request.query.order_id;
              return reply.view("order_detail",{order_id:order_id});
            }
        },

        //订单列表
        {
            method: 'GET',
            path: '/order_list',
            handler: function(request, reply) {
              return reply.view("order_list");
            }
        },

        //搜索
        {
            method: 'GET',
            path: '/search',
            handler: function(request, reply) {
              return reply.view("search");
            }
        },

        //商品详情
        {
            method: 'GET',
            path: '/product_show',
            handler: function(request, reply) {
                var product_id = request.query.product_id;
                return reply.view("product_show",{product_id:product_id});
            }
        },

        //订单详情
        {
            method: 'GET',
            path: '/now_order',
            handler: function(request, reply) {
                var order_id = request.query.order_id;
                return reply.view("now_order",{order_id:order_id});
            }
        },



        //后台用户列表
        {
            method: 'GET',
            path: '/admin_user_list',
            handler: function(request, reply) {
              return reply.view("admin_user_list");
            }
        },
        //后台用户编辑
        {
            method: 'GET',
            path: '/admin_user_edit',
            handler: function(request, reply) {
              return reply.view("admin_user_edit");
            }
        },


        //后台商品列表
        {
            method: 'GET',
            path: '/admin_product_list',
            handler: function(request, reply) {
              return reply.view("admin_product_list");
            }
        },


        //后台商品图片查看
        {
            method: 'GET',
            path: '/admin_product_img',
            handler: function(request, reply) {
              var product_id = request.query.product_id;
              return reply.view("admin_product_img",{product_id:product_id});
            }
        },

        //后台添加客户
        {
            method: 'GET',
            path: '/admin_add_custom',
            handler: function(request, reply) {
              return reply.view("admin_add_custom");
            }
        },

        //后台登录
        {
            method: 'GET',
            path: '/admin_login',
            handler: function(request, reply) {
              return reply.view("admin_login");
            }
        },

        //订单列表
        {
            method: 'GET',
            path: '/admin_order_list',
            handler: function(request, reply) {
              return reply.view("admin_order_list");
            }
        },


        //订单详情
        {
            method: 'GET',
            path: '/admin_order_detail',
            handler: function(request, reply) {
              var order_id = request.query.order_id;
              return reply.view("admin_order_detail",{order_id:order_id});
            }
        },

        //商品详情
        {
            method: 'GET',
            path: '/admin_order_product_detail',
            handler: function(request, reply) {
                var product_id = request.query.product_id;
              return reply.view("admin_order_product_detail",{product_id:product_id});
            }
        },

        //商品添加
        {
            method: 'GET',
            path: '/admin_add_product',
            handler: function(request, reply) {
              return reply.view("admin_add_product");
            }
        },

        //在线订单列表
        {
            method: 'GET',
            path: '/admin_product_online_list',
            handler: function(request, reply) {
              return reply.view("admin_product_online_list");
            }
        },

        //在线订单商品详情
        {
            method: 'GET',
            path: '/order_product_detail',
            handler: function(request, reply) {
                var product_id = request.query.product_id;
              return reply.view("order_product_detail",{product_id:product_id});
            }
        },

        //在线订单商品分类列表
        {
            method: 'GET',
            path: '/admin_product_sort_list',
            handler: function(request, reply) {
                var product_id = request.query.product_id;
              return reply.view("admin_product_sort_list",{product_id:product_id});
            }
        },

        //在线订单商家列表
        {
            method: 'GET',
            path: '/admin_business_list',
            handler: function(request, reply) {
                var product_id = request.query.product_id;
              return reply.view("admin_business_list",{product_id:product_id});
            }
        },

        //在线订单添加商家
        {
            method: 'GET',
            path: '/admin_add_business',
            handler: function(request, reply) {
                var product_id = request.query.product_id;
              return reply.view("admin_add_business",{product_id:product_id});
            }
        },

        //在线门店列表
        {
            method: 'GET',
            path: '/admin_store_list',
            handler: function(request, reply) {
                var product_id = request.query.product_id;
              return reply.view("admin_store_list",{product_id:product_id});
            }
        },

        //在线门店详情
        {
            method: 'GET',
            path: '/admin_store_view',
            handler: function(request, reply) {
                var store_id = request.query.store_id;
              return reply.view("admin_store_view",{store_id:store_id});
            }
        },

        //后台当前批次统计
        {
            method: 'GET',
            path: '/admin_count',
            handler: function(request, reply) {
              return reply.view("admin_count");
            }
        },

        //后台产品分类订货统计
        {
            method: 'GET',
            path: '/admin_count_sort',
            handler: function(request, reply) {
              return reply.view("admin_count_sort");
            }
        },

        //后台门店订货统计
        {
            method: 'GET',
            path: '/admin_count_store',
            handler: function(request, reply) {
              return reply.view("admin_count_store");
            }
        },



    ]);

    next();
}

exports.register.attributes = {
    name: moduel_prefix
};
