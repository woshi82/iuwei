/*
 * @Author: zengyanling
 * @Date: 2017-04-04 17:28:27
 * @Last Modified by: zengyanling
 * @Last Modified time: 2017-04-06 21:54:43
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
		if (!!action.username){
			return {
				isLogin: true,
				info: {
					username: action.username,
				}
			}
		}
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

    // console.log(data)
    return {
      ...state,
      ...data,
    };
	}
	return state;
};


export default combineReducers({
	user,
	login: commonRequest(LOGINSAGAS),
});

export function getLoginInfo(state) {
  return {
    username: state.account.login.username,
  };
}


// function m1(store){
// 	const next = store.dispatch;
// 	store.dispatch = function(action) {
// 		console.log('m1 begin');
// 		next(action);
// 		console.log('m1 end');
// 	}
// }


// function m2(store){
// 	const next = store.dispatch;
// 	store.dispatch = function(action) {
// 		console.log('m2 begin');
// 		next(action);
// 		console.log('m2 end');
// 	}
// }

// m2(store);
// m1(store);
// store.dispatch('EE');


// function m2(store){
// 	const next = function(action) {
// 		console.log('m1 begin');
// 		store.dispatch(action);
// 		console.log('m1 end');
// 	};
// 	store.dispatch = function(action) {
// 		console.log('m2 begin');
// 		next(action);
// 		console.log('m2 end');
// 	}
// }
// function n1(store){
// 	const next = store.dispatch;
// 	return function(action) {
// 		console.log('n1 begin');
// 		next(action);
// 		console.log('n1 end');
// 	}	
// }
// function n2(store){
// 	const next = store.dispatch;
// 	return function(action) {
// 		console.log('n2 begin');
// 		next(action);
// 		console.log('n2 end');
// 	}	
// }

// function applyMiddlewareByMonkeypatching(store, middlewares) {
//   middlewares = middlewares.slice()
//   middlewares.reverse()

//   // 在每一个 middleware 中变换 dispatch 方法。
//   middlewares.forEach(middleware =>
//     store.dispatch = middleware(store)
//   )
// }
// applyMiddlewareByMonkeypatching(store, n1, n2)
// store.dispatch('EE');

// store.dispatch = m2(store){
// 	const next = store.dispatch;
// 	return function(action) {
// 		console.log('m2 begin');
// 		next(action);
// 		console.log('m2 end');
// 	}	
// }

// function m1(store){
// 	const next = m2(store);
// 	return function(action) {
// 		console.log('m1 begin');
// 		next(action);
// 		console.log('m1 end');
// 	}	
// }





m1(store);
m2(store);

store.dispatch('EE');