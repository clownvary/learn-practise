import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import middlewares from 'shared/api/middlewares';
import rootReducer from 'index/reducers';

export default (initialState = {}, history) => {
  const middlewareList = [...middlewares, routerMiddleware(history)];
  let middleware = applyMiddleware(...middlewareList);

  if (__DEV__ || __STATIC__) {
    const devTools = window.devToolsExtension ?
      window.devToolsExtension() :
      require('shared/components/DevTools/DevTools').instrument(); // eslint-disable-line global-require
    middleware = compose(middleware, devTools);
  }

  const store = middleware(createStore)(rootReducer, initialState);

  if ((__DEV__ || __STATIC__) && module.hot) {
    module.hot.accept('../reducers', () => {
      store.replaceReducer(require('../reducers')); // eslint-disable-line global-require
    });
  }

  return store;
};
