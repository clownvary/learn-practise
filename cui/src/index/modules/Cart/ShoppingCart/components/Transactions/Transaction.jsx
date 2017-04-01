import React from 'react';
import classNames from 'classnames';
import UIComponent from 'shared/components/UIComponent';
import Label from 'react-aaui/lib/Label';
import { FormattedMessage, FormattedNumber, FormattedDyncMessage } from 'shared/translation/formatted';
import { getTrasactionType } from 'shared/business/transaction';
import TransactionGrid from './TransactionGrid';
import selfMessages from './translations';

import './transactions.less';

export default class Transaction extends UIComponent {

  static contextTypes = {
    configurations: React.PropTypes.object,
    getWording: React.PropTypes.func
  }

  constructor(props) {
    super(props);
    this.state = {
      expanded: undefined
    };
  }

  triggerCollapse() {
    const { expanded } = this.state;
    this.setState({
      expanded: !expanded
    });
  }

  render() {
    const { configurations, getWording } = this.context;
    const { expanded } = this.state;
    const { isLastOne, transaction, ShowDeleteTransactionAlert } = this.props;
    const {
      reno,
      description,
      transaction_type: transactionType,
      detail_url: detailUrl,
      amount_include_tax: amountIncludeTax,
      item_descriptions: itemDescriptions,
      primary_price_grid: primaryPriceGrid,
      transaction_url: transactionUrl,
      online_entry_completed: onlineEntryCompleted,
      deferred_amount: deferredAmount
    } = transaction;

    const transType = getTrasactionType(configurations, transactionType);

    const expandable = primaryPriceGrid.length > 0;

    return (
      <div>
        <div className="transaction">
          { /* header part */ }
          <div className="aaui-flexbox transaction-header">
            <h3 className="afx-col afx-xl-grow-1">
              { transactionUrl ?
                <a href={detailUrl}>
                  <FormattedDyncMessage value={description} />
                </a> : <FormattedDyncMessage value={description} /> }
            </h3>
            <h3 className="afx-col">
              { expandable ?
                <a onClick={() => this.triggerCollapse()} className="collapseTrigger">
                  <FormattedNumber numberStyle="currency" currency="USD" value={amountIncludeTax} />
                  <i
                    className={classNames('icon', {
                      'icon-chevron-down': !expanded,
                      'icon-chevron-up': expanded
                    })}
                  />
                </a> :
                <span>
                  <FormattedNumber numberStyle="currency" currency="USD" value={amountIncludeTax} />
                </span> }
            </h3>
          </div>
          { /* body part */
                                expandable && expanded ?
                                  <div className="transaction-body">
                                    <TransactionGrid transaction={transaction} />
                                  </div> : null }
          { /* footer part */ }
          <div className="transaction-footer">
            <div className="aaui-flexbox afx-xl-bottom">
              <div className="afx-xl-grow-1 afx-xl-basis-0 transaction-detail">
                <div>
                  <FormattedDyncMessage value={transType} />
                </div>
                { itemDescriptions && itemDescriptions.length > 0 ?
                  <div>
                    { itemDescriptions.map((item, index) => (
                      <div key={index}>
                        <FormattedDyncMessage value={`${item.name}${item.value ? `: ${item.value}` : ''}`} />
                      </div>
                      )) }
                  </div> : null }
                { !onlineEntryCompleted ?
                  <Label type="warning">
                    <FormattedMessage {...selfMessages.labels_incomplete} />
                  </Label> : null }
                { !(deferredAmount === null || deferredAmount === 0) ?
                  <Label type="success">
                    <FormattedDyncMessage value={getWording('payment_plan_label')} />
                  </Label> : null }
              </div>
              <div className="transaction-operation">
                { transactionUrl ?
                  <a href={transactionUrl}>
                    <i className="icon icon-sign-m" />
                  </a> : null }
                <a onClick={() => ShowDeleteTransactionAlert(reno)}><i className="icon icon-trash" /></a>
              </div>
            </div>
          </div>
        </div>
        { !isLastOne ? <div className="splitline splitline-dotted" /> : null }
      </div>
    );
  }
}
