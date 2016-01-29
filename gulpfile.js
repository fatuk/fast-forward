var gulp = require('gulp'),
	less = require('gulp-less'),
	sourcemaps = require('gulp-sourcemaps'),
	watch = require('gulp-watch'),
	browserSync = require('browser-sync'),
	minifyCSS = require('gulp-minify-css'),
	mainBowerFiles = require('main-bower-files'),
	bowerFiles = mainBowerFiles(),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat'),
	autoprefixer = require('gulp-autoprefixer'),
	rename = require('gulp-rename'),
	plumber = require('gulp-plumber'),
	notify = require('gulp-notify'),
	spritesmith = require('gulp.spritesmith'),
	url = require('url'),
	proxy = require('proxy-middleware'),
	proxyMiddleware = require('http-proxy-middleware'),
	gulpif = require('gulp-if');

/******************************
 * Default task
 ******************************/
gulp.task('default', [
	'copyAssets',
	'copyViews',
	'browser-sync',
	'bower-me',
	'pluginsConcat',
	'jsConcat',
	'sprites',
	'less',
	'watch'
]);

/******************************
 * Build task
 ******************************/
gulp.task('build', [
	'copyAssets',
	'copyViews',
	'bower-me',
	'pluginsConcat',
	'jsConcat',
	'sprites',
	'less-min'
]);

/******************************
 * Bower files task
 ******************************/
gulp.task('bower-me', function () {
	console.info('********** Bower Files **********');
	console.info(bowerFiles);
});

/******************************
 * Sprite
 ******************************/
gulp.task('sprites', function () {
	var spriteData = gulp.src('./assets/img/icons/*.{png, jpg}').pipe(spritesmith({
		imgName: '../img/sprite.png',
		cssName: 'icons.less',
		cssFormat: 'css',
		padding: 3
	}));
	return spriteData
		.pipe(gulpif(
			'*.png',
			gulp.dest('./public/img/')))
		.pipe(gulpif(
			'*.less',
			gulp.dest('./assets/less/')));
});

/******************************
 * Copy assets to public
 ******************************/
gulp.task('copyAssets', function () {
	'use strict';
	gulp.src([
			'assets/**/*.*',
			'!assets/**/*.less',
			'!assets/img/icons/*.png'
		])
		.pipe(gulp.dest('public'));
});

/******************************
 * Copy views to public
 ******************************/
gulp.task('copyViews', function () {
	'use strict';
	gulp.src('app/**/*html')
		.pipe(gulp.dest('public'));
});

/******************************
 * JS plugins
 ******************************/
gulp.task('pluginsConcat', function () {
	gulp.src(bowerFiles)
		.pipe(concat('plugins.min.js'))
		.pipe(uglify({
			mangle: false
		}))
		.pipe(gulp.dest('public/js'));
});

/******************************
 * JS concat
 ******************************/
gulp.task('jsConcat', function () {
	gulp.src(['app/**/*.js'])
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(concat('app.js'))
		.pipe(uglify({
			mangle: false
		}))
		.on('error', notify.onError(function (error) {
			return '\nAn error occurred while uglifying js.\nLook in the console for details.\n' + error;
		}))
		.pipe(sourcemaps.write('../js'))
		.pipe(gulp.dest('public/js'));
});

/******************************
 * Browser sync
 ******************************/
gulp.task('browser-sync', function () {
	var files = [
		'public/**/*.html',
		'public/js/**/*.js',
		'public/css/*.css'
	];

	var address1 = '95.174.97.136:8101',
		address2 = '94.77.148.154:8101',
		address3 = 'site.weezlabs.com:8101',
		address4 = 'lighthouse.weezlabs.com:8101',
		address5 = 'lighthouse-dev.weezlabs.com',
		address6 = '178.76.208.182:8101';

	var serverUrl = 'http://' + address5;
	var proxyOptions = url.parse(serverUrl + '/api/v1');
	proxyOptions.route = '/api/v1';

	var assetsProxyOptions = url.parse(serverUrl + '/Upload');
	assetsProxyOptions.route = '/Upload';

	browserSync.init(files, {
		port: 8010,
		server: {
			baseDir: './public',
			middleware: [proxy(proxyOptions), proxy(assetsProxyOptions)]
		},
		clicks: false,
		forms: false,
		scroll: false,
		open: false
	});
});

/******************************
 * Watch
 ******************************/
gulp.task('watch', function () {
	gulp.watch(['assets/less/**/*.less'], ['less']);
	gulp.watch('app/**/*.js', ['jsConcat']);
	gulp.watch('app/**/*.html', ['copyViews']);
	gulp.watch(['assets/**/*.*', '!assets/less/*.less'], ['copyAssets']);
});

/******************************
 * Less
 ******************************/
gulp.task('less', function () {
	gulp.src(['assets/less/app.less', 'assets/less/ie9.less'])
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(less())
		.on('error', notify.onError(function (error) {
			return '\nAn error occurred while compiling css.\nLook in the console for details.\n' + error;
		}))
		.pipe(autoprefixer({
			browsers: ['last 5 versions'],
			cascade: false
		}))
		.pipe(sourcemaps.write('../css'))
		.pipe(gulp.dest('public/css'));
});

/******************************
 * Less min
 ******************************/
gulp.task('less-min', function () {
	gulp.src(['assets/less/app.less', 'assets/less/ie9.less'])
		.pipe(plumber())
		.pipe(less())
		.on('error', notify.onError(function (error) {
			return '\nAn error occurred while compiling css.\nLook in the console for details.\n' + error;
		}))
		.pipe(autoprefixer({
			browsers: ['last 5 versions'],
			cascade: false
		}))
		.pipe(minifyCSS({
			keepBreaks: false,
			keepSpecialComments: true,
			benchmark: false,
			debug: true
		}))
		.pipe(gulp.dest('public/css'));
});
