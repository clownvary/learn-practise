import React from 'react';
import UIComponent from 'shared/components/UIComponent';

import './index.less';

export default class ECheckTab extends UIComponent {

  render() {
    return (
      <div>
        <span className="icon icon-echeck-m" />
        <h4>Electronic Check</h4>
      </div>
    );
  }

}
