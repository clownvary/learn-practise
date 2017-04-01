import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { fromJS } from 'immutable';
import intl from 'shared/reducers/intl';
import loading from 'shared/reducers/loadingBar';
import master from 'index/components/Master/reducers';
import modules from 'index/modules/reducers';

const rootReducer = combineReducers({
  routing: routerReducer,
  currentSite: (state = '') => state,
  systemSettings: (state = {}) => fromJS(state),
  configurations: (state = {}) => fromJS(state),
  intl,
  loading,
  master,
  modules
});

export default rootReducer;
