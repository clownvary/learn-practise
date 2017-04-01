import { combineReducers } from 'redux';

import paymentManager from './paymentManager';
import billingAddress from './billingAddress';
import orderSummary from './orderSummary';

export default combineReducers({
  paymentManager,
  billingAddress,
  orderSummary
});
