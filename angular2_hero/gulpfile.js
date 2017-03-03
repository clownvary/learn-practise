/**
 * Created by yan on 16-12-21.
 */
var gulp = require('gulp');
var typedoc = require("gulp-typedoc");
gulp.task("typedoc", function() {
  return gulp
    .src(["src/*.ts"])
    .pipe(typedoc({
      // TypeScript options (see typescript docs)
      module: "commonjs",
      target: "es5",
      includeDeclarations: true,
      mode: "modules",

      // Output options (see typedoc docs)
      out: "./doc",
      json: "./doc/file.json",

      // TypeDoc options (see typedoc docs)
      name: "my-project",
      theme: "default",
      //plugins: ["my", "plugins"],
      ignoreCompilerErrors: false,
      version: true,
    }))
    ;
});
