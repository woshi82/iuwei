/*
 * @Author: zengyanling 
 * @Date: 2017-04-03 21:29:08 
 * @Last Modified by: zengyanling
 * @Last Modified time: 2017-04-04 18:33:50
 */

const REQUEST = 'REQUEST';
const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';

function createRequestTypes(base) {
	return [REQUEST, SUCCESS, FAILURE].reduce((acc, type) => {
		acc[type] = `${base}_${type}`;
		return acc;
	}, {});
}

export const action = (type, payload = {}) => {
	return { type, ...payload };
};

export const NETWORK_INDICATOR = 'NETWORK_INDICATOR';

export const USER = 'USER';

export const LOGOUT = 'LOGOUT';

export const LOGINSAGAS = createRequestTypes('LOGINSAGAS');
