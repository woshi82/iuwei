/*
 * @Author: zengyanling
 * @Date: 2017-04-04 17:28:27
 * @Last Modified by: zengyanling
 * @Last Modified time: 2017-04-04 22:16:53
 */
import { combineReducers } from 'redux';
import { commonRequest } from './commonHandler';
import {
	USER,
	LOGINSAGAS,
} from '../actions/types';


const initialUserState = {
	isLogin: false,
	info: {
    username: '游客',
  },
	token: {},
};

const user = (state = initialUserState, action) => {
	if (action.type === USER){
		// 如果 isLogin 为false，则清除数据，返回默认值
		if (typeof action.isLogin === 'boolean' && !action.isLogin){
			return initialUserState;
		}
    const data = {};
		// 只改变某些字段需要的处理
		if (action.info){
			data.info = { ...state.info, ...action.info };
		}
    action.isLogin && (data.isLogin = action.isLogin);

    console.log(data)
    return {
      ...state,
      ...data,
    };
	}
	return state;
};


export default combineReducers({
	user,
	loginSagas: commonRequest(LOGINSAGAS),
});

export function getLoginInfo(state) {
  return {
    username: state.account.loginSagas.username,
  };
}
