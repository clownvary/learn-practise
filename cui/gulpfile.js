// eslint-disable-next-line
require('babel-register');
const gulp = require('gulp');
const runSeq = require('run-sequence');
const requireDir = require('require-dir');

requireDir('./tasks', { recurse: true });

gulp.task('default', ['static']);

// Run dev mode.
gulp.task('dev', done => runSeq(/* "clean.dev", */'build.dev', done));

// Run prod mode.
gulp.task('prod', done => runSeq(/* "clean.prod", */'build.prod', done));

// Run static mode.
gulp.task('static', done => runSeq('clean.static', 'intl-extract', 'build.static', done));

// Run prod mode for server render.
gulp.task('server', done => runSeq('build.server', done));

gulp.task('release', done => runSeq('build.server', 'build.prod', done));
