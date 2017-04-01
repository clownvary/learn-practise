import { fromJS } from 'immutable';
import reducerHandler from 'shared/utils/reducerHandler';
import {
  WAIVERS_UI_LIST,
  WAIVERS_UI_HIDE_WARNING,
  WAIVERS_UI_AGREEMENT
} from '../consts/actionTypes';

const defaultWaiversAgreements = fromJS({
  final_system_waiver: {
    required: true,
    value: false
  },
  final_initials_waiver: {
    required: true,
    value: ''
  }
});

const initialState = fromJS({
  waivers: null,
  waiversAgreements: defaultWaiversAgreements,
  warningAlertShown: true
});

const handlers = {
  [WAIVERS_UI_LIST](state, { payload: waivers }) {
    const {
      waiver_text: waiverText,
      waiver_text_donation: waiverTextDonation,
      waiver_initials_online_text: waiverInitialsOnlineText,
      require_waiver_scrollbottom: requireWaiverScrollbottom
    } = waivers || {};
    const systemWaiverRequired = Boolean(waiverText || waiverTextDonation);
    const initialsWaiverRequired = Boolean(waiverInitialsOnlineText);

    return state.withMutations((s) => {
      s.set('waivers', fromJS(waivers));
      s.set('warningAlertShown', true);
      s.set('warningAlertShown',
        systemWaiverRequired &&
        s.get('warningAlertShown') &&
        requireWaiverScrollbottom
      );

      s.set('waiversAgreements', defaultWaiversAgreements.update(agms => agms.map((a, name) => {
        switch (name) {
          case 'final_system_waiver':
            a = a.set('required', systemWaiverRequired);
            break;
          case 'final_initials_waiver':
            a = a.set('required', initialsWaiverRequired);
            break;
          default:
            break;
        }
        return a;
      })));

      if (waivers && waivers.attachments) {
        s.updateIn(['waivers', 'attachments'], attachments => attachments.map((atch) => {
          const {
            reno,
            checked,
            online_waiver_initials: onlineWaiverInitials,
            require_initials_online: requireInitialsOnline,
            stage: { id },
            required_before_completing_transaction: required } = atch.toJS();

          /**
           * Create id for each attachment as unique identification.
           */
          const atchID = `${id}_${reno}`;
          s.setIn(['waiversAgreements', atchID], fromJS({
            required,
            value: requireInitialsOnline ? (onlineWaiverInitials || '') : (!!checked)
          }));
          return atch.set('id', atchID);
        }));
      }
    });
  },

  [WAIVERS_UI_HIDE_WARNING](state) {
    return state.set('warningAlertShown', false);
  },

  [WAIVERS_UI_AGREEMENT](state, { payload: { id, value } }) {
    return state.getIn(['waiversAgreements', id]) === undefined ? state :
      state.setIn(['waiversAgreements', id, 'value'], value);
  }
};

export default reducerHandler(initialState, handlers);
