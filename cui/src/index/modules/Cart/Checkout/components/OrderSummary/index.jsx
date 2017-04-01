import React from 'react';
import { connect } from 'react-redux';

import UIComponent from 'shared/components/UIComponent';
import CommonOrderSummary from 'index/modules/Cart/shared/CommonOrderSummary';
import { fetchOrderSummary } from '../../actions/orderSummary';

import ApplyGiftCard from '../ApplyGiftCard';


import './index.less';

export class OrderSummary extends UIComponent {
  componentDidMount() {
    this.props.fetchOrderSummary();
  }

  render() {
    const data = this.props.orderSummary.get('data');
    return (
      <div className="ordersummary-panel afx-panel">
        <CommonOrderSummary data={data} />
        <ApplyGiftCard />
      </div>
    );
  }
}

export default connect(
  state => ({
    orderSummary: state.modules.Cart.Checkout.orderSummary
  }),
  {
    fetchOrderSummary
  }
)(OrderSummary);
