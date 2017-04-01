import { defineMessages } from 'react-intl';

const PREFIX = 'app.route';

export default defineMessages({
  newCartTitle: {
    id: `${PREFIX}.newcart`,
    defaultMessage: 'New Cart'
  },
  checkoutTitle: {
    id: `${PREFIX}.newcart.checkout`,
    defaultMessage: 'Check Out'
  },
  confirmationTitle: {
    id: `${PREFIX}.newcart.checkout.confirmation`,
    defaultMessage: 'Confirmation page'
  }
});
