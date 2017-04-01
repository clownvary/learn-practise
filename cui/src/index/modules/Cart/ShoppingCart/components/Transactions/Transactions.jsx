import React from 'react';
import UIComponent from 'shared/components/UIComponent';
import { connect } from 'react-redux';
import { confirm } from 'react-base-ui/lib/confirmation';
import Transaction from './Transaction';
import { deleteTransactionClusterAction } from '../../actions/transactions';

import './transactions.less';

export class Transactions extends UIComponent {

  confirmDelete(id) {
    if (id) {
      confirm(
        'Are you sure you want to remove this transaction from the cart?',
        {
          title: 'Delete Transaction',
          showCancel: true,
          cancelText: 'No',
          confirmText: 'Yes'
        }
      ).then(() => {
        this.props.deleteTransactionClusterAction(id);
      });
    }
  }

  render() {
    const { transactions } = this.props;

    return (
      <div className="transactions">
        { transactions.map((transaction, index) => (
          <Transaction
            key={index}
            isLastOne={index === transactions.length - 1}
            ShowDeleteTransactionAlert={id => this.confirmDelete(id)}
            transaction={transaction}
          />
          )) }
      </div>
    );
  }
}

export default connect(
  null,
  {
    deleteTransactionClusterAction
  }
)(Transactions);
