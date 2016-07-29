var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var browserSync = require('browser-sync').create();

var paths = {
    scripts: [
        'app/components/**/*.js',
        '!app/components/**/*test.js',
        '!app/**/*test.js',
        'app/view*/*.js',
        'app/search/*.js',
        'app/artist/*.js',
        'app/app.js'
    ]
};

gulp.task('scripts', function () {
    return gulp.src(paths.scripts)
        .pipe(uglify())
        .pipe(concat('all.min.js'))
        .pipe(gulp.dest('build/js'));
});

gulp.task('lint', function() {
    return gulp.src(paths.scripts)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('verify', function() {
    gulp.watch(paths.scripts, ['lint']);
});

// process JS files and return the stream.
gulp.task('js', function () {
    return gulp.src('js/*js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});
