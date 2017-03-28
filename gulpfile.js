/*
	1. Install Dependencies 
		1. gulp - npm install gulp --save-dev
		2. sass - npm install gulp-sass --save-dev
		3. compass - npm install gulp-compass -save-dev
	2. Init Variables needed
		1. gulp
		2. sass
		3. global
	3. Compose Gulp task
		1. Declare task name
		2. Source files to run
*/

const gulp = require('gulp');
const sass = require('gulp-sass');
const compass = require('gulp-compass');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const cleanCSS = require('gulp-clean-css');
const paths = {
    styles: {
	    config: './config.rb',
        css: 'stylesheets',
        sass: 'sass',
        dist: 'dist',
        watch: 'sass/**/*.+(sass|scss)'
    }
}

//begin gulp taks
gulp.task('browserSync', function(){
	browserSync.init({
		server: {
			baseDir: './'
		}
	})
});

gulp.task('copyHtml', function() {
  // copy any html files in source/ to dist/
  return gulp.src('*.html')
  .pipe(gulp.dest('dist'));
});

gulp.task('copyJs', function(){
	return gulp.src('js/*.js')
	.pipe(gulp.dest('dist/js'));
});

//gulp task for compass conversion
gulp.task('compass', function(){
	return gulp.src(paths.styles.watch) //get scss/sass extension
	.pipe(compass({
	  //load the ruby compass config **IMPORTANT**
      config_file: paths.styles.config,
      css: paths.styles.css,http://localhost:3000/#
      sass: paths.styles.sass
    }))
    .pipe(autoprefixer('last 2 versions', 'safari 5', 'ie 7', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .on('error', function (err) { 
	    console.log(err.message) 
	    }) //gulp error log
	.pipe(gulp.dest('dist/stylesheets')) //outputs the files in the folder of choice
	.pipe(cleanCSS())
	.pipe(gulp.dest('dist/stylesheets'))
	.pipe(browserSync.reload({ //browserSync autoreload on change
		stream: true
	}))
});



//create watch method for gulp 
// SAMPLE METHOD - gulp.watch('files-to-watch', ['tasks', 'to', 'run']);
gulp.task('watch', ['browserSync', 'copyHtml', 'copyJs', 'compass'], function(){
	gulp.watch(paths.styles.watch, ['compass'])
	.on('change', function(evt) {
        console.log(
            '[watcher] File ' + evt.path.replace(/.*(?=sass)/,'') + ' was ' + evt.type + ', compiling...'
        );
    });
	
});
