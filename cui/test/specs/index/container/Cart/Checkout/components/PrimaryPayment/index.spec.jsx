import { fromJS } from 'immutable';
import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import { PrimaryPayment } from 'index/modules/Cart/Checkout/components/PrimaryPayment';
import PaymentComponent from 'index/modules/Cart/Checkout/components/PaymentComponent';
//eslint-disable-next-line
import context, { childContextTypes } from 'utils/context';

const initialState = fromJS({
  modules: {}
});

const setup = (quickdonation = initialState, _context = context) => {
  const actions = {
    registerModuleActoin: expect.createSpy()
  };

  const component = shallow(
    <PrimaryPayment paymentManager={initialState} {...actions} />,
    { context: _context, childContextTypes }
  );

  return {
    component,
    h4: component.find('h4'),
    hasLockIcon: component.find('.icon-uniF023').length > 0,
    Paymentcomponent: component.find(PaymentComponent),
    actions
  };
};

describe('index/modules/Cart/ShoppingCart/components/PrimaryPayment', () => {
  it('should render h4 tag', () => {
    const { h4 } = setup();
    expect(h4.length).toEqual(1);
  });

  it('should render PaymentComponent component', () => {
    const { Paymentcomponent } = setup();
    expect(Paymentcomponent.length).toEqual(1);
  });

  it('should render lock icon', () => {
    const { hasLockIcon } = setup();
    expect(hasLockIcon).toBe(true);
  });

  it('should call action registerModuleActoin', () => {
    const { actions } = setup();
    expect(actions.registerModuleActoin).toHaveBeenCalled();
  });
});
