import React from 'react';
import { injectIntl } from 'react-intl';

import BillingAddressList from './BillingAddressList';
import BillingAddressForm from './BillingAddressForm';

export class BillingAddress extends React.PureComponent {
  static propTypes = {
    data: React.PropTypes.shape({
      toJS: React.PropTypes.func
    }).isRequired,
    config: React.PropTypes.shape({
      canUpdate: React.PropTypes.bool.isRequired,
      useAddressVerification: React.PropTypes.bool.isRequired,
      canCreate: React.PropTypes.bool.isRequired,
      hideBilling: React.PropTypes.bool.isRequired,
      isInternational: React.PropTypes.bool.isRequired
    }).isRequired,

    selectBillingAddressAction: React.PropTypes.func.isRequired,
    onUpdateBillingAddressAction: React.PropTypes.func.isRequired,

    onCreateBillingAddressAction: React.PropTypes.func.isRequired,
    selectCountryAction: React.PropTypes.func.isRequired,
    changeFormFieldAction: React.PropTypes.func.isRequired,
    hideBillingAddressFormAction: React.PropTypes.func.isRequired,
    submitAction: React.PropTypes.func.isRequired,
    cancelAction: React.PropTypes.func.isRequired,
    uiSetIsInternationalAction: React.PropTypes.func.isRequired
  };

  componentWillMount() {
    const {
      config: { isInternational },
      getCountryStateAction,
      getBillingAddressAction,
      uiSetIsInternationalAction
    } = this.props;
    getCountryStateAction(isInternational)
      .then(() => getBillingAddressAction())
      .then(() => uiSetIsInternationalAction({ isInternational }));
  }

  render() {
    const { config, data } = this.props;

    return (
      !config.hideBilling ?
        <div className="billingaddresswrapper layout-width-limited">
          <BillingAddressList
            data={data}
            config={config}

            onChange={this.props.selectBillingAddressAction}
            onUpdate={this.props.onUpdateBillingAddressAction}
          />
          <BillingAddressForm
            data={data}
            config={config}

            onCreate={this.props.onCreateBillingAddressAction}
            onChangeCountry={this.props.selectCountryAction}
            onChange={this.props.changeFormFieldAction}
            onHide={this.props.hideBillingAddressFormAction}
            onSubmit={this.props.submitAction}
            onCancel={this.props.cancelAction}
          />
        </div>
        : null
    );
  }
}


export default injectIntl(BillingAddress);
