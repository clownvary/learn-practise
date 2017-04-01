import React from 'react';
import UIComponent from 'shared/components/UIComponent';
import { FormattedMessage, FormattedNumber } from 'shared/translation/formatted';
import orderSummaryMessages from 'shared/translation/messages/Cart/orderSummary';

import './commonordersummary.less';

export default class OrderSummary extends UIComponent {

  static contextTypes = {
    getWording: React.PropTypes.func
  }

  static itemCanbeShow(item) {
    return item != null && item !== 0;
  }

  render() {
    const { getWording } = this.context;
    const {
      due_now: dueNow = 0,
      payment_from_account: paymentFromAccount = 0,
      payment_plan_deferred: paymentPlanDeferred = 0,
      processing_fee: processingFee = 0,
      sub_total: subTotal = 0,
      taxes = 0
    } = this.props.data.toJS();

    return (
      <div className="common-ordersummary">
        <h3><FormattedMessage {...orderSummaryMessages.title} /></h3>
        <ul className="common-ordersummary-list">
          <li>
          <span className="field-label">
              <FormattedMessage {...orderSummaryMessages.subtotal} />
            </span>
          <span className="field-value">
            <FormattedNumber numberStyle="currency" currency="USD" value={subTotal} />
          </span>
          </li>
          { OrderSummary.itemCanbeShow(taxes) ?
            <li>
              <span className="field-label">
                <FormattedMessage {...orderSummaryMessages.taxes} />
              </span>
              <span className="field-value">
                <FormattedNumber numberStyle="currency" currency="USD" value={taxes} />
              </span>
            </li> : null }
          { OrderSummary.itemCanbeShow(processingFee) ?
            <li>
              <span className="field-label">
                  <FormattedMessage {...orderSummaryMessages.convenienceFee} values={{ convenience_fee_label: getWording('convenience_fee_label') }} />
              </span>
              <span className="field-value">
                <FormattedNumber numberStyle="currency" currency="USD" value={processingFee} />
              </span>
            </li> : null }
          { OrderSummary.itemCanbeShow(paymentFromAccount) ?
            <li>
              <span className="field-label">
                <FormattedMessage {...orderSummaryMessages.paymentFromAccount} />
              </span>
              <span className="field-value">
                <FormattedNumber numberStyle="currency" currency="USD" value={paymentFromAccount} />
              </span>
            </li> : null }
          { OrderSummary.itemCanbeShow(paymentPlanDeferred) ?
            <li>
              <span className="field-label">
                <FormattedMessage {...orderSummaryMessages.deferredToPaymentPlan} values={{ payment_plan_label: getWording('payment_plan_label') }} />
              </span>
              <span className="field-value">
                <FormattedNumber numberStyle="currency" currency="USD" value={paymentPlanDeferred} />
              </span>
            </li> : null }
        </ul>
        <div className="splitline" />
        <div className="common-ordersummary-duenow">
          <strong><FormattedMessage {...orderSummaryMessages.dueNow} /></strong>
          <b>
            <FormattedNumber numberStyle="currency" currency="USD" value={dueNow} />
          </b>
        </div>
      </div>
    );
  }
}
