import React from 'react';
import UIComponent from 'shared/components/UIComponent';
import { FormattedMessage } from 'shared/translation/formatted';
import Attachments from './Attachments';
import WaiverFinalAgreement from './WaiverFinalAgreement';
import selfMessages from './translations';

import './index.less';

export default class Waiver extends UIComponent {

  render() {
    const { waiver, checkout } = this.props;
    const { waivers, warningAlertShown, waiversAgreements } = waiver.toJS();
    const { attachments } = waivers || {};

    return (
    waivers ?
      <div className="waiver-layouts waiver-panel">
        <h2><FormattedMessage {...selfMessages.title} /></h2>
        <p>
          <b><FormattedMessage {...selfMessages.description_01} /></b>
          <FormattedMessage {...selfMessages.description_02} />
        </p>
        <div className="waiver-body">
          <Attachments
            attachments={attachments} waiversAgreements={waiversAgreements} checkout={checkout}
          />
          <WaiverFinalAgreement
            waivers={waivers} checkout={checkout}
            waiversAgreements={waiversAgreements} warningAlertShown={warningAlertShown}
          />
        </div>
      </div> : null
    );
  }
}
