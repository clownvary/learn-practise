import React from 'react';
import { injectIntl } from 'react-intl';
import UIComponent from 'shared/components/UIComponent';

export class ActiveLogo extends UIComponent {

  render() {
    const { showLogo, intl: { messages } } = this.props;

    return (
      <div className="footer-logo">
        { showLogo ?
          <a href="#hash" onClick={(event) => { window.open('http://www.activenetwork.com/', 'l1'); event.preventDefault(); }}>
            <img src="/images/poweredbyactive_Reversed.png" alt={messages['app.modules.common.CommonMeassages.logoTitle']} />
          </a> : null }
      </div>
    );
  }

}

export default injectIntl(ActiveLogo);
