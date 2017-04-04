/**
 * saga 用户信息相关
 */

import { put, call, select, takeLatest } from 'redux-saga/effects';
import * as api from '../services';
import { fetchEntity } from './commonHandler';
import {
	LOGIN,
} from '../actions/types';
import {
	user,
	// logout,
	// loginAc,
	networkIndicator,
} from '../actions';
import {
	getLoginInfo,
} from '../reducers/account';

function* loadLogin() {
	const params = yield select(getLoginInfo);
	yield call(fetchEntity, loginAc, api.fetchLogin, params, function* (response) {
		yield put(user({ isLogin: true, info: response.data.info, token: response.data.token }));
		yield put(loginAc.success());
	});
}

export default function* watchAccount() {
	yield takeLatest(LOGIN.REQUEST, loadLogin);
}


