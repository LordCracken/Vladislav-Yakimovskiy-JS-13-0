'use strict';

import '@babel/polyfill';
import 'nodelist-foreach-polyfill';
import 'formdata-polyfill';
import 'es6-promise';
import 'fetch-polyfill';
import 'math-trunc';
import 'dom-node-polyfills';
import elementClosest from 'element-closest';
elementClosest(window);

import countTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import animateScroll from './modules/animateScroll';
import togglePopUp from './modules/togglePopUp';
import tabs from './modules/tabs';
import slider from './modules/slider';
import changeImages from './modules/changeImages';
import calc from './modules/calc';
import calcValidate from './modules/calcValidate';
import sendForm from './modules/sendForm';
import formValidate from './modules/formValidate';

// Таймер
countTimer('17 december 2020');
// Меню
toggleMenu();
// Плавная прокрутка
animateScroll();
// popup
togglePopUp();
// Табы
tabs();
// Слайдер
slider();
// Смена картинок при наведении
changeImages();
// Калькулятор
calc(100);
// Валидация калькулятора
calcValidate();
// send-ajax-form
sendForm();
// Валидация форм
formValidate();
