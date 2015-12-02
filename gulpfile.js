
// Include Gulp
var gulp = require('gulp');

var seq = require('run-sequence');
var path = require('path');
var rimraf = require('gulp-rimraf');
var sourcemaps = require('gulp-sourcemaps');
var less = require('gulp-less');
var sass = require('gulp-sass');
var cssmin = require('gulp-cssmin');
var merge = require('merge-stream');
var flatten = require('gulp-flatten');
var order = require("gulp-order");
var ngAnnotate  = require('gulp-ng-annotate');
var notify = require('gulp-notify');

// Include plugins
var plugins = require("gulp-load-plugins")({
                pattern: ['gulp-*', 'gulp.*', 'main-bower-files'],
                replaceString: /\bgulp[\-.]/
              });

// Define default destination folder
var dest = 'www/compiled/';

gulp.task('clean', function (cb) {
  return gulp.src(dest).pipe(rimraf());
});

gulp.task('js', function() {
    bower_stream = gulp.src(plugins.mainBowerFiles())
                   .pipe(plugins.filter('*.js'))
                   .pipe(plugins.concat('deps.min.js'))
                   .pipe(plugins.uglify())
                   .pipe(gulp.dest(dest + 'js'));

    custom_stream = gulp.src('www/js/**/*.js')
		    .pipe(order([
		    	"leela.js",
			"views/*.js",
			"app.js",
			"**/*.js"
		    ]))
		    .pipe(flatten())
                    .pipe(plugins.concat('app.min.js'))
		    .pipe(ngAnnotate())
		    .on('error', notify.onError("Error: <%= error.message %>"))
                    .pipe(plugins.uglify())
		    .on('error', notify.onError("Error: <%= error.message %>"))
                    .pipe(gulp.dest(dest + 'js'));

});

gulp.task('css', function() {
    css_stream = gulp.src(plugins.mainBowerFiles())
                          .pipe(plugins.filter('*.css'));

    sass_stream = gulp.src(plugins.mainBowerFiles())
                           .pipe(plugins.filter('*.scss'))
			   .pipe(sass());

    less_stream = gulp.src(plugins.mainBowerFiles())
			   .pipe(plugins.filter('*.less'))
			   .pipe(less());

    custom_stream = gulp.src('www/css/*.css');

    return merge(sass_stream, css_stream, less_stream, custom_stream)
		.pipe(cssmin())
	        .pipe(plugins.concat('app.css.min'))
	        .pipe(gulp.dest(dest + 'css'));
});

gulp.task('fonts', function () {
    return gulp.src('./bower_components/**/*.{eot,svg,ttf,woff,woff2}')
	    .pipe(flatten())
            .pipe(gulp.dest(dest + 'fonts'));
});

gulp.task('default', function(done) {
  var tasks = ['js', 'css', 'fonts'];
  seq('clean', tasks, done);
});
