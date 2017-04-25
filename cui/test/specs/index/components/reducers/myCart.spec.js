import { is, fromJS } from "immutable";
import * as actions from "index/components/Master/actions";
import myCartReducer from "index/components/Master/reducers";
import { MASTER_UI_SHOPPINGCART_COUNT } from 'index/components/Master/consts/actionTypes';

describe("index/components/reducers/myCart", () => {

  const expectedInitialState = fromJS({
    cart_count: 0
  });

  it("Should fetch shopping chart count data successfully", () => {
    const returnState = myCartReducer(undefined, {
      type: MASTER_UI_SHOPPINGCART_COUNT,
      payload: 123
    });
    expect(returnState.get("cartCount")).to.equal(123);
  });

  it("Should fetch shopping chart count data default", () => {
    const returnState = myCartReducer(undefined, {
      type: "UN_KNOW_HANDLER",
      payload: {}
    });
    expect(returnState.get("cartCount")).to.equal(0);
  });
});
