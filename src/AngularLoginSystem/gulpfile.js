'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

gulp.task('styles', function () {
    return gulp.src([
        'app/styles/less/app-green.less',
        'app/styles/less/app-blue.less',
        'app/styles/less/app-red.less',
        'app/styles/less/app-orange.less'
    ])
      .pipe($.plumber())
      .pipe($.less())
      .pipe($.autoprefixer({ browsers: ['last 1 version'] }))
      .pipe(gulp.dest('wwwroot/styles'))
      //.pipe(gulp.dest('app/styles'))
      .pipe(gulp.dest('.tmp/styles'));
});

gulp.task('html', ['styles'], function () {

    gulp.src('app/scripts/**/*.js')
    .pipe(gulp.dest('wwwroot/scripts'));

    var lazypipe = require('lazypipe');
    var cssChannel = lazypipe()
      .pipe($.csso)
      .pipe($.replace, 'bower_components/bootstrap/fonts', 'fonts');

    var assets = $.useref.assets({ searchPath: '{.tmp,app}' });

    return gulp.src('app/**/*.html')
      .pipe(assets)
      //.pipe($.if('*.js', $.ngAnnotate()))
      //.pipe($.if('*.js', $.uglify()))
      .pipe($.if('*.css', cssChannel()))
      .pipe(assets.restore())
      .pipe($.useref())
      //.pipe($.if('*.html', $.minifyHtml({ conditionals: true, loose: true })))
      .pipe(gulp.dest('wwwroot'));


    
});

gulp.task('onlyhtml', function () {
    var lazypipe = require('lazypipe');
    var cssChannel = lazypipe()
      .pipe($.csso)
      .pipe($.replace, 'bower_components/bootstrap/fonts', 'fonts');

    var assets = $.useref.assets({ searchPath: '{.tmp,app}' });

    return gulp.src('app/**/*.html')
      .pipe(assets)
      .pipe($.if('*.js', $.ngAnnotate()))
      .pipe($.if('*.js', $.uglify()))
      .pipe($.if('*.css', cssChannel()))
      .pipe(assets.restore())
      .pipe($.useref())
      .pipe($.if('*.html', $.minifyHtml({ conditionals: true, loose: true })))
      .pipe(gulp.dest('wwwroot'));
});

gulp.task('images', function () {
    return gulp.src('app/images/**/*')
      .pipe(gulp.dest('wwwroot/images'));
});

gulp.task('fonts', function () {
    return gulp.src(require('main-bower-files')().concat('app/styles/fonts/**/*')
      .concat('bower_components/bootstrap/fonts/**'))
      .pipe($.filter('**/*.{eot,svg,ttf,woff,woff2}'))
      .pipe($.flatten())
      .pipe(gulp.dest('wwwroot/fonts'))
      //.pipe(gulp.dest('app/fonts'))
      .pipe(gulp.dest('.tmp/fonts'));
});

gulp.task('builddist', [ 'html', 'images', 'fonts', 'styles'],
  function () {
      return gulp.src('wwwroot/**/*').pipe($.size({ title: 'build', gzip: true }));
  });

gulp.task('builddistsingle',
  function () {
      return gulp.src('wwwroot/**/*').pipe($.size({ title: 'build', gzip: true }));
  });



// inject bower components
gulp.task('wiredep', function () {
    var wiredep = require('wiredep').stream;
    var exclude = [
      'bootstrap',
      'jquery',
      'es5-shim',
      'json3',
      'angular-scenario'
    ];

    gulp.src('app/styles/*.less')
      .pipe(wiredep())
      .pipe(gulp.dest('app/styles'));

    gulp.src('app/*.html')
      .pipe(wiredep({ exclude: exclude }))
      .pipe(gulp.dest('app'));

    gulp.src('test/*.js')
      .pipe(wiredep({ exclude: exclude, devDependencies: true }))
      .pipe(gulp.dest('test'));
});

gulp.task('watch', function () {


    gulp.watch(['app/**/*.html', 'app/scripts/**/*.js'], ['onlyhtml']);
    gulp.watch(['app/images/**/*'], ['images']);
    gulp.watch(['app/styles/**/*.less'], ['styles']);

    // watch for changes
    //gulp.watch([
    //  'app/**/*.html',
    //  '.tmp/styles/**/*.css',
    //  'app/scripts/**/*.js',
    //  'app/images/**/*'
    //], ['builddist']);

    //gulp.watch([
    //  '.tmp/styles/**/*.less'
    //], ['styles']);


});
