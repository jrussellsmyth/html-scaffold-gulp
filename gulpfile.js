const jshint = require('gulp-jshint'),
    jsonlint = require("gulp-jsonlint"),
    gls = require("gulp-live-server"),
    del = require('del'),
    gulp = require('gulp');

const PRIMARY_PORT = process.env.PORT | 8080,
    HOST_ADDRESS = process.env.HOST | '0.0.0.0'/*'localhost'*/,
    MOCK_PORT = 8081,
    LIVE_RELOAD_PORT = 8082;

gulp.task('clean', function() {
    return del('build');
});
gulp.task('clean:npm', function() {
    return del('node_modules');
});

/* Linting */
gulp.task('jshint', function() {
    return gulp.src(['Gruntfile.js', 'src/js/*.js', 'test/**/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(jshint.reporter('fail'));
});

gulp.task('jsonlint-easymock', function() {
    return gulp.src('src/easymock/**/*.json')
        .pipe(jsonlint())
        .pipe(jsonlint.reporter());
});
gulp.task('jsonlint-stubby', function() {
    return gulp.src('src/stubby/**/*.json')
        .pipe(jsonlint())
        .pipe(jsonlint.reporter());
});

gulp.task('jsonlint',[/*'jsonlint-easymock',*/ 'jsonlint-stubby']);

/* Build - file copies */
gulp.task('copy:html', function(){
   gulp.src(['src/html/**/*.html'], {base:'src/html/'}) 
   .pipe(gulp.dest('./build'));
});

gulp.task('copy:css', function(){
   gulp.src(['src/css/**/*.css'], {base:'src/css/'}) 
   .pipe(gulp.dest('./build/styles'));
});

gulp.task('copy:other', function(){
   gulp.src(['src/js/**/*','src/lib/**/*', 'articles/**/*'], {base:'src'}) 
   .pipe(gulp.dest('./build/'));
});

gulp.task('copy', ['copy:html', 'copy:css', 'copy:other']);

gulp.task('watch', function(){
    gulp.watch(['gulpfile.js', 'src/js/*.js', 'test/**/*.js', 'src/**/*.html', 'src/css/**/*', 'src/articles/**/*', 'src/easymock/**/*', 'src/stubby/**/*'],['jshint' /*, 'qunit'*/, 'jsonlint', 'copy:build'])
});

gulp.task('build', function(){
    console.log('build');
});

/* Dev - Run */
gulp.task('serve', function() {

    var server = gls.static('build', PRIMARY_PORT);
    server.start();

    //use gulp.watch to trigger server actions(notify, start or stop)
    gulp.watch(['build/**/*'], function(file) {
        server.notify.apply(server, [file]);
    });
});

/* the real tasks */
gulp.task('default', function() {
    // place code for your default task here
    console.log("fill in this task");
});

gulp.task('build', ['jshint', 'jsonlint', 'copy'])
gulp.task('dev', ['build', 'serve','watch']);