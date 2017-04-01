import { is, fromJS } from 'immutable';
import {
  WAIVERS_UI_LIST,
  WAIVERS_UI_HIDE_WARNING,
  WAIVERS_UI_AGREEMENT
} from 'index/modules/Cart/ShoppingCart/consts/actionTypes';
import waiverReducer from 'index/modules/Cart/ShoppingCart/reducers/waiver';

describe('index/modules/Cart/ShoppingCart/reducers/waiver', () => {
  const defaultWaiversAgreements = fromJS({
    final_system_waiver: { required: true, value: false },
    final_initials_waiver: { required: true, value: '' }
  });

  const expectedInitialState = fromJS({
    waivers: null,
    waiversAgreements: defaultWaiversAgreements,
    warningAlertShown: true
  });

  it('Should return the expected initial state', () => {
    expect(is(expectedInitialState, waiverReducer(undefined, {}))).to.be.true;
  });

  it('Should fetch waiver data successfully', () => {
    const returnState = waiverReducer(undefined, {
      type: WAIVERS_UI_LIST,
      payload: {
        body: {
          waivers: {
            waiver_text: 'This is online waiver.',
            waiver_text_donation: '',
            waiver_initials_online_text: '',
            require_waiver_scrollbottom: true,
            attachments: [{
              stage: {
                id: 40
              },
              reno: 0,
              required_before_completing_transaction: true,
              require_initials_online: true
            }, {
              stage: {
                id: 50
              },
              reno: 1,
              required_before_completing_transaction: true,
              require_initials_online: false
            }]
          },
          waiversAgreements: defaultWaiversAgreements,
          warningAlertShown: true
        }
      }
    });
    const excepedWaiversAgreements = {
      '40_0': { required: true, value: '' },
      '50_1': { required: true, value: false },
      final_system_waiver: { required: true, value: false },
      final_initials_waiver: { required: false, value: '' }
    };
    expect(returnState.get('waiversAgreements').toJS()).to.deep.equal(excepedWaiversAgreements);
    expect(returnState.getIn(['waivers', 'waiver_text'])).to.equal('This is online waiver.');
  });

  it('Should hide Warning Alert successfully', () => {
    expect(waiverReducer(undefined, {
      type: WAIVERS_UI_HIDE_WARNING
    }).get('warningAlertShown')).to.equal(false);
  });

  it('Should change agreement item\'s value successfully', () => {
    expect(waiverReducer(undefined, {
      type: WAIVERS_UI_AGREEMENT,
      payload: { id: 'final_system_waiver', value: true }
    }).getIn(['waiversAgreements', 'final_system_waiver', 'value'])).to.equal(true);
  });

  it('Should change agreement item\'s value unsuccessfully', () => {
    expect(waiverReducer(undefined, {
      type: WAIVERS_UI_AGREEMENT,
      payload: { id: 100, value: true }
    }).getIn(['waiversAgreements', '100'])).to.equal(undefined);
  });
});
