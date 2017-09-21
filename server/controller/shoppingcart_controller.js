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
                var person_id = "2c293d70-4506-11e7-ad37-e93548b3e6bc";
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
        //删除购物车
        {
            method: 'POST',
            path: '/delete_shopping_carts',
            handler: function(request, reply) {
                var person_id = "2c293d70-4506-11e7-ad37-e93548b3e6bc";
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


    ]);

    next();
}

exports.register.attributes = {
    name: "shoppingcart_controller"
};
