const gulp        = require('gulp');
const browserSync = require('browser-sync');
const sass        = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const rename = require("gulp-rename");
const image = require("gulp-image");
const ghPages = require("gulp-gh-pages");

// import imagemin from "gulp-imagemin";
const htmlmin = require('gulp-htmlmin');

gulp.task('server', function() {

    browserSync({
        server: {
            baseDir: "dist"
        }
    });

    gulp.watch("src/*.html").on('change', browserSync.reload);
    // gulp.watch("src/*.html").on('change', browserSync.reload);

});

gulp.task('styles', function() {
    return gulp.src("src/sass/**/*.+(scss|sass)")
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename({suffix: '.min', prefix: ''}))
        .pipe(autoprefixer())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest("dist/css"))
        .pipe(browserSync.stream());
});

gulp.task('watch', function() {
    gulp.watch("src/sass/**/*.+(scss|sass|css)", gulp.parallel('styles'));
    gulp.watch("src/*.html").on('change', gulp.parallel('html'));
    gulp.watch("src/js/**/*.js", gulp.parallel('scripts'));
    gulp.watch("src/icons/**/*.*", gulp.parallel('icons'));
    gulp.watch("src/img/**/*.*", gulp.parallel('images'));
});

gulp.task('html', function() {
    return gulp.src("src/*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("dist/"));
});

gulp.task('scripts', function() {
    return gulp.src("src/js/**/*.js")
    .pipe(gulp.dest("dist/js"));
});

gulp.task('fonts', function() {
    return gulp.src("src/fonts/**/*")
    .pipe(gulp.dest("dist/fonts"));
});
// const imageMin = () => gulp.src("src/img/**/*").pipe(imagemin()).pipe(gulp.dest("dist/img"));
gulp.task('images', function() {
    return gulp.src("src/img/**/*")
    .pipe(image())
    .pipe(gulp.dest("dist/img"));
});

gulp.task('icons', function() {
    return gulp.src("src/icons/**/*")
    .pipe(image())
    .pipe(gulp.dest("dist/icons"));
});

gulp.task('mailer', function() {
    return gulp.src("src/mailer/**/*")
    .pipe(gulp.dest("dist/mailer"));
});

gulp.task('ghDeploy', function() {
    return gulp.src('dist/**/*')
    .pipe(ghPages({
    remoteUrl: 'https://github.com/ivanzayarnuk/Heart-Rate-Monitors.git',
}));
});

gulp.task('default', gulp.parallel('styles', 'scripts', 'fonts', 'icons', 'mailer', 'html','images','server', 'watch'));