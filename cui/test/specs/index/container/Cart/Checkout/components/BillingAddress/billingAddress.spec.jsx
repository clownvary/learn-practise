import { fromJS } from 'immutable';
import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';

import { BillingAddress } from 'index/modules/Cart/Checkout/components/BillingAddress';
import BillingAddressList from 'index/modules/Cart/Checkout/components/BillingAddress/BillingAddressList';
import BillingAddressForm from 'index/modules/Cart/Checkout/components/BillingAddress/BillingAddressForm';

const defaultConfig = {
  canUpdate: true,
  useAddressVerification: true,
  canCreate: true,
  hideBilling: true
};

const initialState = {};

function setup(_state, _context = context, _config) {
  const actions = {
    changeBillingAddressAction: expect.createSpy(),
    onUpdateBillingAddressAction: expect.createSpy(),
    onCreateBillingAddressAction: expect.createSpy(),
    changeCountryAction: expect.createSpy(),
    changeFormDataAction: expect.createSpy(),
    hideBillingAddressFormAction: expect.createSpy(),
    getCountryStateAction: expect.createSpy().andCall(() => Promise.resolve()),
    submitAction: expect.createSpy(),
    cancelAction: expect.createSpy()
  };

  const state = Object.assign(initialState, _state);
  const config = Object.assign(defaultConfig, _config);

  const component = shallow(
    <BillingAddress data={fromJS(state)} config={config} {...actions} />);

  return {
    component,
    container: component.find('.billingaddresswrapper'),
    list: component.find(BillingAddressList),
    form: component.find(BillingAddressForm),
    actions
  };
}

describe('index/modules/Cart/Checkout/components/BillingAddress', () => {
  it('should render when hideBilling is false', () => {
    const { container, list, form, actions } =
      setup(null, null, { hideBilling: false, isInternational: false });
    expect(container.length).toEqual(1);
    expect(list.length).toEqual(1);
    expect(form.length).toEqual(1);
    expect(actions.getCountryStateAction).toHaveBeenCalled();
  });

  it('should not render when hideBilling is true', () => {
    const { container, list, form, actions } =
      setup(null, null, { hideBilling: true, isInternational: false });
    expect(container.length).toEqual(0);
    expect(list.length).toEqual(0);
    expect(form.length).toEqual(0);
    expect(actions.getCountryStateAction).toHaveBeenCalled();
  });
});
