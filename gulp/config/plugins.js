import replace from "gulp-replace"; //Поиск и замена
//Помогает обработать возникающие ошибки при работе с тем ИЛИ ИННЫМ ФАЙЛОМ
import plumber from "gulp-plumber";
//уДОБНО ВЫВОДИТЬ СООБЩЕНИЯ ОБ ОШИБКАХ
import notify from "gulp-notify";
import browsersync from "browser-sync"; //Локальный сервер
//Проверка обновлений 
import newer from "gulp-newer";
import ifPlugin from "gulp-if";//Условное ветвление

//Экспортируем объект
export const plugins = {
    replace: replace,
    plumber: plumber,
    notify: notify,
    browsersync: browsersync,
    newer: newer,
    if: ifPlugin
}