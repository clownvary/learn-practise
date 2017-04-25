import { is, fromJS } from 'immutable';
import * as actionTypes from 'index/modules/Cart/ShoppingCart/consts/actionTypes';
import transactionsReducer from 'index/modules/Cart/ShoppingCart/reducers/transactions';

describe('index/modules/Cart/ShoppingCart/reducers/transactions', () => {
  const expectedInitialState = fromJS({
    participants: fromJS([]),
    orderSummary: null
  });

  it('Should return the expected initial state', () => {
    expect(is(expectedInitialState, transactionsReducer(undefined, {}))).to.be.true;
  });

  // TODO after react-base-ui
  it.skip('Should fetch transactions data successfully', () => {
    const { TRANSACTIONS_UI_LIST } = actionTypes;
    const returnState = transactionsReducer(undefined, {
      type: TRANSACTIONS_UI_LIST,
      payload: {
        body: {
          participants: 1,
          order_summary: 2
        }
      }
    });
    expect(returnState.get('participants')).to.equal(1);
    expect(returnState.get('orderSummary')).to.equal(2);
  });
});
