import { fromJS } from 'immutable';
import { expect } from 'chai';
import configureStore from 'redux-mock-store';

import middlewares from 'utils/middlewares';// eslint-disable-line
import helper from 'utils/testHelper';// eslint-disable-line

import * as actions from 'index/modules/Cart/Checkout/actions/paymentManager';
import * as PaymentTypes from 'index/modules/Cart/Checkout/consts/paymentTypes';
import {
  PAYMENT_UPDATE_CREDIT_CARD_TYPES,
  PAYMENT_UPDATE_SAVED_CREDITCARDS,
  PAYMENT_UPDATE_SAVED_ECHECKS,
  UI_UPDATE_AMS_TOKEN,
  PAYMENT_CHANGE_TYPE,
  UI_UPDATE_AMS_ACCOUNTID,
  SAVE_CREDIT_CARD_SUCCESS,
  PAYMENT_SELECT_ITEM,
  PAYMENT_REGISTER_MODULE
} from 'index/modules/Cart/Checkout/consts/actionTypes';


describe('index/modules/Cart/Checkout/actions/paymentManager', () => {
  let store = null;

  beforeEach(() => {
    const mockStore = configureStore(middlewares);
    store = mockStore({
      configurations: fromJS({
        ams_merchant_name: 'Bill Xiong'
      })
    });
  });

  afterEach(() => {
    store.clearActions();
  });

  describe('Dispatch Action: fetchCreditCardTypesAction', () => {
    it('Should return PAYMENT_UPDATE_CREDIT_CARD_TYPES', (done) => {
      const { fetchCreditCardTypesAction } = actions;
      store.dispatch(fetchCreditCardTypesAction()).then(() => {
        expect(helper.isIncludingByOrder([{
          type: PAYMENT_UPDATE_CREDIT_CARD_TYPES
        }], store.getActions())).to.be.true;
        done();
      });
    });
  });

  describe('Dispatch Action: fetchSavedCreditCardsAction', () => {
    it('Should return PAYMENT_UPDATE_SAVED_CREDITCARDS', (done) => {
      const { fetchSavedCreditCardsAction } = actions;
      store.dispatch(fetchSavedCreditCardsAction()).then(() => {
        expect(helper.isIncludingByOrder([{
          type: PAYMENT_UPDATE_SAVED_CREDITCARDS
        }], store.getActions())).to.be.true;
        done();
      });
    });
  });

  describe('Dispatch Action: fetchSavedEChecksAction', () => {
    it('Should return PAYMENT_UPDATE_SAVED_ECHECKS', (done) => {
      const { fetchSavedEChecksAction } = actions;
      store.dispatch(fetchSavedEChecksAction()).then(() => {
        expect(helper.isIncludingByOrder([{
          type: PAYMENT_UPDATE_SAVED_ECHECKS
        }], store.getActions())).to.be.true;
        done();
      });
    });
  });

  describe('Dispatch Action(UI): registerModuleActoin', () => {
    it('Should return type=PAYMENT_REGISTER_MODULE and expected payload', () => {
      const { registerModuleActoin } = actions;
      const params = ['primaryPayment', [PaymentTypes.CREDIT_CARD, PaymentTypes.ECHECK], PaymentTypes.CREDIT_CARD];
      const expectedPayload = {
        moduleName: 'primaryPayment'
      };
      const { type, payload } = registerModuleActoin(...params)(store.dispatch, store.getState);
      expect(type).to.equal(PAYMENT_REGISTER_MODULE);
      expect(payload.moduleName).to.equal(expectedPayload.moduleName);
    });
  });

  describe('Dispatch Action(UI): changePaymentTypeActoin', () => {
    it('Should return expected Action Object.', () => {
      const { changePaymentTypeActoin } = actions;
      const expectedAction = {
        type: PAYMENT_CHANGE_TYPE,
        payload: {
          moduleName: 'abc',
          typeName: PaymentTypes.CREDIT_CARD
        }
      };
      expect(changePaymentTypeActoin('abc', PaymentTypes.CREDIT_CARD)).to.deep.equal(expectedAction);
    });
  });

  describe('Dispatch Action(UI): selectItemActoin', () => {
    it('Should return expected Action Object.', () => {
      const { selectItemActoin } = actions;
      const expectedAction = {
        type: PAYMENT_SELECT_ITEM,
        payload: {
          moduleName: 'abc',
          typeName: PaymentTypes.CREDIT_CARD,
          payItemId: 1,
          toTop: false
        }
      };
      expect(selectItemActoin('abc', PaymentTypes.CREDIT_CARD, 1)).to.deep.equal(expectedAction);
    });
  });

  describe('Dispatch Action(UI): addTempCreditCardActoin', () => {
    it('Should return expected Action Object.', () => {
      const { addTempCreditCardActoin, PAYMENT_ADD_TEMP_CREDIT_CARD } = actions;
      const expectedAction = {
        type: PAYMENT_ADD_TEMP_CREDIT_CARD,
        payload: {
          payItem: {
            id: 1,
            name: 'test'
          }
        }
      };
      expect(addTempCreditCardActoin({ id: 1, name: 'test' })).to.deep.equal(expectedAction);
    });
  });

  const {
    addCreditCardAction,
    addPayItemActoin
  } = actions;

  const normalPayItemInfo = {
    ccNumber: '4111111111111111',
    ccExpiryYear: '11',
    ccExpiryMonth: '2017',
    ccCVVandCVC: '321',
    ccSaveForFurture: true,
    ccCardTypes: fromJS([{
      id: 11,
      card_type: 'Visa',
      selected: false,
      card_type_id: 1
    }, {
      id: 2,
      card_type: 'JCB',
      selected: false,
      card_type_id: 6
    }]),
    ccCardTypeItem: fromJS({
      id: 11,
      card_type: 'Visa',
      selected: false,
      card_type_id: 1
    })
  };

  describe('Dispatch Action: addCreditCardAction', () => {
    it('Should return expected Action Object if ccSaveForFurture is true.', (done) => {
      store.dispatch(addCreditCardAction('primeryPayment', normalPayItemInfo)).then(() => {
        expect(helper.isIncludingByOrder([
          { type: UI_UPDATE_AMS_TOKEN },
          { type: UI_UPDATE_AMS_ACCOUNTID },
          { type: SAVE_CREDIT_CARD_SUCCESS },
          { type: PAYMENT_UPDATE_SAVED_CREDITCARDS }
        ], store.getActions())).to.be.true;
        done();
      });
    });

    it('Should return expected Action Object if ccSaveForFurture is false.', (done) => {
      store.dispatch(addCreditCardAction('primeryPayment', {
        ...normalPayItemInfo,
        ...{ ccSaveForFurture: false }
      })).then(() => {
        expect(helper.isIncludingByOrder([
          { type: UI_UPDATE_AMS_TOKEN },
          { type: UI_UPDATE_AMS_ACCOUNTID }
        ], store.getActions())).to.be.true;
        done();
      });
    });
  });

  describe('Dispatch Action: addPayItemActoin', () => {
    it('Should return expected Action Object if ccSaveForFurture is true.', (done) => {
      store.dispatch(addPayItemActoin('primeryPayment', PaymentTypes.CREDIT_CARD, normalPayItemInfo)).then(() => {
        expect(helper.isIncludingByOrder([
          { type: UI_UPDATE_AMS_TOKEN },
          { type: UI_UPDATE_AMS_ACCOUNTID },
          { type: SAVE_CREDIT_CARD_SUCCESS },
          { type: PAYMENT_UPDATE_SAVED_CREDITCARDS }
        ], store.getActions())).to.be.true;
        done();
      });
    });

    it('Should return expected Action Object if ccSaveForFurture is false.', (done) => {
      store.dispatch(addPayItemActoin('primeryPayment', PaymentTypes.CREDIT_CARD, {
        ...normalPayItemInfo,
        ...{ ccSaveForFurture: false }
      })).then(() => {
        expect(helper.isIncludingByOrder([
          { type: UI_UPDATE_AMS_TOKEN },
          { type: UI_UPDATE_AMS_ACCOUNTID }
        ], store.getActions())).to.be.true;
        done();
      });
    });
  });
});
