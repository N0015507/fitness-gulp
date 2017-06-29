'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass'); //https://www.npmjs.com/package/gulp-sass/
var validate = require('gulp-w3c-css'); //https://www.npmjs.com/package/gulp-w3c-css/
var htmlhint = require('gulp-htmlhint'); //https://github.com/yaniswang/HTMLHint/wiki/Rules
var babel = require('gulp-babel'); //https://babeljs.io/docs/usage/api/
var beautify = require('gulp-beautify'); //https://github.com/beautify-web/js-beautify
var cat = require('gulp-cat'); //https://www.npmjs.com/package/gulp-cat/
var align = require('gulp-align'); //https://www.npmjs.com/package/gulp-align/
var about = require('gulp-about'); //https://www.npmjs.com/package/gulp-about/

gulp.task('default', ['sass', 'validate', 'htmlhint', 'babel', 'beautify', 'cat', 'align', 'about' ]);

gulp.task('sass', function() { //tested
  return gulp.src('./assets/sass/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./assets/css/'));
});

gulp.task('validate', function() { //tested
  gulp.src("./assets/css/*.css")
  .pipe(validate())
  .pipe(gulp.dest("./dist/css"));
});

gulp.task('htmlhint', function () { //tested
    gulp.src("./index.html")
    .pipe(htmlhint())
    .pipe(gulp.dest('htmlhint'))
    .pipe(htmlhint.reporter());
});

gulp.task('babel', function () { //tested
    return gulp.src('./assets/js/align-test.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('beautify', function() { //tested
  gulp.src('./assets/js/*.js')
    .pipe(beautify({indent_size: 2}))
    .pipe(gulp.dest('./public/'))
});

gulp.task('cat', function() { //tested
    return gulp.src('./about.html')
        .pipe(cat());
});

gulp.task('align', function () { //tested
    return gulp.src('./assets/js/*.js')
        .pipe(align())
        .pipe(gulp.dest('./dist'))
})

gulp.task('about', function () {//tested
    return gulp.src('package.json')
        .pipe(about({
            keys: ['name', 'version', 'author'],   // properties to pick from the source
            inject: {                              // custom properties to inject
                buildDate: Date.now()
            }
        }))
        .pipe(gulp.dest('dist'));
});
