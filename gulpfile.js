var gulp = require('gulp');
var concat = require('gulp-concat');
var minify = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var util = require('gulp-util');
var mocha = require('gulp-mocha');

gulp.task('libraries', function() {
  gulp.src('./node_modules/bootstrap/dist/css/bootstrap.css')
    .pipe(gulp.dest('./client/css/libraries'));
  gulp.src('./node_modules/jquery/dist/jquery.min.js')
    .pipe(gulp.dest('./public/js/'));
  gulp.src('./node_modules/bootstrap/dist/js/bootstrap.min.js')
    .pipe(gulp.dest('./public/js/'));
});

gulp.task('css', function(){
    gulp.src('./client/css/**/*.css')
        .pipe(concat('style.css'))
        .pipe(minify())
        .pipe(gulp.dest('./public/css'));
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

gulp.task('default',['libraries','js','css'],function(){
});
