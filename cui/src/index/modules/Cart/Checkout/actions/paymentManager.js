import { fromJS } from 'immutable';
import { createFSA } from 'react-base-ui/lib/utils';
import AMS from 'shared/business/creditCard/ams-security-api';
import { maskCard } from 'shared/business/creditCard/validation';
import API from '../api';
import * as PaymentTypes from '../consts/paymentTypes';
import {
  PAYMENT_REGISTER_MODULE,
  PAYMENT_CHANGE_TYPE,
  PAYMENT_SELECT_ITEM,
  PAYMENT_UPDATE_SAVED_CREDITCARDS,
  PAYMENT_UPDATE_SAVED_ECHECKS,
  PAYMENT_UPDATE_CREDIT_CARD_TYPES,
  PAYMENT_ADD_TEMP_CREDIT_CARD
} from '../consts/actionTypes';


export const MODULE = fromJS({
  types: {
    [PaymentTypes.CREDIT_CARD]: {
      component: 'CreditCard',
      selected: '',
      list: [],
      tempList: [],
      totalList: [],
      cardTypes: []
    },
    [PaymentTypes.ECHECK]: {
      component: 'ECheck',
      selected: '',
      list: [],
      tempList: [],
      totalList: []
    }
  },
  selectedType: PaymentTypes.CREDIT_CARD,
  isShow: true
});

const registerModule = createFSA(PAYMENT_REGISTER_MODULE);
const updateCreditCardTypes = createFSA(PAYMENT_UPDATE_CREDIT_CARD_TYPES);
const updateSavedCreditCards = createFSA(PAYMENT_UPDATE_SAVED_CREDITCARDS);
const updateSavedEChecks = createFSA(PAYMENT_UPDATE_SAVED_ECHECKS);
const addTempCreditCardActoin = createFSA(PAYMENT_ADD_TEMP_CREDIT_CARD);

export const selectItemActoin = createFSA(PAYMENT_SELECT_ITEM,
  (moduleName, typeName, payItemId, toTop = false) => ({ moduleName, typeName, payItemId, toTop })
);

export const changePaymentTypeActoin = createFSA(PAYMENT_CHANGE_TYPE,
  (moduleName, typeName) => ({ moduleName, typeName })
);

export const fetchCreditCardTypesAction = () => dispatch =>
  API.getCreditCardTypes().then((response) => {
    const { body: { card_types: cardTypes } } = response;
    dispatch(updateCreditCardTypes(cardTypes));
    return response;
  });

export const fetchSavedCreditCardsAction = (cardTypes = fromJS([])) => (dispatch) => {
  const types = cardTypes.map(type => type.id).join(',');
  return API.getSavedCreditCards({ types }).then((response) => {
    const { body: { saved_cards: savedCards } } = response;
    dispatch(updateSavedCreditCards(savedCards));
    return response;
  });
};

export const fetchSavedEChecksAction = () => dispatch =>
  API.getSavedEChecks().then((response) => {
    const { body: { saved_cards: savedCards } } = response;
    dispatch(updateSavedEChecks(savedCards));
    return response;
  });

export const registerModuleActoin = (moduleName, types, defaultType) => (dispatch, getState) => {
  let module = defaultType ? MODULE.set('selectedType', defaultType) : MODULE;
  module = module.update('types', (_types) => {
    _types = _types.filter((type, typeName) => fromJS(types).find(name => name === typeName));
    return _types.map((type) => {
      switch (type.get('component')) {
        case 'CreditCard': {
          const merchantName = getState().configurations.get('ams_merchant_name');
          return type.set('merchantName', merchantName);
        }
        default:
          return type;
      }
    });
  });
  return dispatch(registerModule({
    moduleName,
    module
  }));
};


export const addCreditCardAction = (moduleName, {
  ccNumber,
  ccExpiryYear,
  ccExpiryMonth,
  ccCVVandCVC,
  ccSaveForFurture,
  ccCardTypes,
  ccCardTypeItem = {}
}) => (dispatch) => {
  const maskedCardNumber = maskCard(ccNumber);
  const cardNumber = maskedCardNumber.replace(/xxx/g, '');
  const cardExpiration = `${ccExpiryMonth}/${ccExpiryYear}`;
  const payItemId = `${ccCardTypeItem.get('id')}_${cardNumber}${ccSaveForFurture ? '' : '_isTemped'}`;
  /**
   * Step 1:
   *  fetch AMS token and then goto setp 2.
   */
  return API.getAMSToken()
    /**
     * Step 2:
     *  1. If returned modulus is 'localdemo', directly goto step 3.
     *  2. If returned modulus is not 'localdemo', fetch AMS account id and then
     *     goto setp 3.
     */
    .then(({ body: { ams_token: { modulus = '', exponent = '' } } }) => {
      if (modulus !== 'localdemo') {
        const request = new AMS.AccountInfo();
        request.setCCNumber(ccNumber);
        request.setCCExpMonth(`${ccExpiryMonth}`);
        request.setCCExpYear(`${ccExpiryYear}`);
        request.setCCType(ccCardTypeItem.get('card_type'));
        request.setModulus(modulus);
        request.setExponent(exponent);

        const cipherText = AMS.getCipher(request);

        return API.getAMSAccountId({
          cipher_text: cipherText,
          ams_retention_date: '',
          time: new Date().getTime(),
          cc_ams_account_id_modulus: modulus,
          key_number: ccCVVandCVC,
          is_ecp: false
        });
      }
      return {
        body: {
          ams_account: {
            wallet_id: 'Demo AccountID'
          }
        }
      };
    })
    /**
     * Step 3:
     *  1. If 'ccSaveForFurture' is false, directly goto setp 4.
     *  2. If 'ccSaveForFurture' is true, save Credit Card record to server and
     *     then goto setp 4.
     */
    .then(({ body: { ams_account: { wallet_id } } }) => {
      const payItem = {
        ams_account_id: wallet_id,
        save_name: maskedCardNumber,
        card_number: maskedCardNumber,
        card_expiration: cardExpiration,
        card_type_id: ccCardTypeItem.get('id')
      };
      if (ccSaveForFurture) {
        return API.saveCreditCard({ body: { ...payItem } });
      }
      return {
        id: payItemId,
        card_type_flag: ccCardTypeItem.get('card_type_id'),
        ...payItem
      };
    })
    /**
     * Step 4: Add new added credit card info to ui layer.
     *  1. If 'ccSaveForFurture' is false, directly add the card info to ui layer.
     *  2. If 'ccSaveForFurture' is true, fetch saved credit card list again, then
     *     add the card info to ui layer.
     */
    .then((payItem) => {
      if (ccSaveForFurture) {
        return dispatch(fetchSavedCreditCardsAction(ccCardTypes.toJS()));
      }
      return dispatch(addTempCreditCardActoin({
        ...payItem, ...{ card_number: cardNumber }
      }));
    })
    /**
     * Step 5: Select the new added credit card item.
     */
    .then(() =>
      dispatch(selectItemActoin(moduleName, PaymentTypes.CREDIT_CARD, payItemId, true)));
};

export const addPayItemActoin = (moduleName, typeName, payItemInfo) => (dispatch) => {
  switch (typeName) {
    case PaymentTypes.CREDIT_CARD:
      return dispatch(addCreditCardAction(moduleName, payItemInfo));
    case PaymentTypes.ECHECK:
      return dispatch(/* add echeck action */);
    default:
      return '';
  }
};
