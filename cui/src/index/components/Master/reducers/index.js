import { fromJS } from 'immutable';
import reducerHandler from 'shared/utils/reducerHandler';

import { MASTER_UI_SHOPPINGCART_COUNT } from '../consts/actionTypes';

const initialState = fromJS({
  cartCount: 0
});

const handlers = {

  [MASTER_UI_SHOPPINGCART_COUNT](state, { payload: cartCount }) {
    return state.withMutations((tempState) => {
      tempState.set('cartCount', cartCount);
    });
  }
};

export default reducerHandler(initialState, handlers);
