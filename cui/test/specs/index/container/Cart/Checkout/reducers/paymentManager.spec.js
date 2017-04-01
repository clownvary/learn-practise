import { is, fromJS } from 'immutable';
import { expect } from 'chai';
import * as actionTypes from 'index/modules/Cart/Checkout/consts/actionTypes';
import * as PaymentTypes from 'index/modules/Cart/Checkout/consts/paymentTypes';
import reducer, { handlers } from 'index/modules/Cart/Checkout/reducers/paymentManager';

/* eslint-disable */
import jsonAmstoken from 'Cart/Checkout/get_amstoken.json';
import jsonAmsaccountid from 'Cart/Checkout/get_amsaccountid.json';
import jsonCreditCards from 'Cart/Checkout/get_creditcards.json';
import jsonCreditCardTypes from 'Cart/Checkout/get_creditcardtypes.json';
import jsonEChecks from 'Cart/Checkout/get_echecks.json';
/* eslint-enable */

describe('index/modules/Cart/Checkout/reducers/paymentManager', () => {
  const { body: { saved_cards: creditCards } } = jsonCreditCards;
  const { body: { card_types: creditCardTypes } } = jsonCreditCardTypes;
  const { body: { saved_cards: eChecks } } = jsonEChecks;

  const {
    PAYMENT_REGISTER_MODULE, PAYMENT_UPDATE_SAVED_CREDITCARDS,
    PAYMENT_UPDATE_SAVED_ECHECKS, PAYMENT_SELECT_ITEM,
    PAYMENT_CHANGE_TYPE, PAYMENT_UPDATE_CREDIT_CARD_TYPES,
    PAYMENT_ADD_TEMP_CREDIT_CARD
  } = actionTypes;

  const expectedInitialState = fromJS({
    modules: {}
  });

  const registeredState = fromJS({
    modules: fromJS({
      primary: fromJS({
        types: fromJS({
          [PaymentTypes.CREDIT_CARD]: fromJS({
            component: 'CreditCard',
            selected: '',
            list: [],
            tempList: [],
            totalList: [],
            cardTypes: []
          }),
          [PaymentTypes.ECHECK]: fromJS({
            component: 'ECheck',
            selected: '',
            list: [],
            tempList: [],
            totalList: []
          })
        }),
        selectedType: PaymentTypes.CREDIT_CARD,
        isShow: true
      })
    })
  });

  it('Should return the expected initial state', () => {
    expect(is(expectedInitialState, reducer(undefined, {}))).to.be.true;
  });

  it('Should register module successfully', () => {
    const handler = handlers[PAYMENT_REGISTER_MODULE];
    const params = {
      payload: {
        moduleName: 'primary',
        module: fromJS({
          types: fromJS({
            [PaymentTypes.CREDIT_CARD]: fromJS({
              component: 'CreditCard',
              selected: '',
              list: [],
              tempList: [],
              totalList: [],
              cardTypes: []
            })
          }),
          selectedType: PaymentTypes.CREDIT_CARD,
          isShow: true
        })
      }
    };
    const expectedState = fromJS({
      modules: fromJS({
        primary: fromJS({
          types: fromJS({
            [PaymentTypes.CREDIT_CARD]: fromJS({
              component: 'CreditCard',
              selected: '',
              list: [],
              tempList: [],
              totalList: [],
              cardTypes: []
            })
          }),
          selectedType: PaymentTypes.CREDIT_CARD,
          isShow: true
        })
      })
    });
    const returnedState = handler(expectedInitialState, params);
    expect(is(returnedState, expectedState)).to.be.true;
  });

  it('Should fetch saved creditcards successfully', () => {
    const handler = handlers[PAYMENT_UPDATE_SAVED_CREDITCARDS];
    const params = {
      payload: {
        body: {
          saved_cards: creditCards
        }
      }
    };
    const expectedCreditCards = fromJS(creditCards).map(card => card.set('id', `${card.get('card_type_id')}_${card.get('card_number')}`));
    const expectedState = fromJS({
      modules: fromJS({
        primary: fromJS({
          types: fromJS({
            [PaymentTypes.CREDIT_CARD]: fromJS({
              component: 'CreditCard',
              selected: expectedCreditCards.get(0),
              list: expectedCreditCards,
              tempList: [],
              totalList: expectedCreditCards,
              cardTypes: []
            }),
            [PaymentTypes.ECHECK]: fromJS({
              component: 'ECheck',
              selected: '',
              list: [],
              tempList: [],
              totalList: []
            })
          }),
          selectedType: PaymentTypes.CREDIT_CARD,
          isShow: true
        })
      })
    });
    const returnedState = handler(registeredState, params);
    expect(is(returnedState, expectedState)).to.be.true;
  });

  it('Should fetch saved echecks successfully', () => {
    const handler = handlers[PAYMENT_UPDATE_SAVED_ECHECKS];
    const params = {
      payload: {
        body: {
          saved_cards: eChecks
        }
      }
    };
    const expectedEChecks = fromJS(eChecks).map(card => card.set('id', `${card.get('card_type_id')}_${card.get('card_number')}`));
    const expectedState = fromJS({
      modules: fromJS({
        primary: fromJS({
          types: fromJS({
            [PaymentTypes.CREDIT_CARD]: fromJS({
              component: 'CreditCard',
              selected: '',
              list: [],
              tempList: [],
              totalList: [],
              cardTypes: []
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
    const returnedState = handler(registeredState, params);
    // console.log(returnedState.getIn(['modules', 'primary', 'types', 'Electronic Check']).toJS());
    expect(is(returnedState, expectedState)).to.be.true;
  });

  it('Should select the expected credit card item successfully', () => {
    const handler = handlers[PAYMENT_SELECT_ITEM];
    const expectedCreditCards = fromJS(creditCards).map(card => card.set('id', `${card.get('card_type_id')}_${card.get('card_number')}`));
    const params = {
      payload: {
        moduleName: 'primary',
        typeName: PaymentTypes.CREDIT_CARD,
        payItemId: expectedCreditCards.getIn([1, 'id'])
      }
    };
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
              cardTypes: []
            }),
            [PaymentTypes.ECHECK]: fromJS({
              component: 'ECheck',
              selected: '',
              list: [],
              tempList: [],
              totalList: []
            })
          }),
          selectedType: PaymentTypes.CREDIT_CARD,
          isShow: true
        })
      })
    });
    const expectedState = fromJS({
      modules: fromJS({
        primary: fromJS({
          types: fromJS({
            [PaymentTypes.CREDIT_CARD]: fromJS({
              component: 'CreditCard',
              selected: expectedCreditCards.get(1),
              list: expectedCreditCards,
              tempList: [],
              totalList: expectedCreditCards,
              cardTypes: []
            }),
            [PaymentTypes.ECHECK]: fromJS({
              component: 'ECheck',
              selected: '',
              list: [],
              tempList: [],
              totalList: []
            })
          }),
          selectedType: PaymentTypes.CREDIT_CARD,
          isShow: true
        })
      })
    });
    const returnedState = handler(initialState, params);
    expect(is(returnedState, expectedState)).to.be.true;
  });

  it('Should select the expected payment type successfully', () => {
    const handler = handlers[PAYMENT_CHANGE_TYPE];
    const expectedCreditCards = fromJS(creditCards).map(card => card.set('id', `${card.get('card_type_id')}_${card.get('card_number')}`));
    const params = {
      payload: {
        moduleName: 'primary',
        typeName: PaymentTypes.ECHECK
      }
    };
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
              cardTypes: []
            }),
            [PaymentTypes.ECHECK]: fromJS({
              component: 'ECheck',
              selected: '',
              list: [],
              tempList: [],
              totalList: []
            })
          }),
          selectedType: PaymentTypes.CREDIT_CARD,
          isShow: true
        })
      })
    });
    const expectedState = fromJS({
      modules: fromJS({
        primary: fromJS({
          types: fromJS({
            [PaymentTypes.CREDIT_CARD]: fromJS({
              component: 'CreditCard',
              selected: expectedCreditCards.get(0),
              list: expectedCreditCards,
              tempList: [],
              totalList: expectedCreditCards,
              cardTypes: []
            }),
            [PaymentTypes.ECHECK]: fromJS({
              component: 'ECheck',
              selected: '',
              list: [],
              tempList: [],
              totalList: []
            })
          }),
          selectedType: PaymentTypes.ECHECK,
          isShow: true
        })
      })
    });
    const returnedState = handler(initialState, params);
    expect(is(returnedState, expectedState)).to.be.true;
  });

  it('Should fetch the credit cart types successfully', () => {
    const handler = handlers[PAYMENT_UPDATE_CREDIT_CARD_TYPES];
    const expectedCreditCards = fromJS(creditCards).map(card => card.set('id', `${card.get('card_type_id')}_${card.get('card_number')}`));
    const params = {
      payload: {
        body: {
          card_types: creditCardTypes
        }
      }
    };
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
              list: [],
              tempList: [],
              totalList: []
            })
          }),
          selectedType: PaymentTypes.CREDIT_CARD,
          isShow: true
        })
      })
    });
    const expectedState = fromJS({
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
              list: [],
              tempList: [],
              totalList: []
            })
          }),
          selectedType: PaymentTypes.CREDIT_CARD,
          isShow: true
        })
      })
    });
    const returnedState = handler(initialState, params);
    expect(is(returnedState, expectedState)).to.be.true;
  });

  it('Should add the temporary credit cart successfully', () => {
    const handler = handlers[PAYMENT_ADD_TEMP_CREDIT_CARD];
    const expectedCreditCards = fromJS(creditCards).map(card => card.set('id', `${card.get('card_type_id')}_${card.get('card_number')}`));
    const tempItem = { id: '11_1111_isTemped', card_type_id: 22, save_name: 'xxx1111', card_number: 1111, card_type_flag: 5 };
    const params = {
      payload: {
        payItem: tempItem
      }
    };
    const initialState = fromJS({
      modules: fromJS({
        primary: fromJS({
          types: fromJS({
            [PaymentTypes.CREDIT_CARD]: fromJS({
              component: 'CreditCard',
              selected: '',
              list: expectedCreditCards,
              tempList: [],
              totalList: expectedCreditCards,
              cardTypes: fromJS(creditCardTypes)
            }),
            [PaymentTypes.ECHECK]: fromJS({
              component: 'ECheck',
              selected: '',
              list: [],
              tempList: [],
              totalList: []
            })
          }),
          selectedType: PaymentTypes.CREDIT_CARD,
          isShow: true
        })
      })
    });
    const tempList = fromJS([fromJS(tempItem)]);
    const expectedState = fromJS({
      modules: fromJS({
        primary: fromJS({
          types: fromJS({
            [PaymentTypes.CREDIT_CARD]: fromJS({
              component: 'CreditCard',
              selected: '',
              list: expectedCreditCards.concat(tempList),
              tempList,
              totalList: expectedCreditCards,
              cardTypes: fromJS(creditCardTypes)
            }),
            [PaymentTypes.ECHECK]: fromJS({
              component: 'ECheck',
              selected: '',
              list: [],
              tempList: [],
              totalList: []
            })
          }),
          selectedType: PaymentTypes.CREDIT_CARD,
          isShow: true
        })
      })
    });
    const returnedState = handler(initialState, params);
    console.log(returnedState.getIn(['modules', 'primary', 'types', TYPES.CreditCard, 'tempList']).toJS());
    console.log(expectedState.getIn(['modules', 'primary', 'types', TYPES.CreditCard, 'tempList']).toJS());
    expect(is(returnedState, expectedState)).to.be.true;
  });
});
