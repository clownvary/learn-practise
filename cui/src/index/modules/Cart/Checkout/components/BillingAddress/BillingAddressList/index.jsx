import React from 'react';
import Dropdown from 'react-aaui/lib/Dropdown';
import { injectIntl } from 'react-intl';

import UIComponent from 'shared/components/UIComponent';
import { FormattedDyncMessage, FormattedMessage } from 'shared/translation/formatted';

import selfMessages from './translations';
import './index.less';

export class BillingAddressList extends UIComponent {
  static propTypes = {
    data: React.PropTypes.shape({
      toJS: React.PropTypes.func
    }).isRequired,
    config: React.PropTypes.shape({
      canUpdate: React.PropTypes.bool.isRequired,
      useAddressVerification: React.PropTypes.bool.isRequired
    }).isRequired,

    onChange: React.PropTypes.func.isRequired,
    onUpdate: React.PropTypes.func.isRequired
  };

  renderBillingAddressDetail = (selectedBillingAddress) => {
    const details = [
      selectedBillingAddress.address1,
      selectedBillingAddress.address2,
      [
        selectedBillingAddress.city,
        selectedBillingAddress.state,
        selectedBillingAddress.country,
        selectedBillingAddress.zip_code
      ].filter(t => t && /[\S]/.test(t))
        .join(', ')
    ].filter(detail => detail && /[\S]/.test(detail));

    return (
      details.length > 0 ?
        <ul>
          {
            details.map((detail, key) =>
              <li key={key}><FormattedDyncMessage value={detail} /></li>
            )
          }
        </ul>
        : null
    );
  }

  render() {
    const { data,
      config,
      intl: { messages }
    } = this.props;

    const billingAddresses = data.get('billingAddresses');
    const selectedBillingAddress = data.get('selectedBillingAddress');
    const isListDisplay = data.get('isListDisplay');

    return (
      <div className="billingaddress-list">
        <h4><FormattedMessage {...selfMessages.title} /></h4>
        {
          config.useAddressVerification ?
            <div className="billingaddress-list-tip">
              <FormattedMessage {...selfMessages.tip} />
            </div>
            : null
        }

        {
          isListDisplay ?
            <div>
              <Dropdown
                placeholder={messages[selfMessages.placeHolder.id]}
                value={selectedBillingAddress.get('customer_id')}
                data={billingAddresses.toJS()}
                onChange={({ value }) => { this.props.onChange(value); }}
                maxHeight="350px"
              />
              <div className="billingaddress-list-label">
                <div className="billingaddress-list-label-detail">
                  {this.renderBillingAddressDetail(selectedBillingAddress.toJS())}
                </div>
                {
                  config.canUpdate ?
                    <div
                      className="billingaddress-list-label-edit"
                      onClick={this.props.onUpdate}
                    >
                      <i className="icon icon-edit" />
                      <FormattedMessage {...selfMessages.edit} />
                    </div>
                    : null
                }
              </div>
            </div>
            : null
        }
      </div >
    );
  }
}

export default injectIntl(BillingAddressList);
