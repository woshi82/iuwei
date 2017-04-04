import { put, call, select } from 'redux-saga/effects';
import * as api from '../services';

import {
	user,
	networkIndicator,
} from '../actions';
import { getToken } from '../reducers/account';

/**
 * 请求操作
 * @param {String} token
 * @param {Function} entityAc 请求的action
 * @param {String} url 请求的接口
 * @param {Object} params 请求参数
 */
function* entityHandler(token, entityAc, url, params, cb) {
	const { response, error } = yield call(url, params, token);
	if (response){
		// yield put(user({ user_info: response.data.user_info }));
		// console.log(cb)
		if (cb) {
			yield cb(response);
		} else {
			yield put(entityAc.success());
		}
	} else {
		yield put(entityAc.failure(error));
	}

}


/**
 * 通用请求函数   FIXME: !!登录之后不需要请求token
 * @param {Function} entityAc 请求的action
 * @param {String} url 请求的接口
 * @param {Object} params 请求参数
 */
export function* fetchEntity(entityAc, url, params, cb) {
  // 完整流程需打开
	let token = yield select(getToken);
	yield put(networkIndicator(true));
	if (token && token.access_token) {
		yield entityHandler(token.access_token, entityAc, url, params, cb);
	} else {
		// 请求token
		const tokenData = yield call(api.fetchToken);
		if (tokenData.response) {
			token = tokenData.response.data.access_token;
			yield put(user({ token: tokenData.response.data }));
			yield entityHandler(token, entityAc, url, params, cb);
		} else {
			yield put(entityAc.failure(tokenData.error));
		}
	}
	yield put(networkIndicator(false));
}

/**
 * 判断token是否过期
 */
export const verifyToken = (token) => {
    if (token && token.expires_in > parseInt(new Date().getTime()/1000)){
        return token;
    }
    return null;
};
