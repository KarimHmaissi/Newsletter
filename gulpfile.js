/*!
 * gulp
 * $ npm install gulp-ruby-sass gulp-autoprefixer gulp-minify-css gulp-jshint gulp-concat gulp-uglify gulp-imagemin gulp-notify gulp-rename gulp-livereload gulp-cache del --save-dev
 */

// Load plugins
var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    // jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    del = require('del'),
    uncss = require('gulp-uncss');

// var minifyHTML = require('gulp-minify-html');

// Styles
gulp.task('styles', function() {
  return gulp.src(['src/css/bootstrap.min.css',
    'src/css/font-aisconverse.css',
    'src/css/font-awesome.css',
    'src/css/style.css'
    ])
    .pipe(autoprefixer('last 2 version'))
    // .pipe(concat('stylesMaster.css'))
    // .pipe(gulp.dest('public/stylesheets'))
    .pipe(concat('stylesMaster.min.css'))
    .pipe(uncss({
        html: ['index.html', 'contact.html']
    }))
    // .pipe(rename({ suffix: '.min' }))
    .pipe(minifycss())
    .pipe(gulp.dest('public/css'))
    .pipe(notify({ message: 'Styles task complete' }));
});

// Scripts
gulp.task('scripts', function() {
  return gulp.src(['src/js/jquery-2.1.1.min.js',
      'src/js/jquery.plugins.js',
      'src/js/bootstrap.min.js',
      'src/js/custom.js'
    ])
    // .pipe(jshint('.jshintrc'))
    // .pipe(jshint.reporter('default'))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('public/js'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest('public/js'))
    .pipe(notify({ message: 'Scripts task complete' }));
});

// Images
gulp.task('images', function() {
  return gulp.src('src/images/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('public/images'))
    .pipe(notify({ message: 'Images task complete' }));
});

// Clean
// gulp.task('clean', function(cb) {
//     del(['public/assets/css', 'public/assets/js', 'public/assets/img'], cb)
// });

// Default task
gulp.task('default', function() {
    gulp.start('styles', 'scripts', 'images');
});

