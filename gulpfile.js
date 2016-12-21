var gulp 	= require('gulp'),
browserSync = require('browser-sync'),
concat 		= require('gulp-concat'),
uglify 		= require('gulp-uglifyjs'),
cssnano 	= require('gulp-cssnano'),
rename 		= require('gulp-rename');
del 		= require('del'),
imagemin	= require('gulp-imagemin'),
pngquant	= require('imagemin-pngquant'),
cache		= require('gulp-cache'),
autoprefixer= require('gulp-autoprefixer'),
upmodul = require("gulp-update-modul"),
less = require('gulp-less');

// UPDATE 
gulp.task('update-modul', function () {
    gulp.src('package.json')
    .pipe(upmodul('latest', 'false')); //update all modules latest version. 
});

//SASS
// gulp.task('sass',function () {
// 	console.log('Hello, I\'m Task!');
// 	return gulp.src('app/sass/**/*.sass')
// 	.pipe(sass({outputStyle: 'extended'}).on('error', sass.logError))
// 	.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'],{cascade: true}))
// 	.pipe(gulp.dest('app/css'))
// 	.pipe(browserSync.reload({stream: true}));
// });

//Browserify
// gulp.task('browserify', function(){
// 	 return gulp.src('app/js/app.js')
// 	 .pipe(browserify())
// 	 .pipe(bundle())
// 	 .pipe(stream('app1.js'))
// 	 .pipe(gulp.dest('app/js'));
// });

// JSX
// gulp.task('jsx', function () {
// 	console.log('jsx');

//    return browserify({entries: 'app/jsx/app.jsx', extensions: ['.jsx'], debug: true})
//          .transform('babelify', {presets: ['es2015', 'react']})
//          .bundle()
//          .pipe(source('app.js'))
//          .pipe(gulp.dest('app/js'))
//          .pipe(browserSync.reload({stream: true}));

// });

//Less
gulp.task('less',function () {
	console.log('Hello, I\'m LessTask!');
	return gulp.src('app/less/**/*.less')
	.pipe(less())
	.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'],{cascade: true}))
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.reload({stream: true}));
});

// SCRIPTS
gulp.task('scripts',function () {
	return gulp.src([
		'app/libs/angular/angular.min.js',
		'app/libs/angular-animate/angular-animate.min.js',
		'app/libs/angular-aria/angular-aria.min.js',
		'app/libs/angular-messages/angular-messages.min.js',
		'app/libs/svg-assets-cache.js/svg-assets-cache.js',
		'app/libs/angular-material/angular-material.min.js'
		])
	.pipe(concat('libs.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('app/js'))
});

//CSS-LIBS
gulp.task('css-libs', ['less'],function () {

	return gulp.src([
		'app/libs/angular-material/angular-material.min.css'
		])
	.pipe(concat('libs.css'))
	.pipe(cssnano())
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('app/css'))
});

//BROWSER-SYNC
gulp.task('browser-sync',function(){
	browserSync({
		browser: ["chrome"],
		server: {
			baseDir:'app',
		},
		notify: false
	});
});

// IMG
gulp.task('img',function(){
 return gulp.src('app/img/**/*')
 .pipe(cache(imagemin({
 	interlaced: true,
 	progressive: true,
 	svgoPlugins: [{removeViewBox: false}],
 	use: [pngquant()]
 })))
 .pipe(gulp.dest('dist/img'));
});

// CLEAN
gulp.task('clean',function () {
	return del.sync('dist');
});

gulp.task('clear-cache',function () {
	return cache.clearAll();
});

//WATCH
gulp.task('watch',['browser-sync','css-libs'],function(){
	gulp.watch('app/less/**/*.less',['less']);
	gulp.watch('app/**/*.html',browserSync.reload);
	gulp.watch('app/js/**/*.js',browserSync.reload);
});

// BUILD
gulp.task('build',['clean', 'img', 'less', 'scripts'],function () {
	var buildCss = gulp.src(['app/css/libs.min.css','app/css/main.css'])
	.pipe(gulp.dest('dist/css'));

	var buildFonts = gulp.src(['app/fonts/**/*'])
	.pipe(gulp.dest('dist/fonts'));

	var buildJs = gulp.src(['app/js/**/*'])
	.pipe(gulp.dest('dist/js'));

	var buildHtml = gulp.src(['app/*.html'])
	.pipe(gulp.dest('dist'));	

});

