// eslint-disable-next-line strict
'use strict';

import '@babel/polyfill';
import 'element-closest-polyfill';
import 'dom-node-polyfills';
import smoothscroll from 'smoothscroll-polyfill';
smoothscroll.polyfill();

import toggleMenu from './modules/toggleMenu';
import smoothScroll from './modules/smoothScroll';
import maskPhone from './modules/maskPhone';

toggleMenu();
smoothScroll();

maskPhone(`[name='phone']`);
