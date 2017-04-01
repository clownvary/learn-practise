import {defineMessages} from "react-intl";

export const PREFIX = "app.modules.cart.common.OrderSummary";

/**
 * Common part for ShoppingCart and Checkout page.
 */
export default defineMessages({
  title: {
    id: `${PREFIX}.title`,
    defaultMessage: "Order Summary"
  },
  subtotal: {
    id: `${PREFIX}.subtotal`,
    defaultMessage: "Subtotal"
  },
  taxes: {
    id: `${PREFIX}.taxes`,
    defaultMessage: "Taxes"
  },
  convenienceFee: {
    id: `${PREFIX}.convenienceFee`,
    defaultMessage: "{convenience_fee_label}"
  },
  paymentFromAccount: {
    id: `${PREFIX}.paymentFromAccount`,
    defaultMessage: "Payment from Account"
  },
  deferredToPaymentPlan: {
    id: `${PREFIX}.deferredToPaymentPlan`,
    defaultMessage: "Deferred to {payment_plan_label}"
  },
  dueNow: {
    id: `${PREFIX}.dueNow`,
    defaultMessage: "Due Now"
  },
  waiverError: {
    id: `${PREFIX}.waiverError`,
    defaultMessage: "Please check or initial all required waivers."
  },
  required: {
    id: `${PREFIX}.required`,
    defaultMessage: "Required"
  }
});
