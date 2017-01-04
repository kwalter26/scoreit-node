var gulp = require('gulp');
var concat = require('gulp-concat');
var minify = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var util = require('gulp-util');
var mocha = require('gulp-mocha');
var scss = require("gulp-scss");

gulp.task('client-build', function() {
  gulp.src('./client/style/_custom.scss')
    .pipe(gulp.dest('./node_modules/bootstrap/scss'));
  gulp.src('./client/style/_variables.scss')
    .pipe(gulp.dest('./node_modules/bootstrap/scss'));
  gulp.src('./node_modules/jquery/dist/jquery.js')
    .pipe(gulp.dest('./client/compile/'));
  gulp.src('./client/style/style.scss')
    .pipe(scss({"bundleExec": true}))
    .pipe(gulp.dest('./client/compile/style.css'));
});

gulp.task('js', function() {
  return gulp.src('client/js/**/*.js')
    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./public/js'));
});

gulp.task('test', function(){
    return gulp.src('./tests/**/*.js', {read: false})
        // gulp-mocha needs filepaths so you can't have any plugins before it
        .pipe(mocha({reporter: 'spec'}));
});

gulp.task('build',['libraries','js','css'],function(){
});
