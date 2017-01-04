var gulp = require('gulp');
var concat = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');
var rename = require('gulp-rename');
var minify = require('gulp-uglify');
var util = require('gulp-util');
var mocha = require('gulp-mocha');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var watch = require('gulp-watch');

gulp.task('styles', function() {
  gulp.src('./client/style/bootstrap/_custom.scss')
    .pipe(gulp.dest('./node_modules/bootstrap/scss'));
  gulp.src('./client/style/bootstrap/_variables.scss')
    .pipe(gulp.dest('./node_modules/bootstrap/scss'));
  gulp.src('./client/style/style.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(cleanCSS({debug: true}, function(details) {
      console.log(details.name + ': ' + details.stats.originalSize);
      console.log(details.name + ': ' + details.stats.minifiedSize);
    }))
    .pipe(gulp.dest('./public/css'));
});

gulp.task('js',function(){
  gulp.src('./node_modules/jquery/dist/jquery.min.js')
    .pipe(gulp.dest('./public/js/'));
  gulp.src('./node_modules/tether/dist/js/tether.min.js')
    .pipe(gulp.dest('./public/js/'));
  gulp.src('./node_modules/bootstrap/dist/js/bootstrap.min.js')
    .pipe(gulp.dest('./public/js/'));
  gulp.src('./client/js/*.js')
    .pipe(gulp.dest('./client/compile/'));
  gulp.src('./client/js/**/*.js')
    .pipe(gulp.dest('./client/compile/'));
  gulp.src('./client/compile/*.js')
    .pipe(concat('all.js'))
    .pipe(minify({ext:{min:'.js'}}))
    .pipe(gulp.dest('./public/js'));
});

gulp.task('test', function(){
    return gulp.src('./tests/**/*.js', {read: false})
        // gulp-mocha needs filepaths so you can't have any plugins before it
        .pipe(mocha({reporter: 'spec'}));
});

gulp.task('watch',function(){
  gulp.watch('./client/style/*', ['styles']);
  gulp.watch('./client/js/*', ['js']);
});

gulp.task('default',['styles','js','test'],function(){
});
