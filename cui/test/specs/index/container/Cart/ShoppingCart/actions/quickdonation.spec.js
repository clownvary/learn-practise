import { fromJS } from 'immutable';
import configureStore from 'redux-mock-store';
import middlewares from 'utils/middlewares';
import {
  submitQuickDonationAction,
  changeAmountAction,
  changeCampaignAction,
  fetchQuickDonationAction
} from 'index/modules/Cart/ShoppingCart/actions/quickdonation';
import {
  TRANSACTIONS_UI_LIST,
  WAIVERS_UI_LIST,
  DONATIONS_UI_LIST,
  DONATIONS_UI_AMOUNT,
  DONATIONS_UI_CAMPAIGN,
  CHECKOUT_UI_NEEDPAY
} from 'index/modules/Cart/ShoppingCart/consts/actionTypes';
import
{
  MASTER_UI_SHOPPINGCART_COUNT
} from 'index/components/Master/consts/actionTypes';


describe('index/modules/Cart/ShoppingCart/actions/quickdonation', () => {
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
            quickdonation: fromJS({
              amount: 1,
              selectedCampaignValue: 1
            })
          }
        }
      }
    });
  });

  afterEach(() => {
    store.clearActions();
  });

  describe('Dispatch Action(UI): changeAmountAction', () => {
    it('Should return expected Action Object.', () => {
      const expectedAction = {
        type: DONATIONS_UI_AMOUNT,
        payload: 1
      };
      expect(changeAmountAction(1)).to.deep.equal(expectedAction);
    });
  });

  describe('Dispatch Action(UI): changeCampaignAction', () => {
    it('Should return expected Action Object.', () => {
      const expectedAction = {
        type: DONATIONS_UI_CAMPAIGN,
        payload: 1
      };
      expect(changeCampaignAction(1)).to.deep.equal(expectedAction);
    });
  });

  describe('Dispatch Action: fetchQuickDonationAction', () => {
    it(`Should return DONATIONS_UI_LIST if enable_quick_donation_in_cart
    and allow_donations_online to be true`, (done) => {
      store.dispatch(fetchQuickDonationAction()).then(() => {
        expect(store.getActions()[0].type).to.equal(DONATIONS_UI_LIST);
        done();
      });
    });
    it('Should return false if enable_quick_donation_in_cart to be false', () => {
      const mockStore = configureStore(middlewares);
      store = mockStore({
        configurations: fromJS({
          enable_quick_donation_in_cart: false,
          allow_donations_online: true
        })
      });
      expect(store.dispatch(fetchQuickDonationAction())).to.equal(false);
    });
    it('Should return false if allow_donations_online to be false', () => {
      const mockStore = configureStore(middlewares);
      store = mockStore({
        configurations: fromJS({
          enable_quick_donation_in_cart: true,
          allow_donations_online: false
        })
      });
      expect(store.dispatch(fetchQuickDonationAction())).to.equal(false);
    });
  });

  describe('Dispatch Action: submitQuickDonationAction', () => {
    it('Should return SUBMIT_DONATION_SUCCESS, TRANSACTIONS_UI_LIST, WAIVERS_UI_LIST, DONATIONS_UI_AMOUNT, DONATIONS_UI_CAMPAIGN', (done) => {
      store.dispatch(submitQuickDonationAction()).then(() => {
        expect(store.getActions()[0].type).to.equal(TRANSACTIONS_UI_LIST);
        expect(store.getActions()[1].type).to.equal(WAIVERS_UI_LIST);
        expect(store.getActions()[2].type).to.equal(DONATIONS_UI_AMOUNT);
        expect(store.getActions()[3].type).to.equal(DONATIONS_UI_CAMPAIGN);
        expect(store.getActions()[4].type).to.equal(CHECKOUT_UI_NEEDPAY);
        expect(store.getActions()[5].type).to.equal(MASTER_UI_SHOPPINGCART_COUNT);
        done();
      });
    });
  });
});
