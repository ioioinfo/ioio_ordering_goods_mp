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
var platform_code = "ording_goods";
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
var moduel_prefix = 'admin_data';

exports.register = function(server, options, next) {
    var service_info = sys_option.desc;
    var platform_id = sys_option.platform_id;
    //商家列表接口
	var get_sellers_list = function(cb){
		var url = "http://139.196.148.40:18001/merchant/list_by_org?org_code="+org_code;
		do_get_method(url,cb);
	};
	//用户列表接口
    var get_users_list = function(cb){
        var url = "http://139.196.148.40:18666/user/list?org_code="+org_code+"&platform_code="+platform_code;
        do_get_method(url,cb);
    };
	//门店列表
	var store_list = function(cb){
		var url = "http://211.149.248.241:19999/store/list?org_code="+org_code;
		do_get_method(url,cb);
	};
	//根据id得到指定门店信息
	var get_by_id = function(store_id,cb){
		var url = "http://211.149.248.241:19999/store/get_by_id?id="+store_id+"&org_code="+org_code;
		do_get_method(url,cb);
	};
    server.route([
        //商家列表接口
        {
            method: 'GET',
            path: '/get_sellers_list',
            handler: function(request, reply) {
                get_sellers_list(function(err,rows){
                    if (!err) {
                        return reply({"success":true,"orders":rows.rows});
                    }else {
                        return reply({"success":false,"message":rows.message});
                    }
                });
            },
        },
        //用户列表接口
        {
            method: 'GET',
            path: '/get_users_list',
            handler: function(request, reply) {
                get_users_list(function(err,rows){
                    if (!err) {
                        return reply({"success":true,"orders":rows.rows});
                    }else {
                        return reply({"success":false,"message":rows.message});
                    }
                });
            },
        },
		//门店接口
		{
			method: 'GET',
			path: '/store_list',
			handler: function(request, reply){
				store_list(function(err,rows){
					if (!err) {
						return reply({"success":true,"service_info":service_info,"rows":rows.rows,"num":rows.num});
					}else {
						return reply({"success":false,"message":rows.message,"service_info":service_info});
					}
				});
			}
		},
		//门店详细信息
		{
			method: 'get',
			path: '/mendian_detail',
			handler: function(request, reply){
				var store_id = request.query.store_id;
				get_by_id(store_id,function(err,row){
					if (!err) {
						return reply({"success":true,"row":row.row});
					}else {
						return reply({"success":false,"message":row.message});
					}
				});
			}
		},



    ]);

    next();
}

exports.register.attributes = {
    name: moduel_prefix
};
