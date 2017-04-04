/**
 * redux reducers 入口文件
 */

import { combineReducers } from 'redux';
import { networkIndicator } from './networkIndicator';
import { default as account } from './account';

const appReducer = combineReducers({
  networkIndicator,
	account,
});

export default (state, action) => {
  if (action.type === 'LOGOUT') {
		console.log(11223);
    state = undefined;
  }

  return appReducer(state, action);
};
