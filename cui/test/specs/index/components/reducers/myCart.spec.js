import { is, fromJS } from "immutable";
import * as actions from "index/components/Master/actions";
import myCartReducer from "index/components/Master/reducers";

describe("index/components/reducers/myCart", () => {

  const expectedInitialState = fromJS({
    cart_count: 0
  });

  it("Should fetch shopping chart count data successfully", () => {
    const {FETCH_SHOPPINGCART_COUNT_SUCCESS} = actions;
    const returnState = myCartReducer(undefined, {
      type: FETCH_SHOPPINGCART_COUNT_SUCCESS,
      payload: {
        body: {
          cart_count: 123
        }
      }
    });
    expect(returnState.get("cartCount")).to.equal(123);
  });

  it("Should fetch shopping chart count data default", () => {
    const {FETCH_SHOPPINGCART_COUNT_SUCCESS} = actions;
    const returnState = myCartReducer(undefined, {
      type: "UN_KNOW_HANDLER",
      payload: {}
    });
    expect(returnState.get("cartCount")).to.equal(0);
  });
});
