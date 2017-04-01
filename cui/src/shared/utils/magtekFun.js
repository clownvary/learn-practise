// Javascript code to generate a UUID (RFC4122 version 4 compliant)
export function randomUUID() {
  var d = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c == 'x' ? r : (r & 0x7 | 0x8)).toString(16);
  });
  return uuid;
};


function trimString(sInString) {
  return sInString.replace(/\s+$/g,"");
}

export function maskCard(cc_number){
  cc_number = trimString(cc_number);
  var digits_to_show = cc_number.length > 4 ? 4 : cc_number.length;
  return "xxx"  + cc_number.substring(cc_number.length - digits_to_show);
}

////////////////////////////////////////////////////////////////////
//
//  Determine credit card types
//
////////////////////////////////////////////////////////////////////
var cc_validation_visa     = 1;
var cc_validation_mc       = 2;
var cc_validation_amex     = 3;
var cc_validation_diners   = 4;
var cc_validation_discover = 5;
var cc_validation_jcb      = 6;

var cc_validation_to_card_type=["1","5","Visa","1","3","Visa","2","2","MasterCard","3","4","American Express",];

export function cardValidation(cc){
  // remove all space in the credit card number
  cc = cc.replace (/\s/g, "");
  if(masterCard(cc))return cc_validation_mc;
  if(amexCard(cc))return cc_validation_amex;
  if(visaCard(cc))return cc_validation_visa;
  if(dinersCard(cc))return cc_validation_diners;
  if(discoverCard(cc))return cc_validation_discover;
  if(jcbCard(cc))return cc_validation_jcb;
  return 0;
}

function masterCard (cc) {
  if (!validChecksum(cc)) return false;
  if (cc.length!= 16) return false;
  return cc.indexOf("51")==0
    || cc.indexOf("52")==0
    || cc.indexOf("53")==0
    || cc.indexOf("54")==0
    || cc.indexOf("55")==0;
}

function amexCard (cc) {
  if (!validChecksum(cc)) return false;
  if (cc.length!= 15) return false;
  return cc.indexOf("34")==0
    || cc.indexOf("37")==0;
}

function visaCard (cc) {
  if (!validChecksum(cc)) return false;
  if (cc.length!= 13 && cc.length!= 16) return false;
  return cc.indexOf("4")==0;
}

function dinersCard (cc) {
  if (!validChecksum(cc)) return false;
  if (cc.length!= 14) return false;
  return cc.indexOf("300")==0
    || cc.indexOf("301")==0
    || cc.indexOf("302")==0
    || cc.indexOf("303")==0
    || cc.indexOf("304")==0
    || cc.indexOf("305")==0
    || cc.indexOf("36")==0
    || cc.indexOf("38")==0;
}

function discoverCard (cc) {
  if (!validChecksum(cc)) return false;
  if (cc.length!= 16) return false;
  return cc.indexOf("6011")==0
    || cc.indexOf("622")==0
    || cc.indexOf("64")==0
    || cc.indexOf("65")==0;
}

function jcbCard (cc) {
  if (!validChecksum(cc)) return false;
  if (cc.length== 16 && cc.indexOf("3")==0) return true;
  if (cc.length!= 15) return false;
  return cc.indexOf("2131")==0 || cc.indexOf("1800")==0;
}

function validChecksum(my_cc_number) {
  var check_sum = 0;
  var odd_toggle = false;
  var i = 0;
  var digit;
  for (i = my_cc_number.length - 1; i >= 0; i--, odd_toggle = !odd_toggle) {
    digit = parseInt(my_cc_number.charAt(i), 10);
    if (isNaN(digit)) return false;
    if (odd_toggle) {
      if (digit * 2 > 9) {
        check_sum += 1 + (digit * 2) % 10;
      } else {
        check_sum += digit * 2;
      }
    } else {
      check_sum += digit;
    }
  }
  return (check_sum % 10) == 0;
}

export function cardTypeFromValidationType(validation_type) {
  for(var i=0;i<cc_validation_to_card_type.length;i+=3) {
    if(cc_validation_to_card_type[i]==validation_type){
      return cc_validation_to_card_type[i+1];
    }
  }
  return 0;
}


export const CARDTYPEDEFINITION = {
  "0": "", //Other Credit Card
  "1": "cc-visa", //Visa
  "2": "cc-mastercard", //MasterCard
  "3": "cc-amex", //American Express
  "4": "cc-diners-club", //Diners
  "5": "cc-discover", //Discover
  "6": "cc-jcb", //JCB
  "7": "" //Other Payment
}
