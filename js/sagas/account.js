/**
 * saga 用户信息相关
 */

import { put, call, select, takeLatest } from 'redux-saga/effects';
import * as api from '../services';
import { fetchEntity } from './commonHandler';
import {
	LOGINSAGAS,
} from '../actions/types';
import {
	user,
	loginSagasAc,
	// networkIndicator,
} from '../actions';
import {
	getLoginInfo,
} from '../reducers/account';

function* loadLogin() {
	const params = yield select(getLoginInfo);
	yield call(fetchEntity, loginSagasAc, api.fetchLogin, params, function* (response) {
		yield put(user({ isLogin: true, info: response.data.info}));
		yield put(loginSagasAc.success());
	});
}

export default function* watchAccount() {
	yield takeLatest(LOGINSAGAS.REQUEST, loadLogin);
}


