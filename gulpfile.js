const gulp = require('gulp');
const htmlReplace = require('gulp-html-replace');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');

// Завдання для копіювання HTML файлу та заміни посилання на скрипт
gulp.task('html', () => {
    return gulp.src('index.html')
        .pipe(htmlReplace({
            'js': 'app.min.js'
        }))
        .pipe(gulp.dest('dist'));
});

// Завдання для конкатенації та мініфікації JavaScript файлів
gulp.task('js', () => {
    return gulp.src(['numberToWords.js', 'main.js'])
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(rename('app.min.js'))
        .pipe(gulp.dest('dist'));
});

// Завдання за замовчуванням для запуску обох завдань
gulp.task('default', gulp.parallel('html', 'js'));