'use strict';

import {fromJS} from "immutable";
import reducerHandler from 'shared/utils/reducerHandler';

import {
  FETCH_AUTHORITIES,
  FETCH_AUTHORITIES_SUCESS,
  FETCH_AUTHORITIES_FAILURE
} from "../actions/authority";

const initialState = fromJS({
  authorities: []
})

const handlers = {
  [FETCH_AUTHORITIES_SUCESS](state, {payload}) {
    return state.set('authorities', fromJS(payload.body.authorities));
  },

  [FETCH_AUTHORITIES_FAILURE](state) {
    return state;
  }
}

export default reducerHandler(initialState, handlers);
