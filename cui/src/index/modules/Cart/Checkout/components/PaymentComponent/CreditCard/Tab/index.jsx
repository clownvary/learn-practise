import React from 'react';
import UIComponent from 'shared/components/UIComponent';

import { FormattedMessage } from 'shared/translation/formatted';
import selfMessages from '../translations';

import './index.less';

export default class CreditCardTab extends UIComponent {

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
