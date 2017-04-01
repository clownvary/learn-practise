export function getPureNumber(number) {
  return number.replace(/\s/g, '');
}

export function formatCardNumber(number, maxLength=0) {
  let cardNumber = '';

  cardNumber = number.replace(/\s/g, '');
  if (cardNumber.length > maxLength) {
    cardNumber = maxLength ? cardNumber.substr(0, maxLength) : cardNumber;
  }
  cardNumber = cardNumber.replace(/.{4}(?=.)/g, '$& ');

  return cardNumber;
}
