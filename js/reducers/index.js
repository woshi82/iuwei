/**
 * redux reducers 入口文件
 */

import { combineReducers } from 'redux';
import { networkIndicator } from './networkIndicator';
import account from './account';
import { reducer as formReducer } from 'redux-form';

const appReducer = combineReducers({
  networkIndicator,
	account,
  form: formReducer,
});

export default (state, action) => {
  if (action.type === 'LOGOUT') {
    state = undefined;
  }

  return appReducer(state, action);
};
