import React from 'react';
import { connect } from 'react-redux';
import UIComponent from 'shared/components/UIComponent';
import { FormattedMessage } from 'shared/translation/formatted';
import {
  registerModuleActoin,
  changePaymentTypeActoin,
  selectItemActoin
} from '../../actions/paymentManager';
import * as PaymentTypes from '../../consts/paymentTypes';
import PaymentComponent from '../PaymentComponent';
import selfMessages from './translations';

import './index.less';

const MODULENAME = 'secondary';

export class SecondaryPayment extends UIComponent {

  componentWillMount() {
    this.props.registerModuleActoin(
      MODULENAME,
      [PaymentTypes.CREDIT_CARD, PaymentTypes.ECHECK], PaymentTypes.CREDIT_CARD
    );
  }

  render() {
    const { paymentManager } = this.props;
    const data = paymentManager.getIn(['modules', MODULENAME]);

    return (
      <div className="secondary-payment">
        <h4>
          <span className="icon icon-uniF023" />
          <FormattedMessage {...selfMessages.title} />
        </h4>
        <PaymentComponent
          data={data}
          name={MODULENAME}
          onTypeChange={(typeName) => {
            this.props.changePaymentTypeActoin(MODULENAME, typeName);
          }}
          onItemSelectedChange={(typeName, payItemId) => {
            this.props.selectItemActoin(MODULENAME, typeName, payItemId);
          }}
          onPayItemAdded={(typeName, payItemInfo) => {
            this.props.addPayItemActoin(MODULENAME, typeName, payItemInfo);
          }}
        />
      </div>
    );
  }
}

export default connect(
  null,
  {
    registerModuleActoin,
    changePaymentTypeActoin,
    selectItemActoin
  }
)(SecondaryPayment);
