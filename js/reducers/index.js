/**
 * redux reducers 入口文件
 */

import { combineReducers } from 'redux';
import { networkIndicator } from './networkIndicator';

module.exports = combineReducers({
	networkIndicator: networkIndicator,
});
