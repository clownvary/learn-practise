import React, { PropTypes } from 'react';

import Saved from './Saved';
import New from './New';
import Tab from './Tab';

export {
  Tab
};

export const name = 'ECheck';

export default class ECheck extends React.PureComponent {

  static propTypes = {
    typeName: PropTypes.string.isRequired
  }

  render() {
    const { typeName } = this.props;
    return (
      <div className="">
        <Saved {...this.props} typeName={typeName} />
        <New typeName={typeName} />
      </div>
    );
  }
}
