import { expect } from 'chai';
import { fromJS } from 'immutable';
import configureStore from 'redux-mock-store';
import _ from 'lodash';

import middlewares from 'utils/middlewares';
import helper from 'utils/testHelper';

import * as billingAddressActions from 'index/modules/Cart/Checkout/actions/billingAddress';
import {
  billingAddressFormFields as fields,
  formModes,
  actionTypes
} from 'index/modules/Cart/Checkout/consts';


describe('index/modules/Cart/Checkout/actions/billingAddress', () => {
  let store = null;

  beforeEach(() => {
    const mockStore = configureStore(middlewares);
    store = mockStore({});
  });

  afterEach(() => {
    store.clearActions();
  });

  it('onCreateBillingAddressAction should works fine', (done) => {
    const {
      onCreateBillingAddressAction
    } = billingAddressActions;

    store.dispatch(onCreateBillingAddressAction());
    const actions = store.getActions();

    expect(actions).to.have.lengthOf(1);
    console.log(actions);
    expect(helper.isIncludingByOrder([{
      type: actionTypes.BILLINGADDRESS_ON_CREATE
    }], actions)).to.be.true;

    done();
  });

  it('onUpdateBillingAddressAction should works fine', (done) => {
    const {
      onUpdateBillingAddressAction
    } = billingAddressActions;

    store.dispatch(onUpdateBillingAddressAction());
    const actions = store.getActions();

    expect(actions).to.have.lengthOf(1);

    expect(helper.isIncludingByOrder([{
      type: actionTypes.BILLINGADDRESS_ON_UPDATE
    }], actions)).to.be.true;

    done();
  });

  it('getBillingAddressAction should works fine', (done) => {
    const {
      getBillingAddressAction
    } = billingAddressActions;

    store.dispatch(getBillingAddressAction()).then(() => {
      const actions = store.getActions();

      expect(actions).to.have.lengthOf(1);
      expect(helper.isIncludingByOrder([{
        type: actionTypes.BILLINGADDRESS_UI_LIST
      }], actions)).to.be.true;
    }).finally(done);
  });

  it('selectBillingAddressAction should works fine', (done) => {
    const {
      selectBillingAddressAction
    } = billingAddressActions;

    store.dispatch(selectBillingAddressAction());
    const actions = store.getActions();

    expect(actions).to.have.lengthOf(1);
    expect(helper.isIncludingByOrder([{
      type: actionTypes.BILLINGADDRESS_UI_SELECTED
    }], actions)).to.be.true;
    done();
  });

  it('showBillingAddressFormAction should works fine', (done) => {
    const {
      showBillingAddressFormAction
    } = billingAddressActions;
    const inputData = { payload: { display: true } };

    store.dispatch(showBillingAddressFormAction(inputData));
    const actions = store.getActions();

    expect(actions).to.have.lengthOf(1);
    expect(helper.isIncludingByOrder([{
      type: actionTypes.BILLINGADDRESS_UI_FORM_SHOW
    }], actions)).to.be.true;

    done();
  });

  it('hideBillingAddressFormAction should works fine', (done) => {
    const {
      hideBillingAddressFormAction
    } = billingAddressActions;
    const inputData = { payload: { display: false } };

    store.dispatch(hideBillingAddressFormAction(inputData));
    const actions = store.getActions();

    expect(actions).to.have.lengthOf(1);
    expect(helper.isIncludingByOrder([{
      type: actionTypes.BILLINGADDRESS_UI_FORM_SHOW
    }], actions)).to.be.true;

    done();
  });

  it('getCountryStateAction should works fine', (done) => {
    const {
      getCountryStateAction
    } = billingAddressActions;

    store.dispatch(getCountryStateAction()).then(() => {
      const actions = store.getActions();

      expect(actions).to.have.lengthOf(1);
      expect(helper.isIncludingByOrder([{
        type: actionTypes.BILLINGADDRESS_UI_COUNTRYSTATE
      }], actions)).to.be.true;
    }).finally(done);
  });

  it('selectCountryAction should works fine', (done) => {
    const {
      selectCountryAction
    } = billingAddressActions;
    const inputData = { payload: { countryId: 100 } };

    store.dispatch(selectCountryAction(inputData));
    const actions = store.getActions();

    expect(actions).to.have.lengthOf(2);
    expect(helper.isIncludingByOrder([
      { type: actionTypes.BILLINGADDRESS_UI_COUNTRY_SELECTED },
      { type: actionTypes.BILLINGADDRESS_UI_FORM_FIELD_VALIDATION }
    ], actions)).to.be.true;

    done();
  });

  it('changeFormFieldAction should works fine', (done) => {
    const {
      changeFormFieldAction
    } = billingAddressActions;
    const inputData = {
      fieldType: fields.ADDRESS1,
      value: 'address1'
    };

    store.dispatch(changeFormFieldAction(inputData));
    const actions = store.getActions();
    expect(actions).to.have.lengthOf(2);
    expect(helper.isIncludingByOrder([
      { type: actionTypes.BILLINGADDRESS_UI_FORM_FIELD },
      { type: actionTypes.BILLINGADDRESS_UI_FORM_FIELD_VALIDATION }
    ], actions)).to.be.true;

    done();
  });

  it('submitAction should works fine', (done) => {
    const {
      submitAction
    } = billingAddressActions;


    store = configureStore(middlewares)({
      modules: {
        Cart: {
          Checkout: {
            billingAddress: fromJS({
              formData: {
                [fields.FIRST]: '',
                [fields.LAST]: '',
                [fields.ADDRESS1]: '',
                [fields.ADDRESS2]: '',
                [fields.COUNTRY]: '',
                [fields.CITY]: '',
                [fields.STATE]: '',
                [fields.ZIPCODE]: ''
              }
            })
          }
        }
      },
      configurations: fromJS({
        international_addr: false
      })
    });

    store.dispatch(submitAction());
    let actions = store.getActions();

    expect(actions).to.have.lengthOf(1);
    expect(helper.isIncludingByOrder([
      { type: actionTypes.BILLINGADDRESS_UI_FORM_VALIDATION }
    ], actions)).to.be.true;

    store = configureStore(middlewares)({
      modules: {
        Cart: {
          Checkout: {
            billingAddress: fromJS({
              formData: {
                [fields.FIRST]: 'first',
                [fields.LAST]: 'last',
                [fields.ADDRESS1]: 'address1',
                [fields.ADDRESS2]: '',
                [fields.COUNTRY]: 'country',
                [fields.CITY]: 'city',
                [fields.STATE]: 'state',
                [fields.ZIPCODE]: 'zipcode'
              },
              formMode: formModes.CREATE
            })
          }
        }
      },
      configurations: fromJS({
        international_addr: false
      })
    });

    store.dispatch(submitAction()).then(() => {
      actions = store.getActions();

      expect(actions).to.have.lengthOf(2);
      expect(helper.isIncludingByOrder([
        { type: actionTypes.BILLINGADDRESS_UI_FORM_VALIDATION },
        { type: actionTypes.BILLINGADDRESS_UI_LIST }
      ], actions)).to.be.true;
    });

    store = configureStore(middlewares)({
      modules: {
        Cart: {
          Checkout: {
            billingAddress: fromJS({
              formData: {
                [fields.CUSTOMERID]: 100,
                [fields.FIRST]: 'first',
                [fields.LAST]: 'last',
                [fields.MAILINGNAME]: 'mailingname',
                [fields.ADDRESS1]: 'address1',
                [fields.ADDRESS2]: '',
                [fields.COUNTRY]: 'country',
                [fields.CITY]: 'city',
                [fields.STATE]: 'state',
                [fields.ZIPCODE]: 'zipcode'
              },
              formMode: formModes.UPDATE
            })
          }
        }
      },
      configurations: fromJS({
        international_addr: false
      })
    });


    store.dispatch(submitAction()).then(() => {
      actions = store.getActions();

      expect(actions).to.have.lengthOf(2);
      expect(helper.isIncludingByOrder([
        { type: actionTypes.BILLINGADDRESS_UI_FORM_VALIDATION },
        { type: actionTypes.BILLINGADDRESS_UI_LIST }
      ], actions)).to.be.true;
    }).finally(done);
  });

  it('cancelAction should works fine', (done) => {
    const {
      cancelAction
    } = billingAddressActions;

    store.dispatch(cancelAction());
    const actions = store.getActions();

    expect(actions).to.have.lengthOf(1);
    expect(helper.isIncludingByOrder([
      { type: actionTypes.BILLINGADDRESS_UI_FORM_CANCEL }
    ], actions)).to.be.true;

    done();
  });
});
