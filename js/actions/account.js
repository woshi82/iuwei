/*
 * @Author: zengyanling
 * @Date: 2017-04-04 17:23:48
 * @Last Modified by: zengyanling
 * @Last Modified time: 2017-04-04 18:38:18
 */

import {
	action,
	LOGOUT,
	USER,
	LOGINSAGAS,
} from './types';




export const user = data => action(USER, { ...data });
export const logoutAc = () => action(LOGOUT);

export const loginReduxAc = data => action(USER, { info: {username: data.username} });

export const loginSagasAc = {
	request: data => action(LOGINSAGAS.REQUEST, { ...data }),
	success: () => action(LOGINSAGAS.SUCCESS),
	failure: error => action(LOGINSAGAS.FAILURE, { error }),
};

