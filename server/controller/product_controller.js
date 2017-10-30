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
﻿var industries = require('../utils/industries.js');
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


    var api = server.plugins.services["product_api"];
    var wx_api = server.plugins.services.wx_api;
    var person = server.plugins.services.person;
    var things = server.plugins.services.things;
    var base = server.plugins.services.base;

    server.route([
        //查询商品列表
        {
            method: 'GET',
            path: '/get_products_list',
            handler: function(request, reply) {
                var params = {};
                if (request.query.params) {
                    params = request.query.params;
                }else {
                    params = JSON.stringify(params);
                }
                api.get_products_list(params,function(err,rows){
                    if (!err) {
                        return reply({"success":true,"rows":rows.rows,"num":rows.num});
                    }else {
                        return reply({"success":false,"message":rows.message});
                    }
                });
            },
        },
        //查询指定产品信息及图片
        {
            method: 'GET',
            path: '/get_product',
            handler: function(request, reply) {
                var product_id = request.query.product_id;
                if (!product_id) {
                    return reply({"success":false,"message":"product_id is null"});
                }
                var ep =  eventproxy.create("pictures", "product", "property", "product_details", function(pictures, product, property,product_details){
                    product.pictures = pictures;
                    product.product_details = product_details;
                    var industry_id = product.industry_id;
                    var industry = industries[industry_id];
                    if (!industry) {
                        return reply({"success":false,"message":"行业不存在"});
                    }
                    var stock_options = {"region_id":"1"};
                    var page_name = industry["view_name"];
                    //行业属性
                    var industry_properties = industry["properties"];

                    var product_ids = [];
                    product_ids.push(product_id);
                    var data = {"product_ids":JSON.stringify(product_ids)};
                    get_cached_skus(data,function(err,row){
                        if (!err) {
                            product.sku_id = row.row[product_id][0].sku_id;
                            return reply({"success":true,"message":"ok","product":product,"industry_properties":industry_properties,"property":property});
                        }else {
                            return reply({"success":false,"row":row.message});
                        }
                    });
                });
                api.get_product(product_id,function(err,rows){
                    if (!err) {
                        var product = rows.rows[0];
                        ep.emit("product", product);
                    }else {
                        ep.emit("product", {});
                    }
                });
                api.get_product_pictures(product_id,function(err,rows){
                    if (!err) {
                        var pictures = rows.rows;
                        ep.emit("pictures", pictures);
                    }else {
                        ep.emit("pictures", []);
                    }
                });
                api.find_properties_by_product(product_id,function(err,rows){
                    if (!err) {
                        var properties = rows.properties;
                        var property = {};
                        for (var i = 0; i < properties.length; i++) {
                            property[properties[i].name] = properties[i];
                        }
                        ep.emit("property", property);
                    }else {
                        ep.emit("property", {});
                    }
                });
                api.find_product_details(product_id, function(err, content){
                    if (!err) {
                        var  product_details = content.row;
                        ep.emit("product_details", product_details);
                    }else {
                        ep.emit("product_details", []);
                    }
                });

            },
        },
        //查询商品属性,图片
        {
            method: 'GET',
            path: '/search_product_detail',
            handler: function(request, reply){
                var product_id = request.query.product_id;
                if (!product_id) {
                    return reply({"success":false,"message":"params null","service_info":service_info});
                }

                var ep =  eventproxy.create("pictures","properties","product",
                    function(pictures,properties,product){
                        return reply({"success":true,"message":"ok","pictures":pictures,"properties":properties,"product":product,"service_info":service_info});
                });

                api.find_pictures_byId(product_id,function(err,rows){
                    if (!err) {
                        ep.emit("pictures", rows.rows);
                    }else {
                        ep.emit("pictures", []);
                    }
                });

                api.find_properties_by_product(product_id,function(err,row){
                    if (!err) {
                        ep.emit("properties", row.properties);
                    }else {
                        ep.emit("properties", []);
                    }
                });

                api.find_product_info(product_id,function(err,row){
                    if (!err) {
                        ep.emit("product", row.row);
                    }else {
                        ep.emit("product", {});
                    }
                });
            }
        },
		//一级分类查询
		{
			method: 'GET',
			path: '/get_level_one',
			handler: function(request, reply) {
				api.get_level_one(function(err,rows){
					if (!err) {
						return reply({"success":true,"rows":rows.rows,"num":rows.rows.length});
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
    name: "product_controller"
};
