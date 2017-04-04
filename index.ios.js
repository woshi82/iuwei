/*
 * @Author: zengyanling 
 * @Date: 2017-04-03 21:22:04 
 * @Last Modified by: zengyanling
 * @Last Modified time: 2017-04-03 21:23:23
 */

// 为了低版本 webkit引擎下 有些方法不能正确编译 出现 redux-form 'undefined is not a function' 的错误
import 'core-js/es6/symbol';
import 'core-js/es6/array';

import {
  AppRegistry,
} from 'react-native';
import setup from './js/setup';

AppRegistry.registerComponent('iuwei', () => setup);
