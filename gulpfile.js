
// Include Gulp
var gulp = require('gulp');

var seq = require('run-sequence');
var path = require('path');
var rimraf = require('gulp-rimraf');
var sourcemaps = require('gulp-sourcemaps');
var less = require('gulp-less');

// Include plugins
var plugins = require("gulp-load-plugins")({
                pattern: ['gulp-*', 'gulp.*', 'main-bower-files'],
                replaceString: /\bgulp[\-.]/
              });

// Define default destination folder
var dest = 'www/';

gulp.task('clean', function (cb) {
  return gulp.src([
        path.join(dest, 'js/modules.min.js'),
        path.join(dest, 'css/modules.css'),
      ], { read: false })
     .pipe(rimraf());
});

gulp.task('js', function() {
    gulp.src(plugins.mainBowerFiles())
                .pipe(plugins.filter('*.js'))
                .pipe(plugins.concat('modules.min.js'))
                .pipe(plugins.uglify())
                .pipe(gulp.dest(dest + 'js'));
});

gulp.task('css', function() {
    gulp.src(plugins.mainBowerFiles())
                .pipe(plugins.filter('*.css'))
                .pipe(plugins.concat('modules.css'))
                .pipe(plugins.uglify())
                .pipe(gulp.dest(dest + 'css'));
});


gulp.task("less", function(){
    return gulp.src(plugins.mainBowerFiles())
            .pipe(sourcemaps.init())
            .pipe(plugins.filter('*.less'))
            .pipe(less())
            .pipe(plugins.concat("modules.less.css"))
            .pipe(sourcemaps.write())
            .pipe(gulp.dest(dest + 'css'));
});

gulp.task('default', function(done) {
  var tasks = ['js', 'less', 'css'];
  seq('clean', tasks, done);
});
