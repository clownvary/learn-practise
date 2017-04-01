import { fromJS } from 'immutable';
import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import * as PaymentTypes from 'index/modules/Cart/Checkout/consts/paymentTypes';
import CreditCard from 'index/modules/Cart/Checkout/components/PaymentComponent/CreditCard';
import CreditCardSaved from 'index/modules/Cart/Checkout/components/PaymentComponent/CreditCard/Saved';
import CreditCardNew from 'index/modules/Cart/Checkout/components/PaymentComponent/CreditCard/New';

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
    <CreditCard
      typeName={PaymentTypes.CREDIT_CARD}
      data={initialState.getIn(['modules', MODULENAME, 'types', PaymentTypes.CREDIT_CARD])}
      {...spyActions}
    />,
    { context: _context, childContextTypes }
  );

  return {
    component,
    CreditcardSaved: component.find(CreditCardSaved),
    CreditcardNew: component.find(CreditCardNew),
    hasLimitWidthClass: component.find('.layout-width-limited').length > 0,
    hasMerchantNameClass: component.find('.merchant-name').length > 0,
    spyActions
  };
};

describe('index/modules/Cart/ShoppingCart/components/PaymentComponent/CreditCard', () => {
  it('should render CreditcardSaved component', () => {
    const { CreditcardSaved } = setup();
    expect(CreditcardSaved.length).toEqual(1);
  });

  it('should render CreditcardNew component', () => {
    const { CreditcardNew } = setup();
    expect(CreditcardNew.length).toEqual(1);
  });

  it('should include style class layout-width-limite', () => {
    const { hasLimitWidthClass } = setup();
    expect(hasLimitWidthClass).toBe(true);
  });

  it('should include style class merchant-name', () => {
    const { hasMerchantNameClass } = setup();
    expect(hasMerchantNameClass).toBe(true);
  });
});
