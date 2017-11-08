'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    argv = require('yargs').argv,
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    browserify = require('gulp-browserify'),
    wrap = require('gulp-wrap'),
    inject = require('gulp-inject');

var livereload = require('gulp-livereload'), 
    http = require('http'),
    st = require('st');

function logError(error) {
    console.log([ '',
                 '*** AN ERROR SUDDENLY OCCURED ***'.bold.red,
                '' + error.name + ' in ' + error.plugin + ': ',
                 error.message,
                 '*** END OF ERROR *** '.bold.red,
                ].join('\n')
               );
    this.end();
}        

var settings = {
    styles: {
        sourceSass: './app/source/styles/**/*.scss',
        buildCss: './app/build/styles',
        buildOptions: {
            outputStyle: 'compressed',
        }
    },
    scripts: {
        source: './app/source/scripts/**/*.js',
        build: './app/build/scripts',
        browserify: {
            debug: false,            
        }
    },
    htmls: {        
        source: './app/source/views/**/*.html',
        build: './app/build/views',
        layout: './app/source/_layout.html',
    }
};

gulp.task('htmls', function() {
    gulp.src(settings.htmls.source)
    .pipe(wrap({ src: settings.htmls.layout }))
    .pipe(gulp.dest(settings.htmls.build))
    .pipe(livereload());
});

gulp.task('scripts', function() {
    return gulp.src(settings.scripts.source)
    //.pipe(browserify().on('error', logError))    
    .pipe(gulpif(argv.production, uglify()))
    .pipe(gulp.dest(settings.scripts.build))
    .pipe(livereload());
});

gulp.task('sass', function() {
    return gulp.src(settings.styles.sourceSass)
    .pipe(gulpif(!argv.production, sass().on('error', logError)))
    .pipe(gulpif(argv.production, sass(settings.styles.buildOptions.outputStyle).on('error', logError)))
    .pipe(gulp.dest(settings.styles.buildCss))
    .pipe(livereload());
});

gulp.task('server', function(done) {
    http.createServer(st({path: './app/build', index: '_layout.html', cache: false}))
    .listen(8080, done);
});
    
gulp.task('build', ['htmls', 'scripts', 'sass']);
    
gulp.task('start', ['server'], function() {
    livereload.listen({basePath: 'build'});
    gulp.watch(settings.styles.sourceSass, ['sass']);
    gulp.watch(settings.scripts.source, ['scripts']);
    gulp.watch(settings.htmls.source, ['htmls']);
});