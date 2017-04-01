"use strict";

import gulp from "gulp";
import gutil from "gulp-util";
import appConfig, {host, port, outputDir} from "./app.config";
import configDev from "./webpack/config.dev";
import configProd from "./webpack/config.prod";
import configStatic from "./webpack/config.static";
import configServer from "./webpack/config.server";
import webpack from "webpack";
import WebpackDevServer from "webpack-dev-server";

let firstWebpack = true;
let firstServerWebpack = true;

gulp.task("build.server", function(done) {
  let config = Object.assign({}, configServer);
  webpack(config, function(err, stats) {
    if(firstServerWebpack){
      done();
      firstServerWebpack = false;
    }
  });
});

gulp.task("build.dev", function(done) {
  let config = Object.assign({}, configDev);
  webpack(config, function(err, stats) {
    if(err) throw new gutil.PluginError("webpack", err);
    gutil.log("[webpack]", stats.toString({
        colors: true
    }));
    if(firstWebpack){
      done();
      firstWebpack = false;
    }
  });
});


gulp.task("build.prod", function(done) {
  let config = Object.assign({}, configProd);
  webpack(config, function(err, stats) {
    if(err) throw new gutil.PluginError("webpack", err);
    gutil.log("[webpack]", stats.toString({
        colors: false
    }));
    if(firstWebpack){
      done();
      firstWebpack = false;
    }
  });
});

gulp.task("build.static", function(done) {
  let config = Object.assign({}, configStatic);
  new WebpackDevServer(webpack(config), {
    contentBase: outputDir["static"],
    hot: true,
    quiet: false,
    publicPath: config.output.publicPath,
    historyApiFallback: true,
    stats: {colors: true},
  }).listen(port, host, (err) => {
    if (err) {
      return console.error(err);
    }
    console.log(`Listening at http://${host}:${port}`);
  });
});
