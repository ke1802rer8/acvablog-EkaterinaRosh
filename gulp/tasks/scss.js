import dartSass from 'sass'; //Компилятор
import gulpSass from 'gulp-sass';
import rename from 'gulp-rename';

//Позваляет сжимать файл
import cleanCss from 'gulp-clean-css';
//Позволяет выводить WEBP картинки
import webpcss from 'gulp-webpcss';
//Позволяет делать автоматическую кроссбраузерность
import autoprefixer from 'gulp-autoprefixer';
//Автоматически сгруппирует медиа-запрос
import groupCssMediaQueries from 'gulp-group-css-media-queries';
const sass = gulpSass(dartSass); 


export const scss = () => {
    return app.gulp.src(app.path.src.scss, { sourcemaps: app.isDev })
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "SCSS",
                message: "Error: <%= error.message %>"
            }))
        )
        .pipe(app.plugins.replace(/@img\//g, '../img/'))
        .pipe(sass({
            outputStyle: 'expanded'
        }))
        .pipe(
            app.plugins.if(
                app.isBuild,
                groupCssMediaQueries()
            )
        )
        .pipe(
            app.plugins.if(
                app.isBuild,
                webpcss(
                {
                    webpClass: ".webp",
                    noWebpClass: ".no-webp"
                }
            )  
        ))
        .pipe(
            app.plugins.if(
                app.isBuild,
                autoprefixer(
                {
                    grid: true,//свойства обрабатываются автопреффиксом
                    overrideBrowserslist: ["last 3 version"],
                    cascade: true
                }
            )   
        ))
        //Расскомментировать если нужен не сжатый дубль файла стилей
        .pipe(app.gulp.dest(app.path.build.css))
        .pipe(
            app.plugins.if(
                app.isBuild,
                cleanCss()
            )
        )
        .pipe(rename({
            extname: ".min.css"
        }))
        .pipe(app.gulp.dest(app.path.build.css))
        .pipe(app.plugins.browsersync.stream());
}