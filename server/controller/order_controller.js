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
var org_code = "ioio";

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
    //根据personids找昵称
	var list_by_ids = function(ids, cb){
		var url = "http://139.196.148.40:18003/person/list_by_ids?ids=";
		url = url + ids + "&scope_code=" +org_code;
		do_get_method(url,cb);
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
                        var ids = [];
                        for (var i = 0; i < rows.rows.length; i++) {
                            var order = rows.rows[i];
                            ids.push(order.person_id);
                        }
                        ids = JSON.stringify(ids);
                        var orders = rows.rows;
                        var num = rows.num;
                        list_by_ids(ids,function(err,rows){
                            if (!err) {
                                var person_map = {};
                                for (var i = 0; i < rows.rows.length; i++) {
                                    var person = rows.rows[i];
                                    person_map[person.person_id] = person;
                                }
                                for (var i = 0; i < orders.length; i++) {
                                    var order = orders[i];
                                    if (person_map[order.person_id]) {
                                        order.nickname = person_map[order.person_id].person_name;
                                    }
                                }
                                return reply({"success":true,"rows":orders,"num":num});
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
        //保存订单
        {
            method: 'POST',
            path: '/save_online_orders',
            handler: function(request, reply) {
                var person_id = get_cookie_person(request);
				if (!person_id) {
					return reply.redirect("/login");
				}
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
                var person_id = get_cookie_person(request);
				if (!person_id) {
					return reply.redirect("/login");
				}
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
                var person_id = get_cookie_person(request);
				if (!person_id) {
					return reply.redirect("/login");
				}
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
		//根据person_id和订单批次找订单
        {
            method: 'GET',
            path: '/get_batch_orders',
            handler: function(request, reply) {
                var person_id = get_cookie_person(request);
				if (!person_id) {
					return reply.redirect("/login");
				}
				var batch_no = request.query.batch_no;
				if (!batch_no) {
                    return reply({"success":false,"message":"batch_no null","service_info":service_info});
                }
                api.search_online_batch_orders(person_id,batch_no, function(err,rows){
                    if (!err) {
                        return reply({"success":true,"orders":rows.orders,"details":rows.details,"products":rows.products});
                    }else {
                        return reply({"success":false,"message":rows.message});
                    }
                });
            },
        },
		//获取最新批次信息
		{
			method: 'GET',
			path: '/search_lastest_batch_infos',
			handler: function(request, reply) {
				api.search_lastest_batch_infos(function(err,rows){
					if (!err) {
						var date,date1,date2;
						date = new Date();
						date1 = date.toLocaleDateString();
						date2 = date1 +" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
						return reply({"success":true,"row":rows.row,"time":date2});
					}else {
						return reply({"success":false,"message":rows.message});
					}
				});
			},
		},
		//获取所有带批次的商品信息
		{
			method: 'GET',
			path: '/search_batch_products_infos',
			handler: function(request, reply) {
				api.search_batch_products_infos(function(err,rows){
					if (!err) {
						var date,date1,date2;
						date = new Date();
						date1 = date.toLocaleDateString();
						date2 = date1 +" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
						return reply({"success":true,"rows":rows.rows,"time":date2});
					}else {
						return reply({"success":false,"message":rows.message});
					}
				});
			},
		},
		//获取所有带批次的门店信息
		{
			method: 'GET',
			path: '/search_batch_stores_infos',
			handler: function(request, reply) {
				api.search_batch_stores_infos(function(err,rows){
					if (!err) {
						var date,date1,date2;
						date = new Date();
						date1 = date.toLocaleDateString();
						date2 = date1 +" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
						return reply({"success":true,"rows":rows.rows,"time":date2});
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
