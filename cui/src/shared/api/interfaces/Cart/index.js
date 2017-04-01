import {
  deepMerge
} from "shared/utils/func";
import ShoppingCart from './ShoppingCart';
import Checkout from './Checkout';

const interfaceSimulators = deepMerge(ShoppingCart, Checkout);


export default deepMerge(
  ShoppingCart,
  Checkout
);
