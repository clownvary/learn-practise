
import { createFSA } from 'react-base-ui/lib/utils';
import API from '../api';
import {
  ORDERSUMMARY_UI
} from '../consts/actionTypes';


const uiOrderSummary = createFSA(ORDERSUMMARY_UI);

/* eslint-disable import/prefer-default-export */
export const fetchOrderSummary = () => dispatch =>
  API.getOrderSummary().then((response) => {
    const { body: { order_summary: orderSummary = {} } } = response;
    dispatch(uiOrderSummary(orderSummary));
  });
/* eslint-enable import/prefer-default-export */
