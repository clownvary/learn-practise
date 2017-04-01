import {fromJS} from 'immutable';

export function compareArr(a, b) {
  return a.every((val, key) => {
    return b.indexOf(val) > -1;
  })
}

export function isArrEqual(a, b) {
  if (a.length === b.length) {
    if (compareArr(a, b)) {
      return true;
    }
  }
  return false;
}

export function decodeHtmlStr(str) {
  str = str.replace(/</g, '&lt;').replace(/>/g, '&gt;');
  let span = document.createElement('span');
  span.innerHTML = str;
  return encodeHtmlStr(span.innerText);
}

export function encodeHtmlStr(str) {
  var s = '';
  if (str.length == 0) return '';
  s = str.replace(/&amp;/g, '&');
  s = s.replace(/&lt;/g, '<');
  s = s.replace(/&gt;/g, '>');
  s = s.replace(/&nbsp;/g, ' ');
  s = s.replace(/&#39;/g, '\'');
  s = s.replace(/&quot;/g, '\"');
  s = s.replace(/&#126;/g, '~');
  s = s.replace(/&#096;/g, '`');
  s = s.replace(/<br>/g, '\n');
  return s;
}

export function deepMerge(target, ...sources) {
  if (target && typeof target === 'object') {
    let targetImmutable = fromJS(target);

    sources.forEach((source) => {
      if (source && typeof source === 'object') {
        let sourceImmutable = fromJS(source);
        targetImmutable = targetImmutable.mergeDeep(sourceImmutable);
      }
    })

    return targetImmutable.toJS();
  }

  return null;
}

export function allowDigitalInputOnly(e) {
  let keyCode = e.keyCode;
  let isShiftKey = e.shiftKey;
  let isCtrlKey = e.ctrlKey;
  let condition1 = (keyCode >= 48 && keyCode <= 57);
  let condition2 = (keyCode >= 96 && keyCode <= 105);
  let condition3 = keyCode == 8; //backspace
  let val = e.target.value;

  if (isCtrlKey && keyCode == 86) { //allow ctrl + v
    return false;
  }

  if (!(condition1 || condition2 || condition3)) {
    e.preventDefault();
  }

  if (isShiftKey) {
    e.preventDefault();
  }
}

export function deleteCharactorInStr(str) {
  let reg = /[^\d]+/g;
  return str.replace(reg, '');
}

export function allowMoneyAcountOnly(str) {
  let reg = /[^\d\.]+/g;
  return str.replace(reg, '');
}

/*
  description:
    1. Fix the bug ANE-50593
    2. Do nothing if the amount only contain number or decimal point
    3. Reset the amount to the right format when amount contains not only the number or decimal point.
*/
export function validateThenResetAmountOfPayment(e, input) {
  let originVal = e.target.value;
  let handledVal = allowMoneyAcountOnly(originVal);
  let reg = /[^\d\.]+/g;
  if (reg.test(originVal)) {
    input.value = handledVal;
  }
}


// Javascript code to generate a UUID (RFC4122 version 4 compliant)
export function randomUUID(){
  var d = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = (d + Math.random()*16)%16 | 0;
      d = Math.floor(d/16);
      return (c=='x' ? r : (r&0x7|0x8)).toString(16);
  });
  return uuid;
};
