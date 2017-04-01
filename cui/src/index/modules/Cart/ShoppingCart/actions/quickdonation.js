import { createFSA } from 'react-base-ui/lib/utils';
import { commonPageRenderActions } from 'index/components/Master/actions';
import { syncLegencyCUISessionAction } from 'shared/actions/syncSession';
import { fetchTransactionsAction } from './transactions';
import { fetchWaiversAction } from './waiver';
import { getShoppingCartNeedPayAction } from './checkout';
import API from '../api';
import {
  DONATIONS_UI_AMOUNT,
  DONATIONS_UI_CAMPAIGN,
  DONATIONS_UI_LIST
} from '../consts/actionTypes';

const uiDonationsAction = createFSA(DONATIONS_UI_LIST);


export const changeAmountAction = createFSA(DONATIONS_UI_AMOUNT);
export const changeCampaignAction = createFSA(DONATIONS_UI_CAMPAIGN);

export const fetchQuickDonationAction = () => (dispatch, getState) => {
  const configurations = getState().configurations;
  if (configurations.get('enable_quick_donation_in_cart') && configurations.get('allow_donations_online')) {
    return API.getQuickDonation().then((response) => {
      const donations = response.body.donations;
      dispatch(uiDonationsAction(donations));
    });
  }

  return false;
};

export const submitQuickDonationAction = () => (dispatch, getState) => {
  const quickdonation = getState().modules.Cart.ShoppingCart.quickdonation;
  const dueAmount = `${quickdonation.get('amount')}`;
  const campaignId = quickdonation.get('selectedCampaignValue');

  return API.setQuickDonation({
    body: {
      due_amount: dueAmount,
      campaign_id: campaignId
    } }).then(() => dispatch(syncLegencyCUISessionAction()))
    .then(() => dispatch(fetchTransactionsAction()))
    .then(() => dispatch(fetchWaiversAction()))
    .then(() => {
      dispatch(changeAmountAction(null));
      dispatch(changeCampaignAction(null));
    })
    .then(() => dispatch(getShoppingCartNeedPayAction()))
    .then(() => dispatch(commonPageRenderActions()));
};
