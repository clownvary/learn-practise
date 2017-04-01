import 'Cart/Checkout/get_billingaddresses.json';
import 'Cart/Checkout/get_countrystates.json';
import 'Cart/Checkout/post_createbillingaddress.json';
import 'Cart/Checkout/post_updatebillingaddress.json';

import 'Cart/Checkout/get_creditcardtypes.json';
import 'Cart/Checkout/get_creditcards.json';
import 'Cart/Checkout/get_amstoken.json';
import 'Cart/Checkout/get_amsaccountid.json';
import 'Cart/Checkout/post_creditcards.json';
import 'Cart/Checkout/get_echecks.json';
import 'Cart/Checkout/get_ordersummary.json';

const PREFIX = '/test/json/Cart/Checkout';

export default {
  get: {
    '/checkout/billing': `${PREFIX}/get_billingaddresses.json`,
    '/system/countries': `${PREFIX}/get_countrystates.json`,
    '/checkout/creditcardtypes': `${PREFIX}/get_creditcardtypes.json`,
    '/checkout/creditcards': `${PREFIX}/get_creditcards.json`,
    '/checkout/creditcards?types=*': `${PREFIX}/get_creditcards.json`,
    '/checkout/amstoken': `${PREFIX}/get_amstoken.json`,
    '/checkout/amsaccountid': `${PREFIX}/get_amsaccountid.json`,
    '/checkout/echecks': `${PREFIX}/get_echecks.json`,
    '/transactions/summary': `${PREFIX}/get_ordersummary.json`
  },
  post: {
    '/checkout/creditcards': `${PREFIX}/post_creditcards.json`,
    '/checkout/addNewBillingInfo': `${PREFIX}/post_createbillingaddress.json`,
    '/checkout/updateBillingInfo': `${PREFIX}/post_updatebillingaddress.json`,
  },
  put: {

  },
  patch: {

  },
  delete: {

  },
  head: {

  }
};
