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
var clean = require('gulp-clean');
var gulpsync = require('gulp-sync')(gulp);

gulp.task('css', function() {
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
  gulp.src('./node_modules/angular/angular.min.js')
    .pipe(gulp.dest('./public/js/'));
  gulp.src('./node_modules/angular/angular.min.js.map')
    .pipe(gulp.dest('./public/js/'));
  gulp.src('./node_modules/angular-route/angular-route.min.js')
    .pipe(gulp.dest('./public/js/'));
  gulp.src('./node_modules/angular-route/angular-route.min.js.map')
    .pipe(gulp.dest('./public/js/'));
  gulp.src('./node_modules/tether/dist/js/tether.min.js')
    .pipe(gulp.dest('./public/js/'));
  gulp.src('./node_modules/bootstrap/dist/js/bootstrap.min.js')
    .pipe(gulp.dest('./public/js/'));
  gulp.src('./client/js/*.js')
    .pipe(gulp.dest('./client/compile/'));
  gulp.src('./client/js/controllers/*.js')
    .pipe(gulp.dest('./client/compile/'));
  gulp.src('./client/compile/*.js')
    .pipe(concat('all.js'))
    .pipe(minify({ext:{min:'.js'}}))
    .pipe(gulp.dest('./public/js'));
});

gulp.task('test', function(){
    return gulp.src('./tests/**/*.js', {read: false})
        .pipe(mocha({reporter: 'spec'}))
        .once('error', function () {
            process.exit(1);
        })
        .once('end', function () {
            process.exit();
        });
});

gulp.task('clean-css',function(){
  gulp.src('./public/css', {read: false}).pipe(clean());
});

gulp.task('clean-js',function(){
  gulp.src('./public/js', {read: false}).pipe(clean());
});

gulp.task('watch',function(){
  gulp.watch('./client/style/**', gulpsync.sync([
    // 'clean-js',
    'js'
  ]));
  gulp.watch('./client/js/**', gulpsync.sync([
    // 'clean-css',
    'css'
  ]));
});

gulp.task('default',['css','js','test'],function(){
});
