import { fromJS } from 'immutable';
import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import Input from 'react-aaui/lib/Input';
import Dropdown from 'react-aaui/lib/Dropdown';
import Button from 'react-aaui/lib/Button';

import { BillingAddressForm } from 'index/modules/Cart/Checkout/components/BillingAddress/BillingAddressForm';
import { billingAddressFormFields as fields, formModes } from 'index/modules/Cart/Checkout/consts';

import jsonBillingAddress from 'Cart/Checkout/get_billingaddresses.json';
import jsonCountries from 'Cart/Checkout/get_countrystates.json';

import context, { childContextTypes } from 'utils/context';
import messages from 'source/en';


const {
  body: {
    billing_infos: {
      payers,
  payer_id: payerId
    }
  }
} = jsonBillingAddress;

const {
  body: {
    countries
  }
} = jsonCountries;

const intl = {
  messages
};

const defaultConfig = {
  useAddressVerification: true,
  canCreate: true,
  hideBilling: false
};

payers.map((ba) => {
  ba.text = ba.name;
  ba.value = ba.customer_id;
  return ba;
});

const initialState = {
  billingAddresses: payers,
  selectedBillingAddress: fromJS(payers).find(ba => ba.get('customer_id') === payerId),

  countries,
  selectedCountry: {},
  selectedState: {},

  formData: {},
  formErrors: {},
  isFormHeaderDisplay: true,
  isFormDisplay: true,
  formMode: formModes.VIEW
};

function setup(_state, _context = context, _config) {
  const actions = {
    onCreate: expect.createSpy(),
    onHide: expect.createSpy(),
    onChangeCountry: expect.createSpy(),
    onChange: expect.createSpy(),
    onSubmit: expect.createSpy(),
    onCancel: expect.createSpy()
  };

  const state = Object.assign(initialState, _state);
  const config = Object.assign(defaultConfig, _config);


  const component = shallow(
    <BillingAddressForm data={fromJS(state)} config={config} intl={intl} {...actions} />,
    { context: _context, childContextTypes });

  return {
    component,
    actions,

    container: component.find('.billingaddressformwrapper'),
    form: component.find('.billingaddressform'),
    inputs: component.find(Input),
    dropdowns: component.find(Dropdown),
    buttons: component.find(Button),
    errors: component.find('.form__filed__error'),
    linkAdd: component.find('a')
  };
}

