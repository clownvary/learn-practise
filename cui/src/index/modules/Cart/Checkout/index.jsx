import React from 'react';
import { connect } from 'react-redux';
import UIComponent from 'shared/components/UIComponent';
import PageFooter from 'shared/components/PageFooter';
import { FormattedMessage } from 'shared/translation/formatted';

import OrderSummary from './components/OrderSummary';
import PrimaryPayment from './components/PrimaryPayment';
import BillingAddress from './components/BillingAddress';
import FutureCharge from './components/FutureCharge';

import {
  fetchCreditCardTypesAction,
  fetchSavedCreditCardsAction,
  fetchSavedEChecksAction,

  getCountryStateAction,
  onCreateBillingAddressAction,
  onUpdateBillingAddressAction,
  createBillingAddressAction,
  updateBillingAddressAction,
  getBillingAddressAction,
  selectBillingAddressAction,
  showBillingAddressFormAction,
  hideBillingAddressFormAction,
  selectCountryAction,
  changeFormFieldAction,
  submitAction,
  cancelAction
} from './actions';

import selfMessages from './translations';

import './index.less';

export class Checkout extends UIComponent {

  static contextTypes = {
    configurations: React.PropTypes.object
  }

  componentDidMount() {
    const { configurations } = this.context;
    this.props.fetchCreditCardTypesAction().then(({ body: { card_types } }) => {
      if (configurations.get('show_prior_cc')) {
        this.props.fetchSavedCreditCardsAction(card_types);
      }
    });
    if (configurations.get('show_prior_ecp')) {
      // this.props.fetchSavedEChecksAction();
    }

    this.props.getCountryStateAction();
    this.props.getBillingAddressAction();
  }

  render() {
    const { configurations } = this.context;
    const { paymentManager, billingAddress } = this.props;

    // get configs of billing address
    const billingAddressConfig = {
      hideBilling: configurations.get('hide_billing_name_address_on_confirmation'),
      canCreate: configurations.get('add_payer_online'),
      canUpdate: configurations.get('online_cust_addr_change'),
      international: configurations.get('international_addr'),
      useAddressVerification: configurations.get('verisign_use_avs')
    };
    const billingAddressActions = {
      selectBillingAddressAction: this.props.selectBillingAddressAction,
      onUpdateBillingAddressAction: this.props.onUpdateBillingAddressAction,

      onCreateBillingAddressAction: this.props.onCreateBillingAddressAction,
      selectCountryAction: this.props.selectCountryAction,
      changeFormFieldAction: this.props.changeFormFieldAction,
      hideBillingAddressFormAction: this.props.hideBillingAddressFormAction,
      submitAction: this.props.submitAction,
      cancelAction: this.props.cancelAction
    };
    return (
      <div className="page-Checkout">
        <div className="aaui-flexbox afx-xl-mg-30">
          <div className="afx-col afx-xl-4-12 afx-sm-1-1 afx-xs-1-1 afx-md-order-1">
            <OrderSummary />
          </div>
          <div className="afx-col afx-xl-8-12 afx-sm-1-1 afx-xs-1-1">
            <div className="afx-panel page-Checkout-payment">
              <h2><FormattedMessage {...selfMessages.payment_title} /></h2>
              <PrimaryPayment paymentManager={paymentManager} />

              <BillingAddress
                data={billingAddress}
                config={billingAddressConfig}

                {...billingAddressActions}
              />

              <FutureCharge />
              {/* <SecondaryPayment paymentManager={paymentManager} /> */}
            </div>
          </div>
        </div>
        <PageFooter specificContent={configurations.get('page_newcuicheckout_footer')} />
      </div>
    );
  }

}


export default connect(
  state => ({
    billingAddress: state.modules.Cart.Checkout.billingAddress,
    paymentManager: state.modules.Cart.Checkout.paymentManager
  }),
  {
    fetchCreditCardTypesAction,
    fetchSavedCreditCardsAction,
    fetchSavedEChecksAction,

    getCountryStateAction,
    onCreateBillingAddressAction,
    onUpdateBillingAddressAction,
    createBillingAddressAction,
    updateBillingAddressAction,
    getBillingAddressAction,
    selectBillingAddressAction,
    showBillingAddressFormAction,
    hideBillingAddressFormAction,
    selectCountryAction,
    changeFormFieldAction,
    submitAction,
    cancelAction
  }
)(Checkout);
