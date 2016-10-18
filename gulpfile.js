var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var babel = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('dist', [
    'copy-html',
    'styles',
    'copy-assets',
    'scripts-dist'
]);

gulp.task('serve', ['copy-html', 'styles', 'copy-assets', 'scripts'], function () {
    browserSync.init({
        server: 'dist'
    });

    gulp.watch('scripts/**/*.js', ['scripts-watch']);
    gulp.watch('css/**/*.css', ['styles-watch']);
    gulp.watch('./index.html', ['copy-html']);
    gulp.watch('dist/index.html').on('change', browserSync.reload);
});

gulp.task('copy-html', function () {
    gulp.src('./index.html')
        .pipe(gulp.dest('./dist'))
});

gulp.task('styles', function () {
    gulp.src('css/**/*.css')
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream());
});

gulp.task('copy-assets', function () {
    return gulp.src('assets/**/*')
        .pipe(gulp.dest('dist/assets'))
});

gulp.task('scripts', function () {
    return gulp.src('scripts/**/*.js')
        .pipe(babel())
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist/scripts'));
});

// create a task that ensures the `js` task is complete before
// reloading browsers
gulp.task('scripts-watch', ['scripts'], function (done) {
    browserSync.reload();
    done();
});

// create a task that ensures the `js` task is complete before
// reloading browsers
gulp.task('styles-watch', ['styles'], function (done) {
    browserSync.reload();
    done();
});

gulp.task('scripts-dist', function () {
    gulp.src('scripts/**/*.js')
        .pipe(babel())
        .pipe(sourcemaps.init())
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/scripts'));
});