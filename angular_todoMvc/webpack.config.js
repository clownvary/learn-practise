/**
 * Created by wangyan on 16/8/25.
 */

var webpack = require('webpack')
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");//独立css
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");//提取公共js,前提是得手动引入公共部分
//var HtmlWebpackPlugin=require('html-webpack-plugin');//文件追加版本号,不是直接哈希文件名
var autoprefixer = require('autoprefixer');//添加厂商前缀
var px2rem = require('postcss-px2rem');//px转rem,移动端自适应
module.exports = {
    plugins: [
        new webpack.BannerPlugin('This file is created by wangyan'),
        //new CommonsChunkPlugin('vendor',"common.js"),
        new ExtractTextPlugin("main.css"),
        // new HtmlWebpackPlugin({
        //     title:'webpack-demo',
        //     hash:true,
        //     cache:true
        // })
    ],
    entry: {
        vendor:'./app.js'//入口的键名 可以有多个
    },
    output: {
        path: path.resolve(__dirname, 'dev'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [

            {
                test: /\.less$/,
                include: path.resolve(__dirname, "assets"),
                loader: ExtractTextPlugin.extract('style', 'css!postcss!less')
            },
            // {test: /\.less$/, include:path.resolve(__dirname, "assets"),loader: 'style!css!postcss!less'},
            {test: /\.js$/, loaders: ['ng-annotate']},
            {
                //include: path.resolve(__dirname, "js"),//包含哪个目录
                exclude: './node_modules/',
                test: /\.js$/, loader: 'babel', query: {presets: ['es2015']}
            }

        ]
    }
    ,
    postcss: function () {
        return [autoprefixer()];
        //return [px2rem({remUnit: 75}),autoprefixer()];
    },
    externals: {
        jry: 'jQuery',//引入第三方库,不用打包,页面手动引入,key是require(),value是本身库的全局访问名
        ang: 'angular'
    }


}