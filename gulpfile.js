const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync');
const cleanCSS = require('gulp-clean-css');

// scss to css
function style() {
    return gulp.src('./scss/**/*.scss') // path to main scss file
        .pipe(sass().on('error', sass.logError)) // pass file through compiler
        .pipe(gulp.dest('./css')) // destination for compiled css
        .pipe(browserSync.stream());
}

function minify() {
    return gulp.src('./css/**/*.css')
        .pipe(cleanCSS())
        .pipe(gulp.dest('./css/dist'));
}

function watch() {
    browserSync.init({
        server: {
            baseDir: './'
        }
    })
    gulp.watch('./scss/**/*.scss', style);
    gulp.watch('./*.html').on('change', browserSync.reload);
    gulp.watch('./js/**/*.js').on('change', browserSync.reload);
}

exports.style = style;
exports.minify = minify;
exports.watch = watch;
