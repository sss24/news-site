'use strict';

const  gulp = require(`gulp`),
    sass = require(`gulp-sass`),
    csso = require(`gulp-csso`),
    autoprefixer = require(`gulp-autoprefixer`),
    sourcemaps = require(`gulp-sourcemaps`),
    browserSync = require('browser-sync').create(),
    imagemin = require(`gulp-imagemin`);

gulp.task('images', () =>
    gulp.src('src/static/img/**/*.{png,jpg,svg}')
        .pipe(imagemin([
            imagemin.jpegtran({progressive: 3}),
            imagemin.optipng({optimizationLevel: 3}),
            imagemin.svgo()
        ]))
        .pipe(gulp.dest('build/static/images'))
);

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./build/"
        }
    });
    //browserSync.watch(`build`, browserSync.reload);
});

gulp.task('sass', function() {
    return gulp.src(`src/static/sass/style.scss`)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 8 versions']
        }))
        .pipe(csso())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(`build/static/css/`))
        .on(`end`, browserSync.reload);
});

gulp.task(`index`, function() {
    return gulp.src(`src/*.html`)
        .pipe(gulp.dest(`build/`))
        .on(`end`, browserSync.reload);
});

gulp.task(`js`, function() {
    return gulp.src(`src/static/js/*.js`)
        .pipe(gulp.dest(`build/static/js/`))
        .on(`end`, browserSync.reload);
});

gulp.task(`watch`, function() {
    gulp.watch(`src/index.html`, gulp.series(`index`));
    gulp.watch(`src/static/js/*.js`, gulp.series(`js`));
    gulp.watch(`src/static/sass/**/*.scss`, gulp.series(`sass`));
});

gulp.task(`default`, gulp.series(
    gulp.parallel(`index`, `sass`),
    gulp.parallel(`watch`, `browser-sync`)
));