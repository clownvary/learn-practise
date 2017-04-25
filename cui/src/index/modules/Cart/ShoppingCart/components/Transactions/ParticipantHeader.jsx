import React from 'react';
import { injectIntl } from 'react-intl';
import { FormattedMessage, FormattedNumber, FormattedDyncMessage } from 'shared/translation/formatted';
import { PREFIX } from 'shared/translation/messages/wording';
import selfMessages from './translations';

import './participant.less';

export class ParticipantHeader extends React.PureComponent {

  render() {
    const { participant, index, intl: { messages } } = this.props;
    const {
      item_number: itemNumber,
      first_name: firstName,
      last_name: lastName,
      shorthand_name: shorthandName,
      sub_total: subTotal
    } = participant;

    return (
      <div className="aaui-flexbox afx-xl-middle afx-xl-mg-15 participant-header">
        <h2 className="afx-xl-grow-1 afx-xl-basis-0 afx-xl-right afx-xs-order-2">
          { firstName || lastName ?
            <FormattedDyncMessage value={`${firstName} ${lastName}`} /> :
            <FormattedMessage {...selfMessages.name_unspecified} /> }
        </h2>
        <div className="participant-avator afx-xs-order-1">
          <div className={`bg-set-${(index % 8) + 1}`}>
            <FormattedDyncMessage value={shorthandName || 'U'} />
          </div>
        </div>
        <div className="afx-xl-grow-1 afx-xl-basis-0 afx-xs-order-3">
          <div className="afx-bubble">
            <FormattedNumber numberStyle="currency" currency="USD" value={subTotal}>
              { formattedNum => (
                <FormattedMessage {...selfMessages.bubble} values={{ item_number: itemNumber, items_wording: messages[itemNumber > 1 ? `${PREFIX}.items` : `${PREFIX}.item`], sub_total: <b>{ formattedNum }</b> }} />
                ) }
            </FormattedNumber>
          </div>
        </div>
      </div>
    );
  }
}
export default injectIntl(ParticipantHeader);
