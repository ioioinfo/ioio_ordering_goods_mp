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

var host = "http://211.149.248.241:18010/";

var nav = function(server) {
    return {
        //查询订单列表
        get_online_orders: function(params,cb) {
            var url = host + "get_online_orders?params="+params;
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