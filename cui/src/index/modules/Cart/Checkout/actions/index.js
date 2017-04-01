import * as billingAddress from './billingAddress';
import * as orderSummary from './orderSummary';
import * as paymentManager from './paymentManager';

export default {
  ...billingAddress,
  ...orderSummary,
  ...paymentManager
};
