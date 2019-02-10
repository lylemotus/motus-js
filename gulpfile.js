const gulp = require('gulp')
const rename = require('gulp-rename')
const uglify = require('gulp-uglify')
const watch = require('gulp-watch');
const concat = require('gulp-concat')

gulp.task('debug', function () {
    // Callback mode, useful if any plugin in the pipeline depends on the `end`/`flush` event
    return watch('motustracker.dev.js', function () {
       gulp.src([
            'node_modules/js-cookie/src/*.js',
            'motustracker.dev.js',
        ], { sourcemaps: true })
        .pipe(concat('motustracker.js'))
        .pipe(rename({suffix: '.debug'}))
        .pipe(gulp.dest('.', { sourcemaps: true }))
    });
});

gulp.task('minify', function () {
    // Callback mode, useful if any plugin in the pipeline depends on the `end`/`flush` event
    return gulp.src([
            'node_modules/js-cookie/src/*.js',
            'motustracker.dev.js',
        ])
        .pipe(concat('motustracker.js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('.'))
});

gulp.task('default', gulp.series('minify', function (done) { done() }))