import React from 'react';
import UIComponent from 'shared/components/UIComponent';
import Img from 'shared/components/Img';
import { FormattedHtmlMessage } from 'shared/translation/formatted';
import 'shared/assets/images/img-empty-cart.png';

import './index.less';


export default class NoTransactions extends UIComponent {
  static contextTypes = {
    configurations: React.PropTypes.object
  }

  render() {
    const { configurations } = this.context;
    const defaultEmptyMessage = 'Your shopping cart is empty.';
    const message = configurations.get('empty_cart_message_tips_text') ?
      configurations.get('empty_cart_message_tips_text') : defaultEmptyMessage;
    const imgPath = 'images/img-empty-cart.png';
    return (
      <div className="empty-shoppingcart">
        <span className="icon-shopping-cart"><Img src={imgPath} /></span>
        <FormattedHtmlMessage value={message} />
      </div>
    );
  }
}
