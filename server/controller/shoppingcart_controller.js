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
var r = require('request');
var moment = require('moment');
var eventproxy = require('eventproxy');
const sys_option = require('../config/sys_option');
const uu_request = require('../utils/uu_request');

//get
var do_get_method = function(url,cb){
	uu_request.get(url, function(err, response, body){
		if (!err && response.statusCode === 200) {
			var content = JSON.parse(body);
			do_result(false, content, cb);
		} else {
			cb(true, null);
		}
	});
};
//所有post调用接口方法
var do_post_method = function(url,data,cb){
	uu_request.request(url, data, function(err, response, body) {
		if (!err && response.statusCode === 200) {
			do_result(false, body, cb);
		} else {
			cb(true,null);
		}
	});
};
//处理结果
var do_result = function(err,result,cb){
	if (!err) {
		if (result.success) {
			cb(false,result);
		}else {
			cb(true,result);
		}
	}else {
		cb(true,null);
	}
};
//sku_id
var get_cached_skus = function(data, cb){
	var url = "http://211.149.248.241:12001/get_cached_skus_by_product_ids";
	do_post_method(url,data,cb);
};

exports.register = function(server, options, next) {
    var service_info = sys_option.desc;
    var platform_id = sys_option.platform_id;

    var get_cookie_person = function(request){
        var person_id;
        if (request.state && request.state.cookie) {
            state = request.state.cookie;
            if (state.person_id) {
                person_id = state.person_id;
            }
        }
        return person_id;
    };

    var api = server.plugins.services["shoppingcart_api"];
    var wx_api = server.plugins.services.wx_api;
    var person = server.plugins.services.person;
    var things = server.plugins.services.things;
    var base = server.plugins.services.base;

    server.route([
        //查询有人购物车
        {
            method: 'GET',
            path: '/find_person_cart',
            handler: function(request, reply) {
                var person_id = get_cookie_person(request);
				if (!person_id) {
					return reply.redirect("/login");
				}
                var cart_code = "";
                api.sarch_cart_infos(person_id,cart_code,function(err,rows){
                    if (!err) {
                        return reply({"success":true,"rows":rows.shopping_carts,"products":rows.products,"total_data":rows.total_data});
                    }else {
                        return reply({"success":false,"message":rows.message});
                    }
                });
            },
        },
        //删除购物车商品
        {
            method: 'POST',
            path: '/delete_shopping_carts',
            handler: function(request, reply) {
                var person_id = get_cookie_person(request);
				if (!person_id) {
					return reply.redirect("/login");
				}
                var cart_code = "";
                var id = request.payload.id;
                var ids = [];
				ids.push(id);
				ids = JSON.stringify(ids);
                api.delete_shopping_carts(ids,function(err,rows){
                    if (!err) {
                        api.sarch_cart_infos(person_id,cart_code,function(err,rows){
                            if (!err) {
                                return reply({"success":true,"rows":rows.shopping_carts,"products":rows.products,"total_data":rows.total_data});
                            }else {
                                return reply({"success":false,"message":rows.message});
                            }
                        });
                    }else {
                        return reply({"success":false,"message":rows.message});
                    }
                });
            },
        },
        //修改购物车商品数量
        {
            method: 'POST',
            path: '/update_cart_number',
            handler: function(request, reply) {
                var person_id = get_cookie_person(request);
				if (!person_id) {
					return reply.redirect("/login");
				}
                var cart_code = "";
                var id = request.payload.id;
                var num = request.payload.num
                if (!num||!id) {
					return reply({"success":false,"message":"params null","service_info":service_info});
				};
                var ids = [];
				ids.push(id);
				ids = JSON.stringify(ids);
                api.update_cart_number(ids,num,function(err,rows){
                    if (!err) {
                        api.sarch_cart_infos(person_id,cart_code,function(err,rows){
                            if (!err) {
                                return reply({"success":true,"rows":rows.shopping_carts,"products":rows.products,"total_data":rows.total_data});
                            }else {
                                return reply({"success":false,"message":rows.message});
                            }
                        });
                    }else {
                        return reply({"success":false,"message":rows.message});
                    }
                });
            },
        },
        //购物车添加商品
		{
			method: 'POST',
			path: '/add_shopping_cart',
			handler: function(request, reply){
                var person_id = get_cookie_person(request);
                if (!person_id) {
                    return reply.redirect("/login");
                }
				var product_num = request.payload.num;
				var product_id = request.payload.product_id;
				var product_price = request.payload.product_price;
                if (!product_num || !product_id || !product_price) {
					return reply({"success":false,"message":"param null"});
				}
                var product_ids = [];
                product_ids.push(product_id);
                var data = {"product_ids":JSON.stringify(product_ids)};
                get_cached_skus(data,function(err,row){
                    if (!err) {
                        var sku_id = row.row[product_id][0].sku_id;
                        var data = {
                            "person_id" : person_id,
                            "product_id" : product_id,
                            "product_num" : product_num,
                            "product_price" : product_price,
                            "sku_id" : sku_id
                        };
                        api.search_shopping_cart(data,function(err,result){
                            if (!err) {
                                return reply({"success":true,"all_items":result.all_items});
                            }else {
                                return reply({"success":false,"message":err});
                            }
                        });
                    }else {
                        return reply({"success":false,"row":row.message});
                    }
                });
			}
		},

    ]);

    next();
}

exports.register.attributes = {
    name: "shoppingcart_controller"
};
