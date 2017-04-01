import { fromJS } from 'immutable';
import configureStore from 'redux-mock-store';
import middlewares from 'utils/middlewares';
import {
  fetchTransactionsAction,
  deleteTransactionClusterAction
} from 'index/modules/Cart/ShoppingCart/actions/transactions';
import {
  TRANSACTIONS_UI_LIST,
  WAIVERS_UI_LIST,
  CHECKOUT_UI_NEEDPAY
} from 'index/modules/Cart/ShoppingCart/consts/actionTypes';
import
{
  MASTER_UI_SHOPPINGCART_COUNT
} from 'index/components/Master/consts/actionTypes';

describe('index/modules/Cart/ShoppingCart/actions/transactions', () => {
  let store = null;

  beforeEach(() => {
    const mockStore = configureStore(middlewares);
    store = mockStore({
      configurations: fromJS({
        enable_quick_donation_in_cart: true,
        allow_donations_online: true
      }),
      modules: {
        Cart: {
          ShoppingCart: {
            transactions: fromJS({
              participants: fromJS([]),
              orderSummary: null
            })
          }
        }
      }
    });
  });

  afterEach(() => {
    store.clearActions();
  });

  describe('Dispatch Action: fetchTransactionsAction', () => {
    it('Should return TRANSACTIONS_UI_LIST.', (done) => {
      store.dispatch(fetchTransactionsAction()).then(() => {
        expect(store.getActions()[0].type).to.equal(TRANSACTIONS_UI_LIST);
        done();
      });
    });
  });

  describe('Dispatch Action: deleteTransactionClusterAction', () => {
    it('Should return TRANSACTIONS_UI_LIST and WAIVERS_UI_LIST and CHECKOUT_UI_NEEDPAY and MASTER_UI_SHOPPINGCART_COUNT.', (done) => {
      store.dispatch(deleteTransactionClusterAction(1)).then(() => {
        const actions = store.getActions();
        expect(actions[0].type).to.equal(TRANSACTIONS_UI_LIST);
        expect(actions[1].type).to.equal(WAIVERS_UI_LIST);
        expect(actions[2].type).to.equal(CHECKOUT_UI_NEEDPAY);
        expect(actions[3].type).to.equal(MASTER_UI_SHOPPINGCART_COUNT);

        done();
      });
    });
  });
});
