var gulp = require('gulp');
var gutil = require('gulp-util');
var jshint = require('gulp-jshint');

gulp.task('default', function () {

});

gulp.task('lint', function () {
    gulp.src('./*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});
