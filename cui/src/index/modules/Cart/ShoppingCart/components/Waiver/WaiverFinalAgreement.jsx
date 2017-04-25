import React from 'react';
import { connect } from 'react-redux';
import { decodeHtmlStr } from 'react-base-ui/lib/utils';
import orderSummaryMessages from 'shared/translation/messages/Cart/orderSummary';
import { FormattedMessage } from 'shared/translation/formatted';
import Checkbox from 'react-aaui/lib/Checkbox';
import Input from 'react-aaui/lib/Input';
import WarningAlert from 'react-aaui/lib/Alert';
import { confirm } from 'react-base-ui/lib/confirmation';
import CheckScrollModal from './CheckScrollModal';
import { hideWarningAlertAction, changeAgreementEntryAction } from '../../actions/waiver';
import * as waiverTypes from '../../consts/waiverTypes';

import selfMessages from './translations';

export class WaiverFinalAgreement extends React.PureComponent {

  static contextTypes = {
    configurations: React.PropTypes.object
  }

  constructor(props) {
    super(props);
    this.state = {
      checkScrollModalShown: false
    };
  }

  isInvalidEntry(id) {
    const {
      waiversAgreements, checkout
    } = this.props;
    const { needValidate } = checkout.toJS();
    const agreement = waiversAgreements[id];
    return needValidate && agreement && agreement.error;
  }

  generateSystemWaiver() {
    const { checkScrollModalShown } = this.state;
    const {
      waivers,
      waiversAgreements,
      warningAlertShown
    } = this.props;

    const {
      waiver_text: waiverText,
      waiver_text_donation: waiverTextDonation
    } = waivers;

    return (
    waiverText || waiverTextDonation ?
      <div>
        <div className="final-agreement attachment">
          <div className="attachment-form-item form-item-required">
            <Checkbox
              onChange={(e) => {
                this.props.changeAgreementEntryAction({
                  id: waiverTypes.FINAL_SYSTEM_WAIVER,
                  value: e.target.checked
                });
              }} disabled={warningAlertShown} checked={waiversAgreements[waiverTypes.FINAL_SYSTEM_WAIVER].value} size="m" defaultChecked={false} value="agree"
            />
          </div>
          <div className="attachment-content">
            <b>
              <FormattedMessage {...selfMessages.have_reade_text} />{ ' ' }
              <a
                href="#hash" onClick={(e) => {
                  this.setState({
                    checkScrollModalShown: true
                  });
                  e.preventDefault();
                }}
              >
                <FormattedMessage {...selfMessages.title} />
              </a>{ '.' }
            </b>
          </div>
        </div>
        {
          this.isInvalidEntry(waiverTypes.FINAL_SYSTEM_WAIVER) ?
            <span style={{ color: 'red' }}><FormattedMessage {...orderSummaryMessages.required} /></span> : null
        }
        { warningAlertShown ?
          <WarningAlert type="warning" noClose>
            <FormattedMessage {...selfMessages.warning_text} />
          </WarningAlert> : null }
        <CheckScrollModal
          shown={checkScrollModalShown}
          waiverText={waiverText || waiverTextDonation} onClose={() => this.setState({
            checkScrollModalShown: false
          })} onScrollToBottom={() => {
            this.props.hideWarningAlertAction();
          }}
        />
      </div> : null
    );
  }

  generateInitialsWaiver() {
    const { waivers, waiversAgreements } = this.props;
    const {
      waiver_initials_online_text: waiverInitialsOnlineText
    } = waivers;

    return (
    waiverInitialsOnlineText ?
      <div>
        <div className="final-agreement attachment">
          <div className="attachment-form-item form-item-required">
            <Input
              errored={this.isInvalidEntry(waiverTypes.FINAL_INITIALS_WAIVER)}
              type="text" maxLength="4" size="m" onBlur={(e) => {
                this.props.changeAgreementEntryAction({
                  id: waiverTypes.FINAL_INITIALS_WAIVER,
                  value: e.target.value
                });
              }} value={waiversAgreements[waiverTypes.FINAL_INITIALS_WAIVER].value} placeholder="Initials"
            />
          </div>
          <div className="attachment-content">
            <b>
              <FormattedMessage {...selfMessages.have_reade_text} />{ ' ' }
              <a
                href="#hash" onClick={(e) => {
                  confirm(
                      (
                        <div className="attachment-alert-message">
                          <h3><FormattedMessage {...selfMessages.default_name} /></h3>
                          <div className="atch-msg-content" dangerouslySetInnerHTML={{ __html: decodeHtmlStr(waiverInitialsOnlineText) }} />
                        </div>
                      ),
                    {
                      title: 'Wavier'
                    }
                  );
                  e.preventDefault();
                }}
              >
                <FormattedMessage {...selfMessages.title} />
              </a>{ '.' }
            </b>
          </div>
        </div>
        {
          this.isInvalidEntry(waiverTypes.FINAL_INITIALS_WAIVER) ?
            <span style={{ color: 'red' }}><FormattedMessage {...orderSummaryMessages.required} /></span> : null
         }
      </div> : null
    );
  }

  render() {
    return (
      <div>
        { this.generateSystemWaiver() }
        { this.generateInitialsWaiver() }
      </div>
    );
  }
}

export default connect(
  null,
  {
    hideWarningAlertAction,
    changeAgreementEntryAction
  }
)(WaiverFinalAgreement);
