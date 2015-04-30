'use strict';
var gulp = require('gulp');
var jslint = require('gulp-jslint');
var serve = require('gulp-serve');
var sass = require('gulp-sass');
var inject = require('gulp-inject');
var rimraf = require('rimraf');
var uglify = require('gulp-uglify');
var bower = require('gulp-bower');
var mainBowerFiles = require('main-bower-files');

var targetIndex = gulp.src('./index.html');
var angularFiles = ['scripts/app.js', 'scripts/controller/*.js', 'scripts/services/*.js',
                    'scripts/directives/*.js'];
var injectOptions = {
  ignorePath: ['/build', '/scripts'],
  addRootSlash: false
};

gulp.task('sass', function () {
    return gulp.src('./scss/*.scss').pipe(sass()).pipe(gulp.dest('./build/css'));
});

gulp.task('bower', function() {
  return gulp.src(mainBowerFiles(), { base: './bower_components' })
        .pipe(gulp.dest('./build/bower_components/'))
});

gulp.task('inject', ['sass'], function () {
  var allFiles = angularFiles.concat(['./build/css/*.css']);
  var sources = gulp.src(allFiles, { read: false });
  return targetIndex.pipe(inject(sources, injectOptions)).pipe(gulp.dest('./build/'));
});

gulp.task('clean', function (callback) {
  rimraf('./build', callback);
});

gulp.task('js:compress', function() {
  return gulp.src('./scripts/**/*.js')
    .pipe(uglify({ mangle: false }))
    .pipe(gulp.dest('./build'));
});

gulp.task('jslint', function () {
  return gulp.src(angularFiles)
      .pipe(jslint({
        node: true,
        vars: true,
        unparam: true,
        nomen: true,
        white: true,
        evil: true,
        errorsOnly: false,
        plusplus: true,
        bitwise: true,
        todo: true,
        stupid: true,
        global: [ 'angular' ]
      }));
});

gulp.task('serve', serve({
    root: ['./build'],
    port: 2222
}));

gulp.task('default', ['jslint', 'sass', 'js:compress', 'bower', 'inject', 'serve']);
