/**
 * Created by wangyan on 16/8/13.
 */
var gulp = require('gulp');
var concat = require('gulp-concat');//合并
var uglify = require('gulp-uglify');//js压缩
var rev = require('gulp-rev');//文件名哈希
var revCollector = require('gulp-rev-collector');//文件名替换
var minify = require('gulp-minify-css');//css压缩
var minifyHtml = require('gulp-minify-html');//html压缩
var clean = require("gulp-clean");//清除文件
var gulpSequence = require('gulp-sequence');//顺序执行
var imagemin = require('gulp-imagemin');//图片压缩
var replace = require('gulp-replace-path');
var path = require('path');
var mainBowerFiles = require('main-bower-files');
var webpack = require("webpack");
var webpack_cfg = require('./webpack.config.js');
var opt = {buildPath: "./build", devPath: "./dev"};
var browserSync = require('browser-sync').create();
gulp.task('webpack', function (callback) {

    // 将你的默认的任务代码放在这
    var myConfig = Object.create(webpack_cfg);
    webpack(
        // configuration
        myConfig
        , function (err, stats) {
            // if(err) throw new gutil.PluginError("webpack", err);
            // gutil.log("[webpack]", stats.toString({
            //	 // output options
            // }));
            callback();
        });
});
/**
 * 文件合并
 */
gulp.task('concat', function () {
    return gulp.src('./dev/*.js')
        .pipe(concat('main.js'))
        .pipe(gulp.dest('./build'));

});
/**
 * js压缩
 */
gulp.task('uglify',function () {
    return gulp.src('./dev/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./build'))

});
/**
 * css压缩
 */
gulp.task('minifycss', function () {
    return gulp.src('./dev/*.css')
        .pipe(minify('main.css'))
        .pipe(gulp.dest("./build"));

});
/**
 * 图片压缩
 */
gulp.task('imgmin',function () {
    return gulp.src('./img/*')
        .pipe(imagemin())
        .pipe(gulp.dest(opt.buildPath+'/img'));
});
/**
 * 文件哈希
 */
gulp.task('rev', function () {
    return gulp.src([opt.buildPath+"/*.js",opt.buildPath+"/*.css"])
        .pipe(rev())
        .pipe(gulp.dest(opt.buildPath))
        .pipe(rev.manifest())
        .pipe(gulp.dest(opt.buildPath));

});
/**
 * 文件名替换
 * //rev插件生成的manifest没有任何目录信息,所以需要在 这里配置dirReplacements编译后的目录信息
 * 注意依赖rev
 */
gulp.task('rev_replace', function () {
    return gulp.src([opt.buildPath + '/*.json','./index.html'])
        .pipe(revCollector({
            replaceReved: true,
            dirReplacements: {
                './dev/': './'
            }
        }))
        .pipe(gulp.dest(opt.buildPath));
});
/**
 * bower依赖库主文件提出
 */
gulp.task('main_bower_file', function() {
    return gulp.src(mainBowerFiles({
        paths: {
            bowerDirectory: './bower_components',
            bowerJson: './bower.json'
        }}))
        .pipe(gulp.dest(opt.buildPath+'/libs'))
});
/**
 * 压缩html并替换bower路径
 */
gulp.task('mini_html_path_replace', function(){
    gulp.src([opt.buildPath+'/index.html'])
       // .pipe(replace('./bower_components', '../bower_components'))
        .pipe(replace(/\..+bower.*\w\//g, './libs/'))
        .pipe(minifyHtml({
            empty: true,
            spare: true
        }))
        .pipe(gulp.dest(opt.buildPath));
});

gulp.task('clean',function () {
    return gulp.src(opt.buildPath+"/",{read:false})
        .pipe(clean());

});
gulp.task('clean_origin',function () {
    return gulp.src([opt.buildPath+"/bundle.js",opt.buildPath+"/main.css",opt.buildPath+"/rev*.json"],{read:false})
        .pipe(clean());

});


/**
 * 按顺序运行各任务
 * //中括号里的并行,其他的串行顺序执行
 */
gulp.task('autorun', gulpSequence('webpack','clean',['uglify','minifycss','main_bower_file'], 'rev', 'rev_replace','mini_html_path_replace','clean_origin'));
gulp.task('watch', function () {
    return gulp.watch('./es6/*.js', ['webpack']);
});


// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch(["./*",'./assets/*']).on("change", function () {
        browserSync.reload();
    });
});
