import { createFSA } from 'react-base-ui/lib/utils';
import API from '../api';
import {
  WAIVERS_UI_LIST,
  WAIVERS_UI_HIDE_WARNING,
  WAIVERS_UI_AGREEMENT
} from '../consts/actionTypes';


const uiWaiversListAction = createFSA(WAIVERS_UI_LIST);

export const hideWarningAlertAction = createFSA(WAIVERS_UI_HIDE_WARNING);
export const changeAgreementEntryAction = createFSA(WAIVERS_UI_AGREEMENT);


export const fetchWaiversAction = () => dispatch =>
  API.getWaivers().then((response) => {
    const { body: { waivers } } = response;
    dispatch(uiWaiversListAction(waivers));
  });
