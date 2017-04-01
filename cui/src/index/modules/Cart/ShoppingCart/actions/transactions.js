import { createFSA } from 'react-base-ui/lib/utils';
import { commonPageRenderActions } from 'index/components/Master/actions';
import { fetchWaiversAction } from './waiver';
import { getShoppingCartNeedPayAction } from './checkout';
import API from '../api';
import { TRANSACTIONS_UI_LIST } from '../consts/actionTypes';


const uiTransactionsListAction = createFSA(TRANSACTIONS_UI_LIST);


export const fetchTransactionsAction = () => dispatch =>
  API.getTransactions().then((response) => {
    const { body: { participants, order_summary: orderSummary } } = response;
    dispatch(uiTransactionsListAction({ participants, orderSummary }));
  });

export const deleteTransactionClusterAction = id =>
  dispatch => API.deleteTransaction({ id })
    .then(() => dispatch(fetchTransactionsAction()))
    .then(() => dispatch(fetchWaiversAction()))
    .then(() => dispatch(getShoppingCartNeedPayAction()))
    .then(() => dispatch(commonPageRenderActions()));
