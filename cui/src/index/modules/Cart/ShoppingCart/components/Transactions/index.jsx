import React from 'react';
import Participant from './Participant';

import './index.less';

export default class Transactions extends React.PureComponent {
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
