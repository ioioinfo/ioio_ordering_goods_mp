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
const uu_request = require('../utils/uu_request');
var org_code = "ioio";

var moduel_prefix = sys_option.product_name + '_person';
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
//根据personid找info
var find_person_info = function(person_id, cb){
    var url = "http://139.196.148.40:18003/person/get_by_id?person_id=";
    url = url + person_id + "&scope_code=" +org_code;
    do_get_method(url,cb);
};
//登入账号验证
var do_login = function(data, cb){
	var url = "http://139.196.148.40:18666/user/login_check";
	do_post_method(url,data,cb);
};

exports.register = function(server, options, next) {
    var byd_api = server.plugins.services.byd_api;
    var person = server.plugins.services.person;
    var wx_api = server.plugins.services.wx_api;
    var api = server.plugins.services["4s_api"];
    var notify = server.plugins.services.notify;

	var login_set_cookie = function(request,person_id){
		var state;
		if (request.state && request.state.cookie) {
			state = request.state.cookie;
			state.person_id = person_id;
		}else {
			state = {person_id:person_id};
		}
		return state;
	};

    server.route([
        //个人信息
        {
            method: 'GET',
            path: '/find_person_info',
            handler: function(request, reply) {
                var person_id = "2c293d70-4506-11e7-ad37-e93548b3e6bc";
                find_person_info(person_id,function(err,row){
                    if (!err) {

                        return reply({"success":true,"row":row.row});
                    }else {
                        return reply({"success":false,"message":rows.message});
                    }
                });
            },
        },
		//登入
		{
			method: 'POST',
			path: '/do_login',
			handler: function(request, reply){
				var data = {};
				data.username = request.payload.username;
				data.password = request.payload.password;
				data.org_code = "ioio";

				do_login(data, function(err,content){
					if (!err) {
						if (!content.success) {
							return reply({"success":false,"message":"password wrong"});
						}
						var person_id = content.row.person_id;
						if (!person_id) {
							return reply({"success":false,"message":"no account"});
						}

						var state = login_set_cookie(request,person_id);

						return reply({"success":true,"service_info":service_info}).state('cookie', state, {ttl:1000*365*24*60*60*1000});
					} else {
						return reply({"success":false,"message":content.message});
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
