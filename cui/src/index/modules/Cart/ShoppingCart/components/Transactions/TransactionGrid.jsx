import React from 'react';
import UIComponent from 'shared/components/UIComponent';
import { injectIntl } from 'react-intl';
import { FormattedMessage, FormattedNumber, FormattedDyncMessage } from 'shared/translation/formatted';
import orderSummaryMessages from 'shared/translation/messages/Cart/orderSummary';
import selfMessages from './translations';

import './transactiongrid.less';

export class TransactionGrid extends UIComponent {

  static contextTypes = {
    getWording: React.PropTypes.func
  }

  render() {
    const { getWording } = this.context;
    const { transaction, intl: { messages } } = this.props;
    const {
      amount,
      taxes,
      primary_price_grid: primaryPriceGrid,
      deferred_amount: deferredAmount,
      due_now: dueNow
    } = transaction;

    return (
      <div className="transaction-grid">
        { /* Primary price grid */ }
        <table className="normal-responsive-table">
          <thead>
            <tr>
              <td>
                <FormattedMessage {...selfMessages.table_th_description} />
              </td>
              <td>
                <FormattedMessage {...selfMessages.table_th_qty} />
              </td>
              <td>
                <FormattedMessage {...selfMessages.table_th_unit_fee} />
              </td>
              <td>
                <FormattedMessage {...selfMessages.table_th_amount} />
              </td>
            </tr>
          </thead>
          <tbody>
            { primaryPriceGrid.map((item, index) => (item ? (
              <tr key={index}>
                <td data-label={messages['app.modules.cart.ShoppingCart.Transactions.table_th_description']}>
                  <FormattedDyncMessage value={item.description} />
                </td>
                <td data-label={messages['app.modules.cart.ShoppingCart.Transactions.table_th_qty']}>
                  <FormattedDyncMessage value={item.qty} />
                </td>
                <td data-label={messages['app.modules.cart.ShoppingCart.Transactions.table_th_unit_fee']}>
                  { item.is_percentage_discount ?
                    <FormattedNumber numberStyle="percent" value={item.discount_percent / 100} /> :
                    <FormattedNumber numberStyle="currency" currency="USD" value={item.unit_price} /> }
                </td>
                <td data-label={messages['app.modules.cart.ShoppingCart.Transactions.table_th_amount']}>
                  <FormattedNumber numberStyle="currency" currency="USD" value={item.price} />
                </td>
              </tr>
            ) : null)) }
          </tbody>
        </table>
        { /* Primary price summary */ }
        <div className="transaction-gather">
          <b><FormattedMessage {...orderSummaryMessages.subtotal} /></b>
          <FormattedNumber numberStyle="currency" currency="USD" value={amount} />
        </div>
        { taxes ?
          <div className="transaction-gather transaction-gather-others">
            <b><FormattedMessage {...orderSummaryMessages.taxes} /></b>
            <FormattedNumber numberStyle="currency" currency="USD" value={taxes} />
          </div> : null }
        { deferredAmount !== 0 ?
          <div className="transaction-gather transaction-gather-others">
            <b><FormattedMessage {...orderSummaryMessages.deferredToPaymentPlan} values={{ payment_plan_label: getWording('payment_plan_label') }} /></b>
            <FormattedNumber numberStyle="currency" currency="USD" value={deferredAmount} />
          </div> : null }
        { deferredAmount !== 0 ?
          <div className="transaction-gather transaction-gather-others">
            <b><FormattedMessage {...orderSummaryMessages.dueNow} /></b>
            <FormattedNumber numberStyle="currency" currency="USD" value={dueNow} />
          </div> : null }
      </div>
    );
  }
}

export default injectIntl(TransactionGrid);
