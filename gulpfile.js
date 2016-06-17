var jshint = require('gulp-jshint');
var jsonlint = require("gulp-jsonlint");

var del = require('del');
var gulp = require('gulp');

var PRIMARY_PORT = process.env.PORT | 8080;
var HOST_ADDRESS = process.env.HOST | 'localhost';
var MOCK_PORT = 8081;
var LIVE_RELOAD_PORT = 8082;

gulp.task('clean', function(){
    return del('build');
});
gulp.task('clean:npm', function(){
    return del('node_modules');
});

gulp.task('lint', function() {
  return gulp.src(['Gruntfile.js', 'src/js/*.js', 'test/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'));
});

gulp.task('jsonlint-easymock', function(){
   return gulp.src('src/easymock/**/*.json')
    .pipe(jsonlint())
    .pipe(jsonlint.reporter());
});
gulp.task('jsonlint-stubby', function(){
   return gulp.src('src/stubby/**/*.json')
    .pipe(jsonlint())
    .pipe(jsonlint.reporter());
});

gulp.task('default', function() {
  // place code for your default task here
  console.log('port='+PRIMARY_PORT);
  console.log(typeof process.env.PORT);
});