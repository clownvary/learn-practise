import { fromJS } from 'immutable';
import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import * as PaymentTypes from 'index/modules/Cart/Checkout/consts/paymentTypes';
import PaymentContents from 'index/modules/Cart/Checkout/components/PaymentComponent/PaymentContents';
import * as CreditCard from 'index/modules/Cart/Checkout/components/PaymentComponent/CreditCard';

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
    onTypeChange: expect.createSpy()
  };

  const component = shallow(
    <PaymentContents
      typeName={PaymentTypes.CREDIT_CARD}
      data={initialState.getIn(['modules', MODULENAME])}
      selectedType={PaymentTypes.CREDIT_CARD}
      {...spyActions}
    />,
    { context: _context, childContextTypes }
  );

  return {
    component,
    CreditCardContent: component.find(CreditCard.default),
    hasCompContentsClass: component.find('.payment-comp-contents').length > 0,
    hasCompContClass: component.find('.payment-comp-cont').length > 0,
    spyActions
  };
};

describe('index/modules/Cart/ShoppingCart/components/PaymentComponent/PaymentContents', () => {
  it('should render CreditCardContent component', () => {
    const { CreditCardContent } = setup();
    expect(CreditCardContent.length).toEqual(1);
  });

  it('should include style class layout-width-limite', () => {
    const { hasCompContentsClass } = setup();
    expect(hasCompContentsClass).toBe(true);
  });

  it('should include style class payment-comp-methods', () => {
    const { hasCompContClass } = setup();
    expect(hasCompContClass).toBe(true);
  });
});
