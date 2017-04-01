import React, { Component } from 'react';

import './index.less';

export default class NotFound extends Component {

  static defaultProps = {}

  render() {
    return (
      <div className="cui-page-wrap cui-page-notfound">
        <h1>404</h1>
        <b>Page Not Found</b>
        <p>{'The Page you are looking for doesn\'t exist or an other error occurred.'}</p>
      </div>
    );
  }

}
