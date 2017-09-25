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


    var api = server.plugins.services["search_api"];
    var wx_api = server.plugins.services.wx_api;
    var person = server.plugins.services.person;
    var things = server.plugins.services.things;
    var base = server.plugins.services.base;

    server.route([
        //查询商品列表
        {
            method: 'GET',
            path: '/search_products',
            handler: function(request, reply) {
                var search_object = {};
                search_object.sort = request.query.sort;
				search_object.q = request.query.q;
				search_object.sort_id = request.query.sort_id;
				search_object.is_new = request.query.is_new;
				search_object.row_materials = request.query.row_materials;
				search_object.size_name = request.query.size_name;
				search_object.sort_ids = request.query.sort_ids;
				search_object.num = request.query.num;
				search_object.lastest = request.query.lastest;
				search_object.price1 = request.query.price1;
				search_object.price2 = request.query.price2;
                var data = {"search_object":JSON.stringify(search_object)};
                api.search_products(data,function(err,rows){
                    if (!err) {
                        if (rows.success) {
                            if (rows.rows.length == 0) {
    							return reply({"products":[],"search_object":JSON.stringify(search_object)});
    						}
                            var industry_id = rows.rows[0].industry_id;

                            return reply({"success":true,"products":rows.rows,"search_object":JSON.stringify(search_object)});
                        }else {
                            return reply({"success":false,"message":rows.message});
                        }
                    }else {
                        return reply({"success":false,"message":rows.message});
                    }
                });
            },
        },
        //查询商品分类
        {
            method: 'GET',
            path: '/search_sorts',
            handler: function(request, reply) {
                api.search_sorts(function(err,rows){
                    if (!err) {
                        var sorts = [];
                        for (var i = 0; i < rows.rows.length; i++) {
                            var sort = rows.rows[i];
                            if (sort.id.substring(6,9) == "000") {
                                sorts.push(sort);
                            }
                        }
                        return reply({"success":true,"rows":sorts});
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
    name: "search_controller"
};
