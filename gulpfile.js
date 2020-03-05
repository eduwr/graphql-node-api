/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
const { watch, series, dest, src } = require('gulp');
const clean = require('gulp-clean');
const ts = require('gulp-typescript');

const tsProject = ts.createProject('tsconfig.json');

function scripts() {
    const tsResult = tsProject.src().pipe(tsProject());

    return tsResult.js.pipe(dest('dist'));
}

function static() {
    return src(['src/**/*.json']).pipe(dest('dist'));
}

function clear() {
    return src('dist', { allowEmpty: true }).pipe(clean());
}

function watcher() {
    return watch(['src/**/*.ts', 'src/**/*.json'], series(clear, static, scripts));
}

exports.default = watcher;
