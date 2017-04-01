import React from 'react';
import UIComponent from 'shared/components/UIComponent';
import Participant from './Participant';

import './index.less';

export default class Transactions extends UIComponent {
  render() {
    const { transactions } = this.props;
    const { participants } = transactions.toJS();
    return (
      <div className="transactions-layouts">
        { participants.map((item, index) => (
          <Participant participant={item} key={index} index={index} />
          )) }
      </div>
    );
  }
}
