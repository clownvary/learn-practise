import React from 'react';
import { connect } from 'react-redux';
import UIComponent from 'shared/components/UIComponent';
import PageFooter from 'shared/components/PageFooter';
import NoTransactions from './components/NoTransactions';
import OrderSummary from './components/OrderSummary';
import QuickDonation from './components/QuickDonation';
import Transactions from './components/Transactions';
import Waiver from './components/Waiver';

import { fetchTransactionsAction } from './actions/transactions';
import { fetchQuickDonationAction } from './actions/quickdonation';
import { fetchWaiversAction } from './actions/waiver';

import './index.less';

export class ShoppingCart extends UIComponent {

  static contextTypes = {
    getWording: React.PropTypes.func,
    configurations: React.PropTypes.object
  }

  componentDidMount() {
    this.props.fetchTransactionsAction();
    this.props.fetchQuickDonationAction();
    this.props.fetchWaiversAction();
  }

  render() {
    const { quickdonation, transactions, waiver, checkout } = this.props;
    const { configurations } = this.context;

    return (
      <div className="page-ShoppingCart">
        <div>
          { ShoppingCart.renderTransactions(transactions, quickdonation, waiver, checkout) }
          <PageFooter specificContent={configurations.get('page_newcuishoppingcart_footer')} />
        </div>
      </div>
    );
  }

  static renderTransactions(transactions, quickdonation, waiver, checkout) {
    return transactions.get('participants').size ?
      <div className="aaui-flexbox afx-xl-mg-30">
        <div className="afx-col afx-xl-4-12 afx-sm-1-1 afx-xs-1-1 afx-md-order-1">
          <OrderSummary transactions={transactions} />
          <QuickDonation quickdonation={quickdonation} />
        </div>
        <div className="afx-col afx-xl-8-12 afx-sm-1-1 afx-xs-1-1">
          <Transactions transactions={transactions} />
          <Waiver waiver={waiver} checkout={checkout} />
        </div>
      </div> : <NoTransactions />;
  }
}

export default connect(
  state => ({
    transactions: state.modules.Cart.ShoppingCart.transactions,
    quickdonation: state.modules.Cart.ShoppingCart.quickdonation,
    waiver: state.modules.Cart.ShoppingCart.waiver,
    checkout: state.modules.Cart.ShoppingCart.checkout
  }),
  {
    fetchTransactionsAction,
    fetchQuickDonationAction,
    fetchWaiversAction
  }
)(ShoppingCart);
