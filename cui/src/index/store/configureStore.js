import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { presetRedux } from 'react-base-ui/lib/middlewares';
import syncSessionMiddleware from 'shared/middlewares/syncSessionMiddleware';
import rootReducer from 'index/reducers';

export default (initialState = {}, history) => {
  const middlewareList = [...presetRedux, syncSessionMiddleware(), routerMiddleware(history)];
  const middleware = applyMiddleware(...middlewareList);

  const store = middleware(createStore)(rootReducer, initialState);

  if ((__DEV__ || __STATIC__) && module.hot) {
    module.hot.accept('../reducers', () => {
      store.replaceReducer(require('../reducers')); // eslint-disable-line global-require
    });
  }

  return store;
};
