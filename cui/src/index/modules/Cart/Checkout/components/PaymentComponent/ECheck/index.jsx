import React, { PropTypes } from 'react';
import UIComponent from 'shared/components/UIComponent';

import Saved from './Saved';
import New from './New';
import Tab from './Tab';

export {
  Tab
};

export const name = 'ECheck';

export default class ECheck extends UIComponent {

  static propTypes = {
    typeName: PropTypes.string.isRequired
  }

  render() {
    return (
      <div className="">
        <Saved {...this.props} />
        <New />
      </div>
    );
  }
}
