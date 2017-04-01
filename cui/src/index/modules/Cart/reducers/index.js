import { combineReducers } from 'redux';

import ShoppingCart from '../ShoppingCart/reducers/';
import Checkout from '../Checkout/reducers/';

export default combineReducers({
  ShoppingCart,
  Checkout
});
