// eslint-disable-next-line strict
'use strict';

import '@babel/polyfill';
import 'element-closest-polyfill';
import 'dom-node-polyfills';
import smoothscroll from 'smoothscroll-polyfill';
smoothscroll.polyfill();

import togglePopups from './modules/togglePopups';
import smoothScroll from './modules/smoothScroll';
import maskPhone from './modules/maskPhone';
import showAdditionalPhone from './modules/showAdditionalPhone';

togglePopups();
smoothScroll();
showAdditionalPhone();

maskPhone(`[name='phone']`);
