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


exports.register = function(server, options, next) {
    var service_info = sys_option.desc;
    var platform_id = sys_option.platform_id;


    var api = server.plugins.services["order_api"];
    var wx_api = server.plugins.services.wx_api;
    var person = server.plugins.services.person;
    var things = server.plugins.services.things;
    var base = server.plugins.services.base;

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

    server.route([
        //查询商品列表
        {
            method: 'GET',
            path: '/get_online_orders',
            handler: function(request, reply) {
                var params = {};
                if (request.query.params) {
                    params = request.query.params;
                }else {
                    params = JSON.stringify(params);
                }

                api.get_online_orders(params,function(err,rows){
                    if (!err) {
                        return reply({"success":true,"rows":rows.rows});
                    }else {
                        return reply({"success":false,"message":rows.message});
                    }
                });
            },
        },
        //保存订单
        {
            method: 'POST',
            path: '/save_online_orders',
            handler: function(request, reply) {
                var person_id = "2c293d70-4506-11e7-ad37-e93548b3e6bc";
                // var person_id = get_cookie_person(request);
				// if (!person_id) {
				// 	return reply.redirect("/login");
				// }
                var total_data = request.payload.total_data;
				var shopping_carts = request.payload.shopping_carts;
				if (!person_id || !total_data || !shopping_carts) {
					return reply({"success":false,"message":"params wrong","service_info":service_info});
				}
                var data = {
                    "person_id":person_id,
                    "total_data":total_data,
                    "shopping_carts":shopping_carts
                };

                api.save_online_orders(data,function(err,rows){
                    if (!err) {
                        console.log("rows:"+JSON.stringify(rows));
                        return reply({"success":true,"order_id":rows.order_id});
                    }else {
                        return reply({"success":false,"message":rows.message});
                    }
                });
            },
        },
        //id查询
        {
            method: 'GET',
            path: '/search_online_by_id',
            handler: function(request, reply) {
                var id = request.query.id;
                if (!id) {
                    return reply({"success":false,"message":"id null","service_info":service_info});
                }
                api.search_online_by_id(id,function(err,rows){
                    if (!err) {
                        return reply({"success":true,"rows":rows.rows});
                    }else {
                        return reply({"success":false,"message":rows.message});
                    }
                });
            },
        },
        //person_id查询
        {
            method: 'GET',
            path: '/search_online_by_personid',
            handler: function(request, reply) {
                var person_id = "2c293d70-4506-11e7-ad37-e93548b3e6bc";
                // var person_id = get_cookie_person(request);
				// if (!person_id) {
				// 	return reply.redirect("/login");
				// }
                api.search_online_by_personid(person_id,function(err,rows){
                    if (!err) {
                        return reply({"success":true,"rows":rows.rows});
                    }else {
                        return reply({"success":false,"message":rows.message});
                    }
                });
            },
        },
        //删除订单
        {
            method: 'POST',
            path: '/delete_online',
            handler: function(request, reply) {
                var id = request.payload.id;
				if (!id) {
                    return reply({"success":false,"message":"id null","service_info":service_info});
                }
                var data = {
                    "id":id
                };

                api.delete_online(data,function(err,rows){
                    if (!err) {
                        return reply({"success":true});
                    }else {
                        return reply({"success":false,"message":rows.message});
                    }
                });
            },
        },
        //更新订单状态
        {
            method: 'POST',
            path: '/update_online_status',
            handler: function(request, reply) {
                var id = request.payload.id;
				var order_status = request.payload.order_status;
				if (!id ||!order_status) {
					return reply({"success":false,"message":"params null","service_info":service_info});
				}
                var data = {
                    "id":id,
                    "order_status":order_status
                };

                api.update_online_status(data,function(err,rows){
                    if (!err) {
                        return reply({"success":true});
                    }else {
                        return reply({"success":false,"message":rows.message});
                    }
                });
            },
        },
        //明细
        {
            method: 'GET',
            path: '/search_ol_orders_infos',
            handler: function(request, reply) {
                var order_ids = request.query.order_ids;
				if (!order_ids) {
					return reply({"success":false,"message":"order_ids null","service_info":service_info});
				}
                api.search_ol_orders_infos(order_ids,function(err,rows){
                    if (!err) {
                        return reply({"success":true,"rows":rows.rows,"products":rows.products});
                    }else {
                        return reply({"success":false,"message":rows.message});
                    }
                });
            },
        },
        //查询订单根据person_id,status
        {
            method: 'GET',
            path: '/search_online_by_status',
            handler: function(request, reply) {
                var person_id = "2c293d70-4506-11e7-ad37-e93548b3e6bc";
                // var person_id = get_cookie_person(request);
				// if (!person_id) {
				// 	return reply.redirect("/login");
				// }
                var status = request.query.status;
                if (!status) {
                    return reply({"success":false,"message":"status null","service_info":service_info});
                }
                api.search_online_by_status(person_id,status, function(err,rows){
                    if (!err) {
                        return reply({"success":true,"orders":rows.orders,"details":rows.details,"products":rows.products});
                    }else {
                        return reply({"success":false,"message":rows.message});
                    }
                });
            },
        },


    ]);

    next();
}

exports.register.attributes = {
    name: "order_controller"
};
