import { fromJS } from 'immutable';
import en from 'source/en.js';//eslint-disable-line
import { reducerHandler } from 'react-base-ui/lib/utils';

import {
  SETCURRENTLOCALE
} from '../actions/intl';

const initialState = fromJS({
  currentLocale: 'en',
  defaultLocale: 'en',
  locales: ['en'],
  messages: {
    en
  }
});

const handlers = {

  [SETCURRENTLOCALE](state, { payload: { body } }) {
    return state.set('currentLocale', body);
  }

};

export default reducerHandler(initialState, handlers);
