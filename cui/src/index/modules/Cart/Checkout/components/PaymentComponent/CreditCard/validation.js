import { cardValidation } from 'react-base-ui/lib/helper/payment/validation';

const EMPTYERROR = {
  ccNumber: '',
  ccCardType: '',
  ccExpiry: '',
  ccCVVandCVC: ''
};

/**
 * [cardTypes] - Immutable type.
 */
export const checkoutCardTypeId = (number, cardTypes) => {
  const typeId = cardValidation(number);
  return cardTypes.some(type => type.get('card_type_id') === typeId && !type.get('retired')) ? typeId : null;
};

/**
 * [cardTypes] - Immutable type.
 */
export const getCardTypeItem = (number, cardTypes) => {
  const typeId = cardValidation(number);
  return cardTypes.find(type => type.get('card_type_id') === typeId);
};

export default class Validation {

  constructor() {
    this.errors = { ...EMPTYERROR };
    this.ccNumber = null;
    this.ccCardTypeId = null;
    this.ccCardList = [];
    this.ccExpiryMonth = null;
    this.ccExpiryYear = null;
    this.ccCVVandCVC = null;
  }

  validate({
    ccNumber, ccCardTypeId, ccCardList,
    ccExpiryMonth, ccExpiryYear, ccCVVandCVC
  }, triggerField) {
    this.ccNumber = ccNumber;
    this.ccCardTypeId = ccCardTypeId;
    this.ccCardList = ccCardList || [];
    this.ccExpiryMonth = ccExpiryMonth;
    this.ccExpiryYear = ccExpiryYear;
    this.ccCVVandCVC = ccCVVandCVC;
    switch (triggerField) {
      case 'ccNumber':
        this.porcessCCNumber();
        // if (this.ccCVVandCVC) {
        //   this.processCVVandCVC();
        // }
        break;
      case 'ccExpiryMonth':
        this.processExpiry();
        break;
      case 'ccExpiryYear':
        this.processExpiry();
        break;
      case 'ccCVVandCVC':
        this.processCVVandCVC();
        break;
      default:
        this.porcessCCNumber();
        this.processExpiry();
        this.processCVVandCVC();
        break;
    }
  }

  getErrors() {
    return this.errors;
  }

  hasError() {
    const { ccNumber, ccCardType, ccExpiry, ccCVVandCVC } = this.errors;
    return !!ccNumber || !!ccCardType || !!ccExpiry || !!ccCVVandCVC;
  }

  porcessCCNumber() {
    if (!this.ccNumber) {
      this.errors.ccNumber = 'error_cc_required';
      this.errors.ccCardType = '';
      return;
    }
    this.errors.ccNumber = '';

    if (this.ccCardTypeId === null) {
      this.errors.ccCardType = 'error_cc_card_type_invalid';
      return;
    }
    if (!this.ccCardTypeId) {
      this.errors.ccCardType = 'error_cc_card_type_undetermined';
    } else {
      this.errors.ccCardType = '';
    }
  }

  processExpiry() {
    if (!this.ccExpiryYear || !this.ccExpiryMonth) {
      this.errors.ccExpiry = 'error_cc_required';
      return;
    }
    this.errors.ccExpiry = '';

    const year = new Date().getFullYear();
    if (this.ccExpiryYear > year + 10) {
      this.errors.ccExpiry = 'error_cc_expiry_overtime';
    } else {
      this.errors.ccExpiry = '';
    }
    const expdate = new Date().setFullYear(this.ccExpiryYear, this.ccExpiryMonth, 1);
    if (expdate <= new Date().getTime()) {
      this.errors.ccExpiry = 'error_cc_expiry_past';
    } else {
      this.errors.ccExpiry = '';
    }
  }

  processCVVandCVC() {
    if (!this.ccCVVandCVC) {
      this.errors.ccCVVandCVC = 'error_cc_required';
      return;
    }
    this.errors.ccCVVandCVC = '';

    const length = this.ccCVVandCVC.length;
    if (this.ccCardTypeId && this.ccCardTypeId !== 3 && length !== 3) {
      this.errors.ccCVVandCVC = 'error_cc_cvv_cvc_digit3';
      return;
    }
    if (this.ccCardTypeId && this.ccCardTypeId === 3 && length !== 4) {
      this.errors.ccCVVandCVC = 'error_cc_cvv_cvc_digit4';
    }
  }

}
