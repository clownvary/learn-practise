/**
 * Created by wangyan on 16/9/5.
 */
/**
 * Created by clownvary on 2016/09/05
 */
/*eslint-disable*/
var webpack = require('webpack')
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin"); //独立css
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin"); //提取公共js,前提是得手动引入公共部分
//var HtmlWebpackPlugin=require('html-webpack-plugin');//文件追加版本号,不是直接哈希文件名
var autoprefixer = require('autoprefixer'); //添加厂商前缀
var px2rem = require('postcss-px2rem'); //px转rem,移动端自适应
var HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: {
        bundle: './src/app.js'//入口的键名 可以有多个
    },
    output: {
        path: path.resolve(__dirname, 'dev'),
        //publicPath:'/assets/',//是用来给引用的静态资源添加前缀的,不会生成这个目录,生成目录在loader里配置file?name=./images/[hash:8].[ext]
        filename: 'bundle.js',
        chunkFilename: 'js/chunk.[name].[hash].js'
    },
    module: {
        loaders: [{
            test: /\.less$/,
            // include: path.resolve(__dirname, "src/assets"),
            loader: ExtractTextPlugin.extract('style', 'css?modules&localIdentName=[name]__[local]-[hash:base64:5]!postcss!less')
        }, //
        // {test: /\.less$/, include:path.resolve(__dirname, "assets"),loader: 'style!css!postcss!less},
        {

            test: /\.js$/,
            // include: './src/js/',react这里加这个会出错
            exclude: ['/node_modules/','webpack.config.js'],
            query: {
                plugins: ['transform-decorators-legacy'],
                presets: ['es2015', 'stage-0', 'react']
            },
            loader: 'babel',
        },
        {
            test: /\.(jpg|png|jpeg)$/,
            loader: "url?limit=8192&name=./images/[hash:8].[ext]"
        }

        ]
    },
    // postcss: function () {
    //     return [autoprefixer()];
    //     //return [px2rem({remUnit: 75}),autoprefixer()];
    // },
    devtool: 'source-map',
    resolve: {
        extensions: ['','.js', '.json', '.jsx','.less', '.coffee']
    },
    externals: {
        jry: 'jQuery' //引入第三方库,不用打包,页面手动引入,key是require(),value是本身库的全局访问名
    },
    plugins: [
        new webpack.BannerPlugin('This file is created by wangyan'),
        //new CommonsChunkPlugin('vendor',"common.js"),
        new ExtractTextPlugin("main.css"),
        new webpack.DefinePlugin({
            __DEV__: false,
            __STATIC__: JSON.stringify("5fa3b9"),
            ___TESTING___: false,
            __PRODUCTION__: false,
            ___SERVERRENDER___: false,
            TF: JSON.stringify('rrrr')
        }),
        new HtmlWebpackPlugin({
            title: 'active-css-demo',
            hash: true,
            inject: true
        })
    ],
    devServer: {
        contentBase: path.join(__dirname, "dev"),
        compress: true,
        port: 9000
    }
}