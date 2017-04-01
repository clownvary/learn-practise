import { createFSA } from 'react-base-ui/lib/utils';
import API from '../api';
import { MASTER_UI_SHOPPINGCART_COUNT } from '../consts/actionTypes';

const updateShoppingCart = createFSA(MASTER_UI_SHOPPINGCART_COUNT);

export const fetchShoppingCartCountAction = () =>
  dispatch => API.getCartCount().then((response) => {
    const { body: { cart_count: cartCount } } = response;
    dispatch(updateShoppingCart(cartCount || 0));
  }
  );

export const commonPageRenderActions = () =>
  dispatch => dispatch(fetchShoppingCartCountAction());

