import React, { Component } from 'react';
import { decodeHtmlStr } from 'react-base-ui/lib/utils';

import 'shared/assets/images/logo.png';
import './index.less';

export default class Header extends Component {

  static contextTypes = {
    configurations: React.PropTypes.object,
    systemSettings: React.PropTypes.object
  }

  generateLogin() {
    const { systemSettings } = this.context;
    const login = systemSettings.getIn(['header', 'login']);

    return (
      <div className="cui-header-opts">
        { login.map((item, i) => (
          <span key={i}>
            <a href={item.get('url')}>{ item.get('title') }</a>
            { i + 1 < login.count() ? ' |' : '' }
          </span>
        )) }
      </div>
    );
  }

  generateLogout() {
    const { systemSettings } = this.context;
    const logout = systemSettings.getIn(['header', 'logout']);
    const firstname = systemSettings.getIn(['user', 'firstname']);

    return (
      <div className="cui-header-opts">
        <b>Welcome, { firstname }</b>
        { logout.map((item, i) => (
          <span key={i}>
            <a href={item.get('url')}>{ item.get('title') }</a>
            { i + 1 < logout.count() ? ' |' : '' }
          </span>
            )) }
      </div>
    );
  }

  isLogin() {
    const { systemSettings } = this.context;
    return systemSettings.getIn(['user', 'firstname']);
  }

  render() {
    const { configurations, systemSettings } = this.context;
    const logo = systemSettings.getIn(['header', 'logo']);

    return (
      <div className="cui-header-wrap">
        <header className="cui-header">
          <div className="cui-header-logo">
            <a href={configurations.get('banner_logo_link')} target="_blank" rel="noopener noreferrer">
              { logo ? <img src={logo.get('url')} alt={decodeHtmlStr(logo.get('title'))} title={decodeHtmlStr(logo.get('title'))} /> : null }
            </a>
          </div>
          { this.isLogin() ?
            this.generateLogout() :
            this.generateLogin() }
        </header>
      </div>
    );
  }
}
