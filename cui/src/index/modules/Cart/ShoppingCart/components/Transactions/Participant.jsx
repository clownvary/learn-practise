import React from 'react';
import UIComponent from 'shared/components/UIComponent';

import Transactions from './Transactions';
import ParticipantHeader from './ParticipantHeader';

import './participant.less';

export default class Participant extends UIComponent {

  render() {
    const { participant, participant: { transactions }, index } = this.props;

    return (
      <div className="afx-panel aaui-flexbox afx-xl-1 participant">
        <div className="afx-col">
          <ParticipantHeader participant={participant} index={index} />
        </div>
        <div className="afx-col splitline" />
        <div className="afx-col">
          <Transactions transactions={transactions} />
        </div>
      </div>
    );
  }
}
