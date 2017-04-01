import { is, fromJS } from 'immutable';
import { expect } from 'chai';
import _ from 'lodash';
import * as billingAddressActions from 'index/modules/Cart/Checkout/consts/actionTypes';
import billingAddressReducer from 'index/modules/Cart/Checkout/reducers/billingAddress';
import { billingAddressFormFields as fields, formModes } from 'index/modules/Cart/Checkout/consts';
import jsonBillingAddress from 'Cart/Checkout/get_billingaddresses.json';
import jsonCountryStates from 'Cart/Checkout/get_countrystates.json';

describe('index/modules/Cart/Checkout/reducers/billingAddress', () => {
  const billingInfos = jsonBillingAddress.body.billing_infos;
  const billingAddressesList = billingInfos.payers.map(payer => ({
    ...payer,
    text: payer.name,
    value: payer.customer_id
  }));
  const payerId = billingInfos.payer_id;
  const selectedBillingAddress = fromJS(billingAddressesList)
    .find(ba => ba.get('customer_id') === payerId).toJS();
  const countries = jsonCountryStates.body.countries.map(country => ({
    ...country,
    id: country.id,
    text: country.country_name,
    value: country.id
  }));

  const defaultState = fromJS({
    billingAddresses: billingAddressesList,
    selectedBillingAddress,

    countries,
    selectedCountry: {},
    selectedState: {},

    formData: {},
    formErrors: {},
    isFormDisplay: false,
    isFormHeaderDisplay: true,
    isListDisplay: true,
    formMode: formModes.VIEW
  });

  const emptyFormData = {
    [fields.FIRST]: '',
    [fields.LAST]: '',
    [fields.MAILINGNAME]: '',
    [fields.ADDRESS1]: '',
    [fields.ADDRESS2]: '',
    [fields.COUNTRY]: '',
    [fields.CITY]: '',
    [fields.STATE]: '',
    [fields.ZIPCODE]: ''
  };

  const expectedInitialState = fromJS({
    billingAddresses: [],
    selectedBillingAddress: {},

    countries: [],
    selectedCountry: {},
    selectedState: {},

    formData: {},
    formErrors: {},
    isFormDisplay: false,
    isFormHeaderDisplay: true,
    isListDisplay: true,
    formMode: formModes.VIEW
  });


  it('Should return the expected initial state', () => {
    expect(is(expectedInitialState, billingAddressReducer(undefined, {}))).to.be.true;
  });

  it('Should get countries and states successfully', () => {
    const {
      BILLINGADDRESS_UI_COUNTRYSTATE
    } = billingAddressActions;

    const returnState = billingAddressReducer(defaultState, {
      type: BILLINGADDRESS_UI_COUNTRYSTATE,
      payload: { countries }
    });

    expect(returnState.get('countries').toJS()).to.have.lengthOf(countries.length);
    returnState.get('countries').map((country) => {
      expect(_.find(countries, c => country.get('id') === c.id &&
        country.get('country_name') === c.country_name &&
        country.get('states').size === c.states.length) != null);

      return country;
    });
  });

  it('Should get billing address successfully', () => {
    const {
      BILLINGADDRESS_UI_LIST
    } = billingAddressActions;

    const returnState = billingAddressReducer(undefined, {
      type: BILLINGADDRESS_UI_LIST,
      payload: { billingInfos }
    });

    expect(returnState.get('billingAddresses').toJS()).to.have.lengthOf(billingAddressesList.length);
    expect(returnState.get('selectedBillingAddress')).to.be.a('object');
    expect(returnState.get('selectedBillingAddress').get('customer_id')).to.be.equal(payerId);
  });

  it('Should change billing address successfully', () => {
    const {
      BILLINGADDRESS_UI_SELECTED
    } = billingAddressActions;
    const expectedCustomerId = billingAddressesList[0].customer_id;

    const returnState = billingAddressReducer(defaultState, {
      type: BILLINGADDRESS_UI_SELECTED,
      payload: { selectedCustomerId: expectedCustomerId }
    });

    expect(returnState.get('selectedBillingAddress')).to.be.a('object');
    expect(returnState.get('selectedBillingAddress').get('customer_id')).to.be.equal(expectedCustomerId);
  });

  it('BILLINGADDRESS_ON_CREATE', () => {
    const {
      BILLINGADDRESS_ON_CREATE
    } = billingAddressActions;

    const returnState = billingAddressReducer(defaultState, {
      type: BILLINGADDRESS_ON_CREATE
    });

    expect(returnState.get('formData').toJS()).to.be.a('object');
    expect(returnState.get('formData').toJS()).to.deep.equal(emptyFormData);
    expect(returnState.get('selectedCountry').toJS()).to.deep.equal({});
    expect(returnState.get('selectedState').toJS()).to.deep.equal({});
    expect(returnState.get('isFormHeaderDisplay')).to.equal(true);
    expect(returnState.get('isListDisplay')).to.equal(true);
    expect(returnState.get('isFormDisplay')).to.equal(true);
    expect(returnState.get('formMode')).to.be.equal(formModes.CREATE);
    expect(returnState.get('formErrors').toJS()).to.deep.equal({});
  });

  it('BILLINGADDRESS_ON_UPDATE', () => {
    const {
      BILLINGADDRESS_ON_UPDATE
    } = billingAddressActions;

    const returnState = billingAddressReducer(defaultState, {
      type: BILLINGADDRESS_ON_UPDATE
    });

    const expectedFormData = {
      [fields.CUSTOMERID]: selectedBillingAddress.customer_id,
      [fields.FIRST]: selectedBillingAddress.first_name,
      [fields.LAST]: selectedBillingAddress.last_name,
      [fields.MAILINGNAME]: selectedBillingAddress.mailing_name,
      [fields.ADDRESS1]: selectedBillingAddress.address1,
      [fields.ADDRESS2]: selectedBillingAddress.address2,
      [fields.COUNTRY]: selectedBillingAddress.country,
      [fields.CITY]: selectedBillingAddress.city,
      [fields.STATE]: selectedBillingAddress.state,
      [fields.ZIPCODE]: selectedBillingAddress.zip_code
    };

    expect(returnState.get('formData').toJS()).to.be.a('object');
    expect(returnState.get('formData').toJS()).to.be.deep.equal(expectedFormData);
    expect(returnState.get('isFormHeaderDisplay')).to.be.equal(false);
    expect(returnState.get('isListDisplay')).to.be.equal(false);
    expect(returnState.get('isFormDisplay')).to.be.equal(true);
    expect(returnState.get('formMode')).to.be.equal(formModes.UPDATE);
    expect(returnState.get('formErrors').toJS()).to.be.deep.equal({});
  });

  it('Should show form successfully', () => {
    const {
      BILLINGADDRESS_UI_FORM_SHOW
    } = billingAddressActions;

    let returnState = billingAddressReducer(defaultState, {
      type: BILLINGADDRESS_UI_FORM_SHOW,
      payload: { display: true }
    });

    expect(returnState.get('isFormDisplay')).to.be.equal(true);

    returnState = billingAddressReducer(defaultState, {
      type: BILLINGADDRESS_UI_FORM_SHOW,
      payload: { display: false }
    });

    expect(returnState.get('isFormDisplay')).to.be.equal(false);
    expect(returnState.get('formMode')).to.be.equal(formModes.VIEW);
  });

  it('Should update form field successfully', () => {
    const {
      BILLINGADDRESS_UI_FORM_FIELD
    } = billingAddressActions;

    const payload = { fieldType: fields.FIRST, value: 'first' };

    const returnState = billingAddressReducer(defaultState, {
      type: BILLINGADDRESS_UI_FORM_FIELD,
      payload
    });

    expect(returnState.getIn(['formData', payload.fieldType])).to.be.equal(payload.value);
  });

  it('Should change country list successfully', () => {
    const {
      BILLINGADDRESS_UI_COUNTRY_SELECTED
    } = billingAddressActions;

    const expectedCountry = countries[1];
    const payload = { countryId: expectedCountry.id };

    const returnState = billingAddressReducer(defaultState, {
      type: BILLINGADDRESS_UI_COUNTRY_SELECTED,
      payload
    });

    expect(returnState.get('selectedCountry')).to.be.a('object');
    expect(returnState.getIn(['selectedCountry', 'id'])).to.be.equal(payload.countryId);
    expect(returnState.getIn(['formData', fields.COUNTRY])).to.be.equal(payload.countryId);
    expect(returnState.getIn(['formData', fields.STATE])).to.be.equal('');
    expect(returnState.get('selectedState').toJS()).to.be.deep.equal({});
  });

  it('Should update validation object successfully', () => {
    const {
      BILLINGADDRESS_UI_FORM_VALIDATION
    } = billingAddressActions;

    const payload = {
      formErrors: {
        [fields.FIRST]: 'required',
        [fields.LAST]: '',
        [fields.ADDRESS1]: '',
        [fields.ADDRESS2]: '',
        [fields.COUNTRY]: '',
        [fields.CITY]: '',
        [fields.STATE]: '',
        [fields.ZIPCODE]: ''
      }
    };

    const returnState = billingAddressReducer(defaultState, {
      type: BILLINGADDRESS_UI_FORM_VALIDATION,
      payload
    });

    expect(returnState.get('formErrors').toJS()).to.be.deep.equal(payload.formErrors);
  });

  it('Should update validation object by field successfully', () => {
    const {
      BILLINGADDRESS_UI_FORM_FIELD_VALIDATION
    } = billingAddressActions;

    const payload = {
      error: 'required',
      fieldType: fields.COUNTRY
    };

    const returnState = billingAddressReducer(fromJS({ formErrors: {} }), {
      type: BILLINGADDRESS_UI_FORM_FIELD_VALIDATION,
      payload
    });

    expect(returnState.getIn(['formErrors', payload.fieldType])).to.be.deep.equal(payload.error);
  });

  it('Should cancel form successfully', () => {
    const {
      BILLINGADDRESS_UI_FORM_CANCEL
    } = billingAddressActions;

    const returnState = billingAddressReducer(defaultState, {
      type: BILLINGADDRESS_UI_FORM_CANCEL
    });

    expect(returnState.get('formData').toJS()).to.be.deep.equal({});
    expect(returnState.get('isFormHeaderDisplay')).to.be.equal(true);
    expect(returnState.get('isListDisplay')).to.be.equal(true);
    expect(returnState.get('isFormDisplay')).to.be.equal(false);
    expect(returnState.get('formMode')).to.be.equal(formModes.VIEW);
  });
});
