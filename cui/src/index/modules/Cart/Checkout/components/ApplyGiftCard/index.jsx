import React from 'react';
import { connect } from 'react-redux';
import UIComponent from 'shared/components/UIComponent';

import './index.less';

export class ApplyGiftCard extends UIComponent {
  render() {
    return (
      <div className="">
        <div className="splitline" />
        Apply Gift Card
      </div>
    );
  }
}

export default connect(
  null,
  {}
)(ApplyGiftCard);
