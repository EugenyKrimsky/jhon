const distFolder = 'dist';
const srcFolder = 'src'

const path = {
  dist: {
    html: `${distFolder}/html`,
    css: `${distFolder}/css/`,
  },
  src: {
    pug: `${srcFolder}/html/pages/*.pug`,
    scss: `${srcFolder}/scss/index.scss`
  },
  watch: { 
    pug: `${srcFolder}/**/.pug`,
    scss: `${srcFolder}/scss/**/*.scss`
  },
  clean: `./${distFolder}/`
}

const {src, dest} = require('gulp');
const gulp = require('gulp');
const browsersync = require('browser-sync').create();

function browserSync(options) {
  return browsersync.init({
    server: {
      baseDir: `./${path.dist.html}/`
    },
    notify: false,
    port: 3000,
  })
}

const pug = require('gulp-pug');

function html() {
  return src(path.src.pug)
    .pipe(pug({
      pretty: true
    }))
    .pipe(dest(path.dist.html))
    .pipe(browsersync.stream())
}

function watchFiles() {
  gulp.watch([path.watch.pug], html)
}

const build = gulp.series(html);
const watch = gulp.parallel(build, watchFiles, browserSync);

exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;