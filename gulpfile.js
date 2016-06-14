var jshint = require('gulp-jshint');
var jsonlint = require("gulp-jsonlint");

var gulp = require('gulp');

gulp.task('lint', function() {
  return gulp.src(['Gruntfile.js', 'src/js/*.js', 'test/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
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
});