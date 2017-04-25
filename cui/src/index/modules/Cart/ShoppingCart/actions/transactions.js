import { createFSA } from 'react-base-ui/lib/utils';
import { clearAll } from 'react-base-ui/lib/messages';
import { commonPageRenderActions } from 'index/components/Master/actions';
import { fetchWaiversAction } from './waiver';
import { getShoppingCartNeedPayAction, uiClearWaiverErrors } from './checkout';
import API from '../api';
import { TRANSACTIONS_UI_LIST } from '../consts/actionTypes';


const uiTransactionsListAction = createFSA(TRANSACTIONS_UI_LIST);

const hasIncompletedTransaction = (participants = []) =>
        participants.some(participant =>
          participant.transactions.some(transaction => !transaction.online_entry_completed));


export const fetchTransactionsAction = () => dispatch =>
  API.getTransactions().then((response) => {
    const { body: { participants, order_summary: orderSummary } } = response;
    dispatch(uiTransactionsListAction({ participants, orderSummary }));
    uiClearWaiverErrors();
    if (!participants || !participants.length || !hasIncompletedTransaction(participants)) {
      clearAll();
    }
  });

export const deleteTransactionClusterAction = id =>
  dispatch => API.deleteTransaction({ id })
    .then(() => dispatch(fetchTransactionsAction()))
    .then(() => dispatch(fetchWaiversAction()))
    .then(() => dispatch(getShoppingCartNeedPayAction()))
    .then(() => dispatch(commonPageRenderActions()));
