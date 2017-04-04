/**
 * redux store 配置
 */

import { applyMiddleware, createStore, compose } from 'redux';
import { AsyncStorage } from 'react-native';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { persistStore, autoRehydrate } from 'redux-persist';
import reducers from '../reducers';
import createSagaMiddleware from 'redux-saga';
import { sagaMonitor } from 'redux-saga/utils';
import rootSaga from '../sagas';

const isDebuggingInChrome = __DEV__ && !!window.navigator.userAgent;

const logger = createLogger({
  predicate: (getState, action) => isDebuggingInChrome,
  collapsed: true,
  duration: true,
});
// 注入 sagas 监听
const sagaMiddleware = createSagaMiddleware({ sagaMonitor });

const enhancer = compose(
  // autoRehydrate(),
  applyMiddleware(sagaMiddleware, thunk, logger),
);
const store = createStore(
  reducers,
  {},
  enhancer,
);
sagaMiddleware.run(rootSaga);

function configureStore(onComplete) {
  // TODO: 建议开始把redux-persist关闭，因为它会对state进行缓存，可能对于一些state对象调试不是很方便
  persistStore(store, { storage: AsyncStorage }, onComplete);

  if (isDebuggingInChrome) {
    window.store = store;
  }
  return store;
}

module.exports = configureStore;
