import React from 'react';
import classnames from 'classnames';
import UIComponent from 'shared/components/UIComponent';

import * as CreditCard from '../CreditCard/';
import * as ECheck from '../ECheck/';

import './index.less';

export default class PaymentMethods extends UIComponent {
  render() {
    const { data, selectedType, onTypeChange } = this.props;

    return (
      <div className="layout-width-limited">
        <div className="payment-comp-methods">
          {
            data.get('types').entrySeq().map(([typeName, typeValue]) => {
              const isSelected = selectedType === typeName;
              return (
                <div key={typeName} className={classnames('payment-comp-tab', { 'payment-comp-tab-active': isSelected })}>
                  <div className="tab-box" onClick={() => onTypeChange(typeName)}>
                    {
                      (() => {
                        switch (typeValue.get('component')) {
                          case CreditCard.name:
                            return <CreditCard.Tab />;
                          case ECheck.name:
                            return <ECheck.Tab />;
                          default:
                            return '';
                        }
                      })()
                    }
                  </div>
                </div>
              );
            })
          }
        </div>
      </div>
    );
  }
}
