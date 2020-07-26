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

togglePopups();
smoothScroll();
showAdditionalPhone();
sendForm();
maskPhone(`[name='phone']`);
formValidate();
servicesListData();
tooltips('.problems-item');
tooltips('.formula-item');
