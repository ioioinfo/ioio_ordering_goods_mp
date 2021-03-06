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

module.exports = {
    entry: {
        index: './app/index.jsx',
        login: './app/login.jsx',
        person_center: './app/person_center.jsx',
        product_list: './app/product_list.jsx',
        signup: './app/signup.jsx',
        product_sort: './app/product_sort.jsx',
        product_cart: './app/product_cart.jsx',
        order_sure: './app/order_sure.jsx',
        order_detail: './app/order_detail.jsx',
        order_list: './app/order_list.jsx',
        now_order: './app/now_order.jsx',
        search: './app/search.jsx',
        product_show: './app/product_show.jsx',

        admin_login: './app/admin_login.jsx',
        admin_user_list: './app/admin_user_list.jsx',
        admin_user_edit: './app/admin_user_edit.jsx',
        admin_product_list: './app/admin_product_list.jsx',
        admin_product_img: './app/admin_product_img.jsx',
        admin_add_custom: './app/admin_add_custom.jsx',
        admin_order_list: './app/admin_order_list.jsx',
        admin_order_detail: './app/admin_order_detail.jsx',
        admin_order_product_detail: './app/admin_order_product_detail.jsx',
        admin_add_product: './app/admin_add_product.jsx',
        admin_product_online_list: './app/admin_product_online_list.jsx',
        admin_product_sort_list: './app/admin_product_sort_list.jsx',
        admin_business_list: './app/admin_business_list.jsx',
        admin_add_business: './app/admin_add_business.jsx',
        admin_store_list: './app/admin_store_list.jsx',
        admin_store_view: './app/admin_store_view.jsx',
        admin_count: './app/admin_count.jsx',
        admin_count_sort: './app/admin_count_sort.jsx',
        admin_count_store: './app/admin_count_store.jsx',
        order_product_detail: './app/order_product_detail.jsx',
        admin_business_set: './app/admin_business_set.jsx',
        admin_business_edit: './app/admin_business_edit.jsx',
        admin_business_price_list: './app/admin_business_price_list.jsx',
        text: './app/text.jsx',
    },
    output: {
        path: __dirname,
        filename: './public/js/app/[name].js'
    },
    resolve: {
        modules: [__dirname, '../node_modules','components'],
        alias: {

        },
        extensions: ['.js','.jsx']
    },
    externals: {
      'react': 'React',
      'react-dom': 'ReactDOM'
    },
    module: {
        loaders: [
            {
                loader: 'babel-loader',
                options: {
                    presets: ['react', 'es2015'],
                    plugins: [
                        ["import", { libraryName: "antd-mobile", style: "css" }] // `style: true` 会加载 less 文件
                    ],
                },
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            }
        ]
    }
};
