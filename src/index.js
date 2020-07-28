// eslint-disable-next-line strict
'use strict';

import '@babel/polyfill';
import 'element-closest-polyfill';
import 'dom-node-polyfills';
import smoothscroll from 'smoothscroll-polyfill';
smoothscroll.polyfill();
import 'nodelist-foreach-polyfill';
import 'formdata-polyfill';
import 'es6-promise';
import 'fetch-polyfill';

import togglePopups from './modules/togglePopups';
import smoothScroll from './modules/smoothScroll';
import maskPhone from './modules/maskPhone';
import showAdditionalPhone from './modules/showAdditionalPhone';
import sendForm from './modules/sendForm';
import formValidate from './modules/formValidate';
import servicesListData from './modules/servicesListData';
import tooltips from './modules/tooltips';
// import Slider from './modules/slider';
import CarouselSlider from './modules/carouselSlider';
import accordeon from './modules/accordeon';

togglePopups();
smoothScroll();
showAdditionalPhone();
sendForm();
maskPhone(`[name='phone']`);
formValidate();
servicesListData();
tooltips('.problems-item');
tooltips('.formula-item');
accordeon();

// const formulaSlider = new Slider('.formula-slider', '.formula-slider__slide', '#formula-arrow_left', '#formula-arrow_right', 'active-item');
// formulaSlider.init();

const formulaSlider = new CarouselSlider({
  main: '.formula-slider-wrap',
  wrap: '.formula-slider',
  prev: '#formula-arrow_left',
  activeClass: '.active-item',
  next: '#formula-arrow_right',
  infinity: true
});
formulaSlider.init();

const problemsSlider = new CarouselSlider({
  main: '.problems-slider-wrap',
  wrap: '.problems-slider',
  prev: '#problems-arrow_left',
  activeClass: '.active-item',
  next: '#problems-arrow_right',
  infinity: true
});
problemsSlider.init();

const reviewsSlider = new CarouselSlider({
  main: '.reviews-slider-wrap',
  wrap: '.reviews-slider',
  prev: '#reviews-arrow_left',
  next: '#reviews-arrow_right',
  activeClass: '.active-item',
  infinity: true,
  slidesToShow: 1
});
reviewsSlider.init();

const partnersSlider = new CarouselSlider({
  main: '.partners .wrapper',
  wrap: '.partners-slider',
  prev: '#partners-arrow_left',
  next: '#partners-arrow_right',
  activeClass: '.active-item',
  infinity: true,
  slidesToShow: 2
});
partnersSlider.init();
