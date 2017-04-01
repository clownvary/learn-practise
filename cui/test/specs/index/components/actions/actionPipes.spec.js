import { fromJS } from 'immutable';
import configureStore from 'redux-mock-store';
import middlewares from 'utils/middlewares';
import * as actions from 'index/components/Master/actions';
import { FETCH_SHOPPINGCART_COUNT_SUCCESS } from 'index/components/Master/actions';

describe('index/components/actions/commonActions', () => {
    describe('Dispatch Action(UI): commonPageRenderActions', () => {
        it('Should return expected Action Object.', () => {
            const mockStore = configureStore(middlewares);
            let store = mockStore({
                common: {
                    myCart: {
                        cartCount: 100
                    }
                }
            });
            const {commonPageRenderActions} = actions;
            store.dispatch(commonPageRenderActions()).then(() => {
                expect(store.getActions()[2].type).to.equal(FETCH_SHOPPINGCART_COUNT_SUCCESS);
            });
        });
    });


});
