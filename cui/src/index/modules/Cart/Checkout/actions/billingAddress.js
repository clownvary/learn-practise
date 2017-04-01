import { createFSA } from 'react-base-ui/lib/utils';
import { confirm } from 'react-base-ui/lib/confirmation';
import mapValues from 'lodash/mapValues';
import invert from 'lodash/invert';
import stringHelper from 'shared/utils/stringHelper';
import API from '../api';
import { billingAddressFormFields as fields, formModes } from '../consts';
import {
  BILLINGADDRESS_UI_LIST,
  BILLINGADDRESS_UI_SELECTED,
  BILLINGADDRESS_UI_FORM_SHOW,
  BILLINGADDRESS_UI_FORM_FIELD,
  BILLINGADDRESS_UI_FORM_VALIDATION,
  BILLINGADDRESS_UI_FORM_FIELD_VALIDATION,
  BILLINGADDRESS_UI_FORM_CANCEL,
  BILLINGADDRESS_UI_COUNTRYSTATE,
  BILLINGADDRESS_UI_COUNTRY_SELECTED,
  BILLINGADDRESS_ON_CREATE,
  BILLINGADDRESS_ON_UPDATE
} from '../consts/actionTypes';


const uiCountryStateAction = createFSA(BILLINGADDRESS_UI_COUNTRYSTATE);
const uiBillingAddressListAction = createFSA(BILLINGADDRESS_UI_LIST);
const uiFormShowAction = createFSA(BILLINGADDRESS_UI_FORM_SHOW);
const uiSelectBillingAddressAction = createFSA(BILLINGADDRESS_UI_SELECTED);
const uiSelectCountryAction = createFSA(BILLINGADDRESS_UI_COUNTRY_SELECTED);
const uiFormValidationAction = createFSA(BILLINGADDRESS_UI_FORM_VALIDATION);
const uiCancelAction = createFSA(BILLINGADDRESS_UI_FORM_CANCEL);
const uiFormFieldAction = createFSA(
  BILLINGADDRESS_UI_FORM_FIELD,
  (fieldType, value) => ({ fieldType, value })
);
const uiFormFieldValidationAction = createFSA(
  BILLINGADDRESS_UI_FORM_FIELD_VALIDATION,
  (fieldType, error) => ({ fieldType, error })
);
const onCreateBillingAddressActionRaw = createFSA(BILLINGADDRESS_ON_CREATE);
const onUpdateBillingAddressActionRaw = createFSA(BILLINGADDRESS_ON_UPDATE);


const validateField = (fieldType, value, formMode = formModes.VIEW) => {
  switch (formMode) {
    case formModes.CREATE:
      switch (fieldType) {
        case fields.FIRST:
        case fields.LAST:
        case fields.ADDRESS1:
        case fields.COUNTRY:
        case fields.CITY:
        case fields.STATE:
        case fields.ZIPCODE:
          if (stringHelper.isNullOrEmpty(value)) {
            return 'errorMessageRequired';
          }
          break;
        case fields.CUSTOMERID:
        case fields.ADDRESS2:
        case fields.MAILINGNAME:
        default:
          break;
      }
      break;
    case formModes.UPDATE:
      switch (fieldType) {
        case fields.MAILINGNAME:
        case fields.ADDRESS1:
        case fields.COUNTRY:
        case fields.CITY:
        case fields.STATE:
        case fields.ZIPCODE:
          if (stringHelper.isNullOrEmpty(value)) {
            return 'errorMessageRequired';
          }
          break;
        case fields.FIRST:
        case fields.LAST:
        case fields.CUSTOMERID:
        case fields.ADDRESS2:
        default:
          break;
      }
      break;
    default:
      break;
  }

  return '';
};

const validateForm = (formData, formMode) => {
  const err = mapValues(invert(fields),
    (value, key) => validateField(key, formData[key], formMode));

  err.isValidated = !Object.keys(fields)
    .some(field => !stringHelper.isNullOrEmpty(err[fields[field]]));

  return err;
};

const createBillingAddress = data => API.createBillingAddress({ body: data });
const updateBillingAddress = data => API.updateBillingAddress({ body: data });
const changePayer = newPayerId => API.changePayer({ body: { payerid: newPayerId } });

export const getCountryStateAction = () => dispatch =>
  API.getCountryState().then((response) => {
    const { body: { countries } } = response;
    dispatch(uiCountryStateAction({ countries }));
  });

export const getBillingAddressAction = () => dispatch =>
  API.getBillingAddress().then((response) => {
    const { body: { billing_infos: billingInfos } } = response;
    dispatch(uiBillingAddressListAction({ billingInfos }));
  });

export const onCreateBillingAddressAction = () =>
  dispatch => dispatch(onCreateBillingAddressActionRaw());

export const onUpdateBillingAddressAction = () =>
  dispatch => dispatch(onUpdateBillingAddressActionRaw());

export const selectBillingAddressAction = selectedCustomerId =>
  (dispatch) => {
    dispatch(uiSelectBillingAddressAction({ selectedCustomerId }));
    return changePayer(selectedCustomerId);
  };

export const showBillingAddressFormAction = () =>
  dispatch => dispatch(uiFormShowAction({ display: true }));

export const hideBillingAddressFormAction = () =>
  dispatch => dispatch(uiFormShowAction({ display: false }));

export const selectCountryAction = (countryId, formMode) => (dispatch) => {
  dispatch(uiSelectCountryAction({ countryId }));
  return dispatch(
    uiFormFieldValidationAction(fields.COUNTRY,
      validateField(fields.COUNTRY, countryId, formMode))
  );
};

export const changeFormFieldAction = (fieldType, value, formMode) => (dispatch) => {
  dispatch(uiFormFieldAction(fieldType, value));
  return dispatch(uiFormFieldValidationAction(fieldType,
    validateField(fieldType, value, formMode)));
};

export const submitAction = () => (dispatch, getState) => {
  const state = getState().modules.Cart.Checkout.billingAddress;
  const formData = state.get('formData').toJS();
  const formMode = state.get('formMode');

  const errors = validateForm(formData, formMode);

  dispatch(uiFormValidationAction({ formErrors: errors }));

  if (errors.isValidated) {
    const result = formMode === formModes.UPDATE ?
      updateBillingAddress(formData) :
      createBillingAddress(formData);

    return result.then(({ body: { error_message: errMsg } }) => {
      if (stringHelper.isNullOrEmpty(errMsg)) {
        return dispatch(getBillingAddressAction())
          .then(() => dispatch(uiCancelAction()));
      }

      confirm(errMsg, { title: 'Error' });
      return Promise.reject(errMsg);
    });
  }

  return Promise.reject();
};

export const cancelAction = () => dispatch => dispatch(uiCancelAction());
