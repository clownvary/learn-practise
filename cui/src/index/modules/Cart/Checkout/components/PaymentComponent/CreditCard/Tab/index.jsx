import React from 'react';

import { FormattedMessage } from 'shared/translation/formatted';
import selfMessages from '../translations';

import './index.less';

export default class CreditCardTab extends React.PureComponent {

  render() {
    return (
      <div>
        <span className="icon icon-credit-card-m" />
        <h4>
          <FormattedMessage {...selfMessages.tab_title} />
        </h4>
      </div>
    );
  }

}
