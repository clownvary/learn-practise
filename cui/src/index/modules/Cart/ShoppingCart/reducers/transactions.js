import { fromJS } from 'immutable';
import { reducerHandler } from 'react-base-ui/lib/utils';
import {
  TRANSACTIONS_UI_LIST
} from '../consts/actionTypes';

const initialState = fromJS({
  participants: fromJS([]),
  orderSummary: null
});

const handlers = {

  [TRANSACTIONS_UI_LIST](state, {
    payload: { participants, orderSummary }
  }) {
    return state.withMutations((s) => {
      s.set('participants', fromJS(participants));
      s.set('orderSummary', fromJS(orderSummary));
    });
  }
};

export default reducerHandler(initialState, handlers);
