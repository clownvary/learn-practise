import { fromJS } from 'immutable';
import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import * as PaymentTypes from 'index/modules/Cart/Checkout/consts/paymentTypes';
import { AddNewCreditCard } from 'index/modules/Cart/Checkout/components/PaymentComponent/CreditCard/New';

/* eslint-disable */
import messages from 'source/en';
import jsonCreditCards from 'Cart/Checkout/get_creditcards.json';
import jsonCreditCardTypes from 'Cart/Checkout/get_creditcardtypes.json';
import jsonEChecks from 'Cart/Checkout/get_echecks.json';
/* eslint-enable */

//eslint-disable-next-line
import context, { childContextTypes } from 'utils/context';

const { body: { saved_cards: creditCards } } = jsonCreditCards;
const { body: { card_types: creditCardTypes } } = jsonCreditCardTypes;
const { body: { saved_cards: eChecks } } = jsonEChecks;

const expectedCreditCards = fromJS(creditCards).map(card => card.set('id', `${card.get('card_type_id')}_${card.get('card_number')}`));
const expectedEChecks = fromJS(eChecks).map(card => card.set('id', `${card.get('card_type_id')}_${card.get('card_number')}`));
const initialState = fromJS({
  modules: fromJS({
    primary: fromJS({
      types: fromJS({
        [PaymentTypes.CREDIT_CARD]: fromJS({
          component: 'CreditCard',
          selected: expectedCreditCards.get(0),
          list: expectedCreditCards,
          tempList: [],
          totalList: expectedCreditCards,
          cardTypes: fromJS(creditCardTypes)
        }),
        [PaymentTypes.ECHECK]: fromJS({
          component: 'ECheck',
          selected: '',
          list: expectedEChecks,
          tempList: [],
          totalList: expectedEChecks
        })
      }),
      selectedType: PaymentTypes.CREDIT_CARD,
      isShow: true
    })
  })
});
const MODULENAME = 'primary';

const setup = (quickdonation = initialState, _context = context) => {
  const component = shallow(
    <AddNewCreditCard
      intl={{ messages }}
      typeName={PaymentTypes.CREDIT_CARD}
      data={initialState.getIn(['modules', MODULENAME, 'types', PaymentTypes.CREDIT_CARD])}
    />,
    { context: _context, childContextTypes }
  );

  return {
    component,
    CCNumberInput: component.find('#fieldCardNumber').at(0),
    hasContainerClass: component.find('.payment-comp-credit-card-new').length > 0
  };
};

describe('index/modules/Cart/ShoppingCart/components/PaymentComponent/CreditCard/New', () => {
  it('should include style class payment-comp-credit-card-new', () => {
    const { hasContainerClass } = setup();
    expect(hasContainerClass).toBe(true);
  });

  it('should show the new credit card form', () => {
    const { component } = setup();
    component.setState({ showForm: true });
    expect(component.find('.form--horizontal').length > 0).toBe(true);
  });

  it('should hide the new credit card form', () => {
    const { component } = setup();
    component.setState({ showForm: false });
    expect(component.find('.form--horizontal').length > 0).toBe(false);
  });

  it('should show the Guarantee information if showForm and showGuarantee are all true', () => {
    const { component } = setup();
    component.setState({ showForm: true, showGuarantee: true });
    expect(component.find('.security-guarantee-content').length > 0).toBe(true);
  });

  it('should hide the Guarantee information if showForm is false and showGuarantee is true', () => {
    const { component } = setup();
    component.setState({ showForm: false, showGuarantee: true });
    expect(component.find('.security-guarantee-content').length > 0).toBe(false);
  });

  it('should hide the Guarantee information if showForm is true and showGuarantee is false', () => {
    const { component } = setup();
    component.setState({ showForm: true, showGuarantee: false });
    expect(component.find('.security-guarantee-content').length > 0).toBe(false);
  });

  // Not found the way about how to use enzyme.simulate onInput event.
  it.skip('should call changeCampaignAction on switch campaign selection', () => {
    const { component, CCNumberInput } = setup();
    CCNumberInput.simulate('input', { target: { value: 99 } });
    expect(component.state('ccNumber')).toBe(99);
  });
});
