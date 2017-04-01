import { fromJS } from 'immutable';
import configureStore from 'redux-mock-store';
import middlewares from 'utils/middlewares';
import * as actions from 'index/components/Master/actions';

describe('index/components/actions/myCart', () => {

  let store = null;

  describe('Dispatch Action(UI): fetchShoppingCartCountActionRaw', () => {
    it('Should return expected Action Object.', () => {
      const { FETCH_SHOPPINGCART_COUNT_SUCCESS, fetchShoppingCartCountActionRaw } = actions;
      expect(fetchShoppingCartCountActionRaw().types[1]).to.equal(FETCH_SHOPPINGCART_COUNT_SUCCESS);
    });
  });

  describe('Dispatch Action(UI): fetchShoppingCartCountAction', () => {
    it('Should return expected Action Object.', () => {
      const mockStore = configureStore(middlewares);
      store = mockStore({
        common: fromJS({
          myCart: fromJS({
            cartCount: 100
          })
        })
      });
      const {
        fetchShoppingCartCountAction,
        FETCH_SHOPPINGCART_COUNT_SUCCESS
      } = actions;

      store.dispatch(fetchShoppingCartCountAction()).then(() => {
        expect(store.getActions()[1].type).to.equal(FETCH_SHOPPINGCART_COUNT_SUCCESS);
      });

    });
  });
});
