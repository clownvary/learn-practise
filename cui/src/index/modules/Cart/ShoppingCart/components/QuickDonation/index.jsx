import React from 'react';
import { connect } from 'react-redux';
import Button from 'react-aaui/lib/Button';
import Dropdown from 'react-aaui/lib/Dropdown';
import { InputSelect } from 'react-base-ui/lib/components';
import { FormattedMessage } from 'shared/translation/formatted';
import buttonsMessages from 'shared/translation/messages/button';
import selfMessages from './translations';
import * as quickDonationActions from '../../actions/quickdonation';

import './index.less';

export class QuickDonation extends React.PureComponent {

  static contextTypes = {
    configurations: React.PropTypes.object
  }

  onCompaignChange(value) {
    /**
     * React testing tool enzyme cannot support refs,
     * so ignore this line on test env.
     */
    !___TESTING___ && this.inputselect.clear();
    this.props.changeCampaignAction(value);
  }

  render() {
    const { configurations } = this.context;
    const { quickdonation, changeAmountAction } = this.props;
    const {
      amount,
      selectedCampaign,
      selectedCampaignValue,
      donationAmounts
    } = quickdonation.toJS();
    const {
      enable_quick_donation_in_cart: enableQuickDonationInCart,
      allow_donations_online: allowDonationsOnline
    } = configurations.toJS();

    const allowCustomAmount = selectedCampaign ? selectedCampaign.allow_custom_amount : false;

    return (
    enableQuickDonationInCart && allowDonationsOnline &&
    quickdonation.get('donations').size ?
      <div className="quickdonation-panel afx-panel">
        <h3><FormattedMessage {...selfMessages.title} /></h3>
        <div className="quickdonation-panel-form">
          <Dropdown
            placeholder="Choose Compaign"
            value={selectedCampaignValue}
            data={quickdonation.get('donations').toJS()}
            onChange={({ value }) => {
              if (value !== selectedCampaignValue) this.onCompaignChange(value);
            }}
          />
          <span className="currency-flag">$</span>
          <InputSelect
            ref={(c) => { this.inputselect = c; }}
            placeholder="0.00"
            value={amount ? { amount } : null}
            maxLength="10"
            options={donationAmounts}
            disabled={!selectedCampaign}
            allowInput={allowCustomAmount}
            inputProps={{ maxLength: 10 }}
            limitEntryType={{ type: 'money', digits: 2 }}
            valueKey="donation_amount_id"
            labelKey="amount"
            onInputChange={value => changeAmountAction(value)}
            onChange={({ amount: value }) => changeAmountAction(value)}
          />
        </div>
        <div className="afx-xl-right">
          <Button type="primary" size="sm" disabled={!(parseFloat(amount) > 0)} onClick={this.props.submitQuickDonationAction}>
            <FormattedMessage {...buttonsMessages.donate} />
          </Button>
        </div>
      </div> : null
    );
  }
}

export default connect(
  null,
  {
    ...quickDonationActions
  }
)(QuickDonation);
