var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var shell = require('gulp-shell');
var clean = require('gulp-clean');

//Task to initiate JSdocs
gulp.task('js-doc', shell.task(['jsdoc src/**/**/*']));

// Task to move JSdoc 'out' folder to correct place with new name
gulp.task('default', ['dev','js-doc'], function() {
  gulp.src("./out/**/**/*")
  .pipe(gulp.dest('build/JSdocs'));
});

// Task to remove 'out' folder
gulp.task('default', function () {
    return gulp.src('./out', {read: false})
        .pipe(clean());
});

// Task to run server using gulp
gulp.task('default', function () {
  nodemon({
    script: './src/server.js'
  });
});
