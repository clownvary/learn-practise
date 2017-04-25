/**
 * below list is consistent with back-end.
 *    other('Other Credit Card', 'Other', 7), // 0
 *    visa('Visa', 'VISA', 1), // 1
 *    mc('MasterCard', 'MASTERCARD', 2), // 2
 *    amex('American Express', 'AMEX', 5), // 3
 *    diners('Diners', 'DINERS', 3), // 4
 *    discover('Discover', 'DISCOVER', 4), // 5
 *    jcb('JCB', 'JCB', 6), // 6
 *    other_payment('Other Payment', 'Other Payment', 0); // 7
 */
export const creditCardIcons = {
  0: '', // Other Credit Card
  1: 'icon-cc-visa', // Visa
  2: 'icon-cc-mastercard', // MasterCard
  3: '', // American Express
  4: 'icon-cc-diners-club', // Diners
  5: 'icon-cc-discover', // Discover
  6: 'icon-cc-jcb', // JCB
  7: '' // Other Payment
};

export const creditCardIdentifiers = {
  0: 'Other Credit Card', // Other Credit Card
  1: 'Visa', // Visa
  2: 'MasterCard', // MasterCard
  3: 'American Express', // American Express
  4: 'Diners', // Diners
  5: 'Discover', // Discover
  6: 'JCB', // JCB
  7: 'Other Payment' // Other Payment
};

export default {
  icons: creditCardIcons,
  identifiers: creditCardIdentifiers
};
