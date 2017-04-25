import Promise from 'bluebird';
import { showError, clearError } from 'react-base-ui/lib/messages';
import { createFSA } from 'react-base-ui/lib/utils';
import { reportError } from 'react-base-ui/lib/actions';
import { ErrorObj, ErrorTypeEnum } from 'react-base-ui/lib/errors';
import { routerActions } from 'react-router-redux';
import { commonPageRenderActions } from 'index/components/Master/actions';
import { syncLegencyCUISessionAction } from 'index/actions/syncSession';
import orderSummaryMessages from 'shared/translation/messages/Cart/orderSummary';
import API from '../api';
import { uiValidateAgreementAction } from './waiver';
import {
  CHECKOUT_UI_NEEDPAY,
  CHECKOUT_UI_VALIDATION
} from '../consts/actionTypes';


const uiNeedPayAction = createFSA(CHECKOUT_UI_NEEDPAY);
const uiValidationAction = createFSA(CHECKOUT_UI_VALIDATION);


export const getShoppingCartNeedPayAction = () => dispatch =>
  API.needPay().then((response) => {
    const { body: { need_pay: needPay } } = response;
    dispatch(uiNeedPayAction(needPay));
  }
);

function checkFinalWaiver(finalWaiver) {
  let isPass = true;
  if (!finalWaiver) return false;

  if (finalWaiver.required && !(finalWaiver.value)) {
    isPass = false;
  }
  return isPass;
}

export const checkoutShoppingCartAction = () => (dispatch, getState) => {
  const { waivers, waiversAgreements } = getState().modules.Cart.ShoppingCart.waiver.toJS();
  let submitDatas = {};

  if (waivers && waivers.attachments) {
    const initials = waivers.attachments.map(item => ({
      attached_checklist_item_Id: item.attached_checklist_item_Id,
      activity_id: item.activity_id,
      stage_id: item.stage ? item.stage.id : 0,
      initial: waiversAgreements[item.id] ? waiversAgreements[item.id].value : '',
      reno: item.reno,
      internal_reno: 0
    }));

    submitDatas = {
      waiver_initials_online_text: true,
      online_waiver_initials: waivers.waiver_initials_online_text,
      initials
    };
  }

  return API.checkout({ body: submitDatas }).then(() => {
    dispatch(syncLegencyCUISessionAction());
    const checkout = getState().modules.Cart.ShoppingCart.checkout;
    const validatePass = checkout.get('validatePass');
    if (validatePass) {
      const needPay = checkout.get('needPay');
      const nextPageUrl = needPay ? 'newcart/checkout' : 'newcart/checkout/confirmation';
      dispatch(commonPageRenderActions());
      dispatch(routerActions.push(`${window.__siteBaseName}/${nextPageUrl}`));
    }
  }).catch((error) => {
    if (error instanceof ErrorObj) {
      error.type = ErrorTypeEnum.APP;
      error.messageGroup.title = '';
      return dispatch(reportError(error));
    }

    return Promise.reject(error);
  });
};

export const uiShowWaiverErrors = () => {
  const errorMsg = orderSummaryMessages.waiverError.defaultMessage;
  showError(errorMsg, { appendMode: true });
};

export const uiClearWaiverErrors = () => {
  const errorMsg = orderSummaryMessages.waiverError.defaultMessage;
  clearError([errorMsg]);
};

export const validateWaiversAction = () => (dispatch, getState) => {
  const { waivers, waiversAgreements } = getState().modules.Cart.ShoppingCart.waiver.toJS();
  let canCheckout = !waivers;
  if (!canCheckout && waiversAgreements) {
    const { final_initials_waiver, final_system_waiver } = waiversAgreements;
    // check waiver items
    let itemWaiverFlag = true;
    if (waivers && waivers.attachments) {
      waivers.attachments.forEach((item) => {
        const agreement = waiversAgreements[item.id];

        if (agreement.required && !(agreement.value)) {
          itemWaiverFlag = false;
        }
      });
    }
    // check final waiver
    const finalWaiverFlag = checkFinalWaiver(final_initials_waiver)
      && checkFinalWaiver(final_system_waiver);

    canCheckout = itemWaiverFlag && finalWaiverFlag;
  }

  dispatch(uiValidationAction({ isPass: canCheckout }));
  return canCheckout ? Promise.resolve() : Promise.reject();
};

export const validateAndCheckoutShoppingCartAction = () => (dispatch, getState) =>
  dispatch(validateWaiversAction()(dispatch, getState)).then(
    () => {
      uiClearWaiverErrors();
      dispatch(checkoutShoppingCartAction());
    },
    () => {
      uiShowWaiverErrors();
      dispatch(uiValidateAgreementAction());
      window.scrollTo(0, 0);
    }
  );
