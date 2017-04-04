/**
 * redux store 配置
 */

import { applyMiddleware, createStore, compose } from 'redux';
import { AsyncStorage } from 'react-native';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { persistStore, autoRehydrate } from 'redux-persist';
import reducers from '../reducers';


const isDebuggingInChrome = __DEV__ && !!window.navigator.userAgent;

const logger = createLogger({
  predicate: (getState, action) => isDebuggingInChrome,
  collapsed: true,
  duration: true,
});

const enhancer = compose(
  autoRehydrate(),
  applyMiddleware(thunk, logger),
);

const store = createStore(
  reducers,
  {},
  enhancer,
);

function configureStore(onComplete) {
  // TODO: 建议开始把redux-persist关闭，因为它会对state进行缓存，可能对于一些state对象调试不是很方便
  persistStore(store, { storage: AsyncStorage }, onComplete);

  if (isDebuggingInChrome) {
    window.store = store;
  }
  return store;
}

module.exports = configureStore;
