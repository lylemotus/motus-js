var gulp = require("gulp");
var babel = require("gulp-babel");
var watch = require('gulp-watch');
var polyfiller = require('gulp-polyfiller');


gulp.task("default", function () {
    return watch("index.js")
        .pipe(babel())
        .pipe(polyfiller(['Promise', 'Fetch']))
        .pipe(gulp.dest("dist/"));
});