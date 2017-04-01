import {fromJS} from "immutable";
import reducerHandler from 'shared/utils/reducerHandler';

import {
  FETCH_RUNNINGCART,
  FETCH_RUNNINGCART_SUCCESS,
  FETCH_RUNNINGCART_FAILURE
} from "../actions/runningCart";

const initialState = fromJS({
  totalAmount: null,
  cartList: [],
  cartLoading: false,
  error: false
});

const handlers = {

  [FETCH_RUNNINGCART](state, {}) {
    return state.withMutations(s => {
      s.set('cartLoading', true);
    });
  },

  [FETCH_RUNNINGCART_SUCCESS](state, {payload: {body: data}}) {

    let totalAmount = 0;

    if (data || data.running_cart) {

      data.running_cart.forEach((list) => {
        totalAmount += list.reservation_fee;
      });

      return state.withMutations(s => {
        s.set('cartList', fromJS(data.running_cart));
        s.set('totalAmount', totalAmount);
        s.set('cartLoading', false);
        s.set('error', false);
      });
    } else {
      return state;
    }

  },

  [FETCH_RUNNINGCART_FAILURE](state, {error}) {

    return state.withMutations(s => {
      s.set('cartLoading', false);
      s.set('error', error);
    })
  }
};

export default reducerHandler(initialState, handlers);
