import { defineMessages } from 'react-intl';

const PREFIX = 'app.modules.cart.ShoppingCart.Transactions';

export default defineMessages({
  bubble: {
    id: `${PREFIX}.bubble`,
    defaultMessage: '{item_number} {items_wording}, {sub_total} in total.'
  },
  table_th_description: {
    id: `${PREFIX}.table_th_description`,
    defaultMessage: 'DESCRIPTION'
  },
  table_th_qty: {
    id: `${PREFIX}.table_th_qty`,
    defaultMessage: 'QTY'
  },
  table_th_unit_fee: {
    id: `${PREFIX}.table_th_unit_fee`,
    defaultMessage: 'UNIT FEE'
  },
  table_th_amount: {
    id: `${PREFIX}.table_th_amount`,
    defaultMessage: 'AMOUNT'
  },
  labels_incomplete: {
    id: `${PREFIX}.labels_incomplete`,
    defaultMessage: 'Incomplete'
  },
  name_unspecified: {
    id: `${PREFIX}.name_unspecified`,
    defaultMessage: 'Unspecified'
  }
});
