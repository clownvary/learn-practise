import React from 'react';
import { connect } from 'react-redux';
import UIComponent from 'shared/components/UIComponent';
import { cleanMessages } from 'react-base-ui/lib/messages';
import Button from 'react-aaui/lib/Button';
import CommonOrderSummary from 'index/modules/Cart/shared/CommonOrderSummary';
import { FormattedMessage } from 'shared/translation/formatted';
import buttonsMessages from 'shared/translation/messages/button';
import { getShoppingCartNeedPayAction, validateAndCheckoutShoppingCartAction } from '../../actions/checkout';

import './index.less';

export class OrderSummary extends UIComponent {

  componentDidMount() {
    this.props.getShoppingCartNeedPayAction();
  }

  buildCheckoutButton() {
    const { checkout } = this.props.ShoppingCart;
    const { needPay } = checkout.toJS();
    return (
      <Button type="strong" onClick={() => this.handlerCheckoutClick()}>
        { needPay ? <FormattedMessage {...buttonsMessages.checkout} /> :
        <FormattedMessage {...buttonsMessages.finish} /> }
      </Button>
    );
  }

  handlerCheckoutClick() {
    const { waiver } = this.props.ShoppingCart;
    cleanMessages();
    this.props.validateAndCheckoutShoppingCartAction(waiver);
  }

  render() {
    const orderSummary = this.props.transactions.get('orderSummary');

    return (
      <div className="ordersummary-panel afx-panel">
        <CommonOrderSummary data={orderSummary} />
        { this.buildCheckoutButton() }
      </div>
    );
  }
}

export default connect(
  state => ({
    ShoppingCart: state.modules.Cart.ShoppingCart
  }),
  {
    getShoppingCartNeedPayAction,
    validateAndCheckoutShoppingCartAction
  }
)(OrderSummary);
