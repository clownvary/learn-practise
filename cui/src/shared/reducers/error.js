import {fromJS} from 'immutable';
import reducerHandler from 'shared/utils/reducerHandler';

import {
  ADD_ERROR,
  CLEAR_ERROR
} from '../actions/error';

const initialState = fromJS({
  list: [],
  systemErrors: [],
  businessErrors: []
})

const handlers = {
  [ADD_ERROR](state, {payload}) {
    let list = state.get('list'),
      exist = list.some(item=> {
        return item.code === '0002' || (item.code === payload.code && item.message === payload.message);
      });

    if (exist) {
      return state;
    } else {
      list = list.push({...payload});
      let systemErrors = list.filter((err) => err.isSystemError);
      let businessErrors = list.filter((err) => !err.isSystemError);

      return state.withMutations(s => {
        s.set('list', list);
        s.set('systemErrors', systemErrors);
        s.set('businessErrors', businessErrors);
      })
    }
  },

  [CLEAR_ERROR](state) {
    return state.withMutations(s => {
        s.set('list', fromJS([]));
        s.set('systemErrors', fromJS([]));
        s.set('businessErrors', fromJS([]));
      })
  }
}

export default reducerHandler(initialState, handlers);
