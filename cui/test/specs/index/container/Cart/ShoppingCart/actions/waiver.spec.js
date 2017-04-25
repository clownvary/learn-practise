import { fromJS } from 'immutable';
import configureStore from 'redux-mock-store';
import middlewares from 'utils/middlewares';
import {
  hideWarningAlertAction,
  fetchWaiversAction,
  uiChangeAgreementEntryAction,
  changeAgreementEntryAction
} from 'index/modules/Cart/ShoppingCart/actions/waiver';
import {
  WAIVERS_UI_HIDE_WARNING,
  WAIVERS_UI_AGREEMENT,
  WAIVERS_UI_LIST
} from 'index/modules/Cart/ShoppingCart/consts/actionTypes';

describe('index/modules/Cart/ShoppingCart/actions/waiver', () => {
  let store = null;
  const defaultWaiversAgreements = fromJS({
    final_system_waiver: { required: true, value: false },
    final_initials_waiver: { required: true, value: '' }
  });

  beforeEach(() => {
    const mockStore = configureStore(middlewares);
    store = mockStore({
      modules: {
        Cart: {
          ShoppingCart: {
            waiver: fromJS({
              waivers: null,
              waiversAgreements: defaultWaiversAgreements,
              warningAlertShown: true
            })
          }
        }
      }
    });
  });

  afterEach(() => {
    store.clearActions();
  });

  describe('Dispatch Action(UI): hideWarningAlertAction', () => {
    it('Should return expected Action Object.', () => {
      const expectedAction = {
        type: WAIVERS_UI_HIDE_WARNING
      };
      expect(hideWarningAlertAction()).to.deep.equal(expectedAction);
    });
  });

  describe('Dispatch Action(UI): uiChangeAgreementEntryAction', () => {
    it('Should return expected Action Object.', () => {
      const expectedAction = {
        type: WAIVERS_UI_AGREEMENT,
        payload: {
          id: 1,
          value: 'abc'
        }
      };
      expect(uiChangeAgreementEntryAction({
        id: 1,
        value: 'abc'
      })).to.deep.equal(expectedAction);
    });
  });

  describe('Dispatch Action: changeAgreementEntryAction', () => {
    it('Should return WAIVERS_UI_AGREEMENT.', (done) => {
      store.dispatch(changeAgreementEntryAction()).then(() => {
        expect(store.getActions()[0].type).to.equal(WAIVERS_UI_AGREEMENT);
        done();
      });
    });
  });

  describe('Dispatch Action: fetchWaiversAction', () => {
    it('Should return WAIVERS_UI_LIST.', (done) => {
      store.dispatch(fetchWaiversAction()).then(() => {
        expect(store.getActions()[0].type).to.equal(WAIVERS_UI_LIST);
        done();
      });
    });
  });
});
