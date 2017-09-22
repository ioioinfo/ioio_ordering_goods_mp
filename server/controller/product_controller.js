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
                        return reply({"success":true,"rows":rows});
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
                //行业属性
                var industry_properties = industry["properties"];
                var ep =  eventproxy.create("pictures", product, property, function(pictures, product, property){
                    product.pictures = pictures;
                    
                    return reply({"product":product,"industry_properties":industry_properties,"property":property});
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
                        var properties = result.properties;
                        var property = {};
                        for (var i = 0; i < properties.length; i++) {
                            property[properties[i].name] = properties[i];
                        }
                        ep.emit("property", property);
                    }else {
                        ep.emit("property", {});
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
