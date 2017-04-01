import React, { Component } from 'react';
import { Link } from 'shared/components/Link';

import './index.less';

export default class NoSiteFound extends Component {

  static propTypes = {
    params: React.PropTypes.shape({})
  }

  static defaultProps = {};

  render() {
    const { params: { splat } } = this.props;
    const site = window.__siteBaseName ? window.__siteBaseName.replace(/\//, '') : '';
    return (
      <div className="cui-page-wrap cui-page-nositefound">
        <h1>404</h1>
        <b>Site Not Found</b>
        <p>
          { 'The site ' }<strong>[{ splat }]</strong>
          { ' you are looking for doesn\'t exist or an other error occurred.' }
        </p>
        { __STATIC__ ?
          <p>Current site is <b>{ site }</b>, The redesign page is
            <Link to="/newcart">Shopping Cart</Link>.</p> :
          null }
      </div>
    );
  }

}

