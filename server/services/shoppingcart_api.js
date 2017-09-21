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
var eventproxy = require('eventproxy');
const util = require('util');
const uu_request = require('../utils/uu_request');

var host = "http://211.149.248.241:18015/";

var nav = function(server) {
    return {
        //更新购物车商品数量
        update_cart_number: function(ids,num, cb) {
            var url = host + "update_cart_number";
            var data = {ids:ids,num:num};

            uu_request.do_post_method(url, data, function(err, body) {
                if (!err) {
                    cb(err,body);
                } else {
                    cb(true,{message:"网络错误"});
                }
            });
        },
        //删除购物车
        delete_shopping_carts: function(ids, cb) {
            var url = host + "delete_shopping_carts?ids="+ids;
            uu_request.get(url, function(err, response, body) {
                if (!err && response.statusCode === 200) {
                    cb(err,JSON.parse(body));
                } else {
                    cb(true,{message:"网络错误"});
                }
            });
        },
        //查询有人购物车
        sarch_cart_infos: function(person_id,cart_code, cb) {
            var url = host + "find_person_cart?person_id="+person_id+"&cart_code="+cart_code;
            uu_request.get(url, function(err, response, body) {
                if (!err && response.statusCode === 200) {
                    cb(err,JSON.parse(body));
                } else {
                    cb(true,{message:"网络错误"});
                }
            });
        },


    };
};

module.exports = nav;
