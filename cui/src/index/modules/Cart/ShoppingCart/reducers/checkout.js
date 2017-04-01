import { fromJS } from 'immutable';
import reducerHandler from 'shared/utils/reducerHandler';

import {
  CHECKOUT_UI_NEEDPAY,
  CHECKOUT_UI_VALIDATION
} from '../consts/actionTypes';

const initialState = fromJS({
  needPay: false,
  validatePass: true,
  needValidate: false
});

const handlers = {

  [CHECKOUT_UI_NEEDPAY](state, { payload: needPay }) {
    return state.withMutations((tempState) => {
      tempState.set('needPay', needPay);
      tempState.set('needValidate', false);
    });
  },

  [CHECKOUT_UI_VALIDATION](state, { payload: { isPass } }) {
    return state.withMutations((tempState) => {
      tempState.set('validatePass', isPass);
      tempState.set('needValidate', true);
    });
  }
};

export default reducerHandler(initialState, handlers);
