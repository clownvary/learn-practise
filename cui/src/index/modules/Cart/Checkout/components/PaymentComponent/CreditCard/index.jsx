import React, { PropTypes } from 'react';

import { FormattedMessage } from 'shared/translation/formatted';
import selfMessages from './translations';

import Saved from './Saved';
import New from './New';
import Tab from './Tab';

import './index.less';

export {
  Tab
};

export const name = 'CreditCard';

export default class CreditCard extends React.PureComponent {

  static propTypes = {
    typeName: PropTypes.string.isRequired
  }

  render() {
    const { data, typeName } = this.props;

    return (
      <div>
        <Saved {...this.props} typeName={typeName} />
        <div className="merchant-name layout-width-limited">
          {
            data.get('merchantName') ?
              <FormattedMessage
                {...selfMessages.merchant_name}
                values={{
                  merchant_name: data.get('merchantName')
                }}
              /> : <FormattedMessage {...selfMessages.no_merchant_name} />
          }
        </div>
        <New {...this.props} typeName={typeName} />
      </div>
    );
  }
}
