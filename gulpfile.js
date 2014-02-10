var gulp = require('gulp');
var gutil = require('gulp-util');
var jshint = require('gulp-jshint');
var jasmine = require('gulp-jasmine');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

gulp.task('default', function () {

});

gulp.task('lint', function () {
    gulp.src('./*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('test', function () {
    gulp.src('test.js')
        .pipe(jasmine());
});

gulp.task('uglify', function () {
    gulp.src('lambada.js')
        .pipe(uglify())
        .pipe(rename('lambada.min.js'))
        .pipe(gulp.dest('.'));
});
