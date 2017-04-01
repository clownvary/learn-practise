import { fromJS } from 'immutable';
import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import * as PaymentTypes from 'index/modules/Cart/Checkout/consts/paymentTypes';
import PaymentComponent from 'index/modules/Cart/Checkout/components/PaymentComponent';
import PaymentMethods from 'index/modules/Cart/Checkout/components/PaymentComponent/PaymentMethods';
import PaymentContents from 'index/modules/Cart/Checkout/components/PaymentComponent/PaymentContents';

/* eslint-disable */
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
  const spyActions = {
    changePaymentTypeActoin: expect.createSpy(),
    selectItemActoin: expect.createSpy(),
    addPayItemActoin: expect.createSpy()
  };

  const component = shallow(
    <PaymentComponent
      name={MODULENAME}
      data={initialState.getIn(['modules', MODULENAME])}
      onTypeChange={(typeName) => {
        spyActions.changePaymentTypeActoin(MODULENAME, typeName);
      }}
      onItemSelectedChange={(typeName, payItemId) => {
        spyActions.selectItemActoin(MODULENAME, typeName, payItemId);
      }}
      onPayItemAdded={(typeName, payItemInfo) => {
        spyActions.addPayItemActoin(MODULENAME, typeName, payItemInfo);
      }}
    />,
    { context: _context, childContextTypes }
  );

  return {
    component,
    hasMainClass: component.find('.payment-comp').length > 0,
    Paymentmethods: component.find(PaymentMethods),
    Paymentcontents: component.find(PaymentContents)
  };
};

describe('index/modules/Cart/ShoppingCart/components/PaymentComponent', () => {
  it('should render PaymentMethods component', () => {
    const { Paymentmethods } = setup();
    expect(Paymentmethods.length).toEqual(1);
  });

  it('should render PaymentContents component', () => {
    const { Paymentcontents } = setup();
    expect(Paymentcontents.length).toEqual(1);
  });

  it('should include style class payment-comp', () => {
    const { hasMainClass } = setup();
    expect(hasMainClass).toBe(true);
  });
});
