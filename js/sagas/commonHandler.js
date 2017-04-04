import { put, call } from 'redux-saga/effects';
import {
	networkIndicator,
} from '../actions';

/**
 * 请求操作
 * @param {Function} entityAc 请求的action
 * @param {String} url 请求的接口
 * @param {Object} params 请求参数
 */
export function* fetchEntity(entityAc, url, params, cb) {
	yield put(networkIndicator(true));
	const { response, error } = yield call(url, params);
	if (response){
		if (cb) {
			yield cb(response);
		} else {
			yield put(entityAc.success());
		}
	} else {
		yield put(entityAc.failure(error));
	}
	yield put(networkIndicator(false));
}

