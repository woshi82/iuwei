/**
 * networkIndicator reducer
 */
import { NETWORK_INDICATOR } from '../actions/types';

const networkIndicator = (state = false, action) => {
  switch (action.type) {
    case NETWORK_INDICATOR:
      return action.visible;
    default:
      return state;
  }
};

module.exports = {
	networkIndicator: networkIndicator
};
