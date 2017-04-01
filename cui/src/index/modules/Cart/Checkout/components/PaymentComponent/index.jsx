import React from 'react';
import UIComponent from 'shared/components/UIComponent';

import PaymentMethods from './PaymentMethods';
import PaymentContents from './PaymentContents';

import './index.less';

export default class PaymentComponent extends UIComponent {
  render() {
    const { name, data, mapping, onTypeChange, onItemSelectedChange, onPayItemAdded } = this.props;
    const selectedType = data ? data.get('selectedType') : '';
    const prepareProps = {
      name, mapping, selectedType, onItemSelectedChange, onPayItemAdded
    };

    return data ? (
      <div className="payment-comp">
        <PaymentMethods {...prepareProps} data={data} onTypeChange={onTypeChange} />
        <PaymentContents {...prepareProps} data={data} />
      </div>
    ) : null;
  }
}
