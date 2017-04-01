import React from 'react';
import UIComponent from 'shared/components/UIComponent';

import Radio from 'react-aaui/lib/Radio';

import './index.less';

export default class SavedECheck extends UIComponent {
  render() {
    const { name, data, typeName, onItemSelectedChange } = this.props;

    return (
      <ul className="creditcard-list">
        {
          data && data.size && data.get('list').map((card, i) => (
            <li key={i}>
              <Radio
                name={name}
                size="m"
                onChange={(e) => {
                  onItemSelectedChange(typeName, data.get('list').find(c => c.get('id') === card.get('id')), e.target.value === 'on');
                }}
                checked={data.getIn(['selected', 'id']) === card.get('id')}
              >
                <div className="aaui-flexbox">
                  <div className="afx-col afx-xl-3-8">
                    Checking
                  </div>
                  <div className="afx-col afx-xl-5-8 creditcard-info">
                    <p className="card-number">{`**** ${card.get('card_number')}`}</p>
                    <p className="card-expiration">{`Routing Number ${card.get('card_number')}`}</p>
                  </div>
                </div>
              </Radio>
            </li>
          ))
        }
      </ul>
    );
  }
}
