/*
 * saga 入口文件
 * @Author: zengyanling
 * @Date: 2017-04-03 21:35:01
 * @Last Modified by: zengyanling
 * @Last Modified time: 2017-04-03 22:45:09
 */

import { fork } from 'redux-saga/effects';

// import watchAccount from './account';


export default function* root() {
	yield [
		// fork(watchAccount),
	];
}

