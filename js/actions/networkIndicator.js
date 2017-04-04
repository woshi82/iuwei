/*
 * @Author: zengyanling 
 * @Date: 2017-04-03 21:29:46 
 * @Last Modified by: zengyanling
 * @Last Modified time: 2017-04-03 22:59:24
 */

import { NETWORK_INDICATOR } from './types';
const networkIndicator = visible => ({
  type: 'NETWORK_INDICATOR',
  visible
});

module.exports = {
	networkIndicator: networkIndicator
};
