import CARDTYPES from 'shared/consts/creditCard/types';

const EMPTYERROR = {
  ccNumber: '',
  ccCardType: '',
  ccExpiry: '',
  ccCVVandCVC: ''
};

const trimString = sInString => sInString.replace(/\s+$/g, '');

export const maskCard = (ccNumber) => {
  ccNumber = trimString(ccNumber);
  const digitsToShow = ccNumber.length > 4 ? 4 : ccNumber.length;
  return `xxx${ccNumber.substring(ccNumber.length - digitsToShow)}`;
};

// //////////////////////////////////////////////////////////////////
//
//  Determine credit card types
//
// //////////////////////////////////////////////////////////////////
const ccValidationVisa = 1;
const ccValidationMc = 2;
const ccValidationAmex = 3;
const ccValidationDiners = 4;
const ccValidationDiscover = 5;
const ccValidationJcb = 6;

const validChecksum = (myCcNumber) => {
  let checkSum = 0;
  let oddToggle = false;
  for (let i = myCcNumber.length - 1; i >= 0; i -= 1, oddToggle = !oddToggle) {
    const digit = parseInt(myCcNumber.charAt(i), 10);
    if (isNaN(digit)) return false;
    if (oddToggle) {
      if (digit * 2 > 9) {
        checkSum += 1 + ((digit * 2) % 10);
      } else {
        checkSum += digit * 2;
      }
    } else {
      checkSum += digit;
    }
  }

  return (checkSum % 10) === 0;
};

const masterCard = (cc) => {
  if (!validChecksum(cc)) return false;
  if (cc.length !== 16) return false;
  return cc.indexOf('51') === 0
        || cc.indexOf('52') === 0
        || cc.indexOf('53') === 0
        || cc.indexOf('54') === 0
        || cc.indexOf('55') === 0;
};

export const amexCard = (cc) => {
  if (!validChecksum(cc)) return false;
  if (cc.length !== 15) return false;
  return cc.indexOf('34') === 0
        || cc.indexOf('37') === 0;
}

export const visaCard = (cc) => {
  if (!validChecksum(cc)) return false;
  if (cc.length !== 13 && cc.length !== 16) return false;
  return cc.indexOf('4') === 0;
}

export const dinersCard = (cc) => {
  if (!validChecksum(cc)) return false;
  if (cc.length !== 14) return false;
  return cc.indexOf('300') === 0
        || cc.indexOf('301') === 0
        || cc.indexOf('302') === 0
        || cc.indexOf('303') === 0
        || cc.indexOf('304') === 0
        || cc.indexOf('305') === 0
        || cc.indexOf('36') === 0
        || cc.indexOf('38') === 0;
}

export const discoverCard = (cc) => {
  if (!validChecksum(cc)) return false;
  if (cc.length !== 16) return false;
  return cc.indexOf('6011') === 0
        || cc.indexOf('622') === 0
        || cc.indexOf('64') === 0
        || cc.indexOf('65') === 0;
}

export const jcbCard = (cc) => {
  if (!validChecksum(cc)) return false;
  if (cc.length === 16 && cc.indexOf('3') === 0) return true;
  if (cc.length !== 15) return false;
  return cc.indexOf('2131') === 0 || cc.indexOf('1800') === 0;
}

export const cardValidation = (cc) => {
    // remove all space in the credit card number
  cc = cc.replace(/\s/g, '');
  if (masterCard(cc)) return ccValidationMc;
  if (amexCard(cc)) return ccValidationAmex;
  if (visaCard(cc)) return ccValidationVisa;
  if (dinersCard(cc)) return ccValidationDiners;
  if (discoverCard(cc)) return ccValidationDiscover;
  if (jcbCard(cc)) return ccValidationJcb;
  return 0;
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
    const { ccNumber, ccCardType, ccExpiry , ccCVVandCVC } = this.errors;
    return !!ccNumber || !!ccCardType || !!ccExpiry || !!ccCVVandCVC;
  }

  porcessCCNumber() {
    if (!this.ccNumber) {
      this.errors.ccNumber = 'error_cc_required';
      this.errors.ccCardType = '';
      return;
    }else {
      this.errors.ccNumber = '';
    }
    if(this.ccCardTypeId === null) {
      this.errors.ccCardType = 'error_cc_card_type_invalid';
      return;
    }
    if (!this.ccCardTypeId) {
      this.errors.ccCardType = 'error_cc_card_type_undetermined';
    }else {
      this.errors.ccCardType = '';
    }
  }

  processExpiry() {
    if (!this.ccExpiryYear || !this.ccExpiryMonth) {
      this.errors.ccExpiry = 'error_cc_required';
      return;
    }else {
      this.errors.ccExpiry = '';
    }
    const year = new Date().getFullYear();
    if (this.ccExpiryYear > year + 10) {
      this.errors.ccExpiry = 'error_cc_expiry_overtime';
    }else {
      this.errors.ccExpiry = '';
    }
    const expdate = new Date().setFullYear(this.ccExpiryYear, this.ccExpiryMonth, 1);
    if (expdate <= new Date().getTime()) {
      this.errors.ccExpiry = 'error_cc_expiry_past';
    }else {
      this.errors.ccExpiry = '';
    }
  }

  processCVVandCVC() {
    if (!this.ccCVVandCVC) {
      this.errors.ccCVVandCVC = 'error_cc_required';
      return;
    }else {
      this.errors.ccCVVandCVC = '';
    }
    const length = this.ccCVVandCVC.length;
    if (this.ccCardTypeId && this.ccCardTypeId !== 3 && length !== 3) {
      this.errors.ccCVVandCVC = 'error_cc_cvv_cvc_digit3';
      return;
    }
    if (this.ccCardTypeId && this.ccCardTypeId === 3 && length !== 4) {
      this.errors.ccCVVandCVC = 'error_cc_cvv_cvc_digit4';
      return;
    }
  }

}
