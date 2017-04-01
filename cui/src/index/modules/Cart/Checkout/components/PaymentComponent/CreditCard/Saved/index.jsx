import React from 'react';
import UIComponent from 'shared/components/UIComponent';

import typeIcons from 'shared/consts/creditCard/typeIcons';
import Radio from 'react-aaui/lib/Radio';
import { FormattedMessage } from 'shared/translation/formatted';
import selfMessages from '../translations';

import './index.less';

const getCardTypeIcon = flage => <span className={`icon ${typeIcons[`${flage}`]}`} />;

export default class SavedCreditCard extends UIComponent {

  render() {
    const { name, data, typeName, onItemSelectedChange } = this.props;

    return (
      <div className="layout-width-limited">
        <ul className="creditcard-list">
          {
            data && data.size && data.get('list').map((card, i) => (
              <li key={i}>
                <Radio
                  name={name}
                  size="m"
                  value={card.get('id')}
                  onChange={(e) => {
                    onItemSelectedChange(typeName, e.target.value);
                  }}
                  checked={data.getIn(['selected', 'id']) === card.get('id')}
                >
                  <div className="aaui-flexbox">
                    <div className="afx-col afx-xl-1-8">
                      {getCardTypeIcon(card.get('card_type_flag'))}
                    </div>
                    <div className="afx-col afx-xl-7-8 creditcard-info">
                      <p className="card-number">{`**** ${card.get('card_number')}`}</p>
                      <p className="card-expiration">
                        <FormattedMessage {...selfMessages[`credit_card_type_${card.get('card_type_flag')}`]} />
                        {` ${card.get('card_expiration')}`}
                      </p>
                    </div>
                  </div>
                </Radio>
              </li>
            ))
          }
        </ul>
      </div>
    );
  }
}