describe('index/modules/Cart/Checkout/components/BillingAddress/BillingAddressForm', () => {
  it('should render form wrapper ', () => {
    const { container } = setup({ isFormHeaderDisplay: false, isFormDisplay: false },
      null,
      { canCreate: false });
    expect(container.length).toEqual(1);
  });

  it('should render add link when canCreate == true and isFormHeaderDisplay == true', () => {
    const { linkAdd } = setup({ isFormHeaderDisplay: true }, null, { canCreate: true });
    expect(linkAdd.length).toEqual(1);
  });

  it('should render add link when canCreate == false or isFormHeaderDisplay == true', () => {
    const { linkAdd } = setup({ isFormHeaderDisplay: true }, null, { canCreate: false });
    expect(linkAdd.length).toEqual(0);
  });

  it('should render add link when canCreate == true or isFormHeaderDisplay == false', () => {
    const { linkAdd } = setup({ isFormHeaderDisplay: false }, null, { canCreate: true });
    expect(linkAdd.length).toEqual(0);
  });

  it('onHide should be triggered', () => {
    const { linkAdd, actions } = setup({ isFormDisplay: true, isFormHeaderDisplay: true },
      null,
      { canCreate: true });
    expect(linkAdd.length).toEqual(1);
    linkAdd.simulate('click');
    expect(actions.onHide).toHaveBeenCalled();
  });

  it('onCreate should be triggered', () => {
    const { linkAdd, actions } = setup({ isFormDisplay: false, isFormHeaderDisplay: true },
      null,
      { canCreate: true });
    expect(linkAdd.length).toEqual(1);
    linkAdd.simulate('click');
    expect(actions.onCreate).toHaveBeenCalled();
  });

  it('should render form correctly when isFormDisplay == true && create mode', () => {
    const { form, inputs, dropdowns } = setup({ isFormDisplay: true, formMode: formModes.CREATE });
    expect(form.length).toEqual(1);
    expect(inputs.length).toEqual(6);
    expect(dropdowns.length).toEqual(2);
  });

  it('should render form correctly when isFormDisplay == true && update mode', () => {
    const { form, inputs, dropdowns } = setup({ isFormDisplay: true, formMode: formModes.UPDATE });
    expect(form.length).toEqual(1);
    expect(inputs.length).toEqual(5);
    expect(dropdowns.length).toEqual(2);
  });

  it('should render form correctly when isFormDisplay == false', () => {
    const { form } = setup({ isFormDisplay: false });
    expect(form.length).toEqual(0);
  });

  it('onChange should be triggered', () => {
    const { inputs, actions } = setup({ isFormDisplay: true });
    inputs.first().simulate('blur', { target: { value: 'blur' } });
    expect(actions.onChange).toHaveBeenCalled();
  });

  it('onChangeCountry should be triggered', () => {
    const { dropdowns, actions } = setup({ isFormDisplay: true });
    dropdowns.first().simulate('change', { value: 'US' });
    expect(actions.onChangeCountry).toHaveBeenCalled();
  });

  it('onChange should be triggered when state is changed', () => {
    const { dropdowns, actions } = setup({ isFormDisplay: true });
    dropdowns.last().simulate('change', { target: { value: 'AK' } });
    expect(actions.onChange).toHaveBeenCalled();
  });

  it('add button should be rendered when formMode is CREATE', () => {
    const { buttons } = setup({ isFormDisplay: true, formMode: formModes.CREATE });
    expect(buttons.length).toEqual(1);
  });

  it('save and cancel buttons should be rendered when formMode is UPDATE', () => {
    const { buttons } = setup({ isFormDisplay: true, formMode: formModes.UPDATE });
    expect(buttons.length).toEqual(2);
  });

  it('no button should be rendered when formMode is VIEW', () => {
    const { buttons } = setup({ isFormDisplay: true, formMode: formModes.VIEW });
    expect(buttons.length).toEqual(0);
  });

  it('onSubmit should be triggered when add button is clicked', () => {
    const { buttons, actions } = setup({ isFormDisplay: true, formMode: formModes.CREATE });
    buttons.first().simulate('click');
    expect(actions.onSubmit).toHaveBeenCalled();
  });

  it('onSubmit should be triggered when save button is clicked', () => {
    const { buttons, actions } = setup({ isFormDisplay: true, formMode: formModes.UPDATE });
    buttons.last().simulate('click');
    expect(actions.onSubmit).toHaveBeenCalled();
  });

  it('onCancel should be triggered when cancel button is clicked', () => {
    const { buttons, actions } = setup({ isFormDisplay: true, formMode: formModes.UPDATE });
    buttons.first().simulate('click');
    expect(actions.onCancel).toHaveBeenCalled();
  });

  it('default form data should be render', () => {
    const formData = {
      [fields.FIRST]: 'first',
      [fields.LAST]: 'last',
      [fields.ADDRESS1]: 'address1',
      [fields.ADDRESS2]: 'address2',
      [fields.COUNTRY]: '',
      [fields.CITY]: 'city',
      [fields.STATE]: '',
      [fields.ZIPCODE]: '123456'
    };
    const { inputs } = setup({
      isFormDisplay: true,
      formMode: formModes.UPDATE,
      formData
    });

    inputs.forEach((input) => {
      let value = '';
      switch (input.props().id) {
        case 'frmFirstName':
          value = formData[fields.FIRST];
          break;
        case 'frmLastName':
          value = formData[fields.LAST];
          break;
        case 'frmMailingName':
          value = formData[fields.MAILINGNAME];
          break;
        case 'frmStreetAddress1':
          value = formData[fields.ADDRESS1];
          break;
        case 'frmStreetAddress2':
          value = formData[fields.ADDRESS2];
          break;
        case 'frmCity':
          value = formData[fields.CITY];
          break;
        case 'frmZipCode':
          value = formData[fields.ZIPCODE];
          break;
        default:
          value = '';
          break;
      }

      expect(input.props().value).toEqual(value);
    });
  });

  it('errors should be render', () => {
    let { errors } = setup({
      isFormDisplay: true,
      formMode: formModes.CREATE,
      formErrors: {
        [fields.FIRST]: 'required',
        [fields.LAST]: '',
        [fields.MAILINGNAME]: '',
        [fields.ADDRESS1]: '',
        [fields.ADDRESS2]: '',
        [fields.COUNTRY]: '',
        [fields.CITY]: '',
        [fields.STATE]: '',
        [fields.ZIPCODE]: ''
      }
    });
    expect(errors.length).toEqual(1);

    errors = setup({
      isFormDisplay: true,
      formMode: formModes.CREATE,
      formErrors: {
        [fields.FIRST]: 'required',
        [fields.LAST]: 'required',
        [fields.ADDRESS1]: '',
        [fields.ADDRESS2]: '',
        [fields.COUNTRY]: '',
        [fields.CITY]: '',
        [fields.STATE]: '',
        [fields.ZIPCODE]: ''
      }
    }).errors;
    expect(errors.length).toEqual(2);

    errors = setup({
      isFormDisplay: true,
      formMode: formModes.CREATE,
      formErrors: {
        [fields.FIRST]: 'required',
        [fields.LAST]: 'required',
        [fields.ADDRESS1]: 'required',
        [fields.ADDRESS2]: '',
        [fields.COUNTRY]: '',
        [fields.CITY]: '',
        [fields.STATE]: '',
        [fields.ZIPCODE]: ''
      }
    }).errors;
    expect(errors.length).toEqual(3);

    errors = setup({
      isFormDisplay: true,
      formMode: formModes.CREATE,
      formErrors: {
        [fields.FIRST]: 'required',
        [fields.LAST]: 'required',
        [fields.ADDRESS1]: 'required',
        [fields.ADDRESS2]: 'required',
        [fields.COUNTRY]: '',
        [fields.CITY]: '',
        [fields.STATE]: '',
        [fields.ZIPCODE]: ''
      }
    }).errors;
    expect(errors.length).toEqual(3);

    errors = setup({
      isFormDisplay: true,
      formMode: formModes.CREATE,
      formErrors: {
        [fields.FIRST]: 'required',
        [fields.LAST]: 'required',
        [fields.ADDRESS1]: 'required',
        [fields.ADDRESS2]: 'required',
        [fields.COUNTRY]: 'required',
        [fields.CITY]: '',
        [fields.STATE]: '',
        [fields.ZIPCODE]: ''
      }
    }).errors;
    expect(errors.length).toEqual(4);

    errors = setup({
      isFormDisplay: true,
      formMode: formModes.CREATE,
      formErrors: {
        [fields.FIRST]: 'required',
        [fields.LAST]: 'required',
        [fields.ADDRESS1]: 'required',
        [fields.ADDRESS2]: 'required',
        [fields.COUNTRY]: 'required',
        [fields.CITY]: 'required',
        [fields.STATE]: '',
        [fields.ZIPCODE]: ''
      }
    }).errors;
    expect(errors.length).toEqual(5);

    errors = setup({
      isFormDisplay: true,
      formMode: formModes.CREATE,
      formErrors: {
        [fields.FIRST]: 'required',
        [fields.LAST]: 'required',
        [fields.ADDRESS1]: 'required',
        [fields.ADDRESS2]: 'required',
        [fields.COUNTRY]: 'required',
        [fields.CITY]: 'required',
        [fields.STATE]: 'required',
        [fields.ZIPCODE]: ''
      }
    }).errors;
    expect(errors.length).toEqual(6);

    errors = setup({
      isFormDisplay: true,
      formMode: formModes.CREATE,
      formErrors: {
        [fields.FIRST]: 'required',
        [fields.LAST]: 'required',
        [fields.ADDRESS1]: 'required',
        [fields.ADDRESS2]: 'required',
        [fields.COUNTRY]: 'required',
        [fields.CITY]: 'required',
        [fields.STATE]: 'required',
        [fields.ZIPCODE]: 'required'
      }
    }).errors;
    expect(errors.length).toEqual(7);
  });
});
